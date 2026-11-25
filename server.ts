import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import express, { type Request, type Response, type NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import { contactSchema, quoteRequestSchema } from './src/lib/validation/schemas.js';
import { createSupabaseAdminClient, getSupabaseConfigStatus } from './src/lib/server/supabaseAdmin.js';
import {
  getEmailConfigStatus,
  sendContactNotificationEmail,
  sendQuoteEmails,
} from './src/lib/server/emailService.js';

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

// Sliding-window in-memory rate limiter for public form endpoints
const rateLimitStore = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 8;

function checkRateLimit(req: Request, res: Response, next: NextFunction) {
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp =
    (typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : undefined) ||
    req.socket.remoteAddress ||
    'unknown';

  const now = Date.now();
  const timestamps = (rateLimitStore.get(clientIp) || []).filter((ts) => now - ts < RATE_WINDOW_MS);

  if (timestamps.length >= RATE_MAX_REQUESTS) {
    res.status(429).json({
      ok: false,
      code: 'RATE_LIMITED',
      message: 'Too many submissions from this connection. Please wait a few minutes and try again.',
    });
    return;
  }

  timestamps.push(now);
  rateLimitStore.set(clientIp, timestamps);
  next();
}

function generateQuoteReference(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `NC-${datePart}-${randomPart}`;
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);

  // Baseline security headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  app.use(express.json({ limit: '64kb' }));

  // Non-secret integration readiness check
  app.get('/api/config-status', (_req, res) => {
    const db = getSupabaseConfigStatus();
    const email = getEmailConfigStatus();
    res.json({
      ok: true,
      supabaseConfigured: db.configured,
      emailConfigured: email.configured,
      missingVariables: [...db.missing, ...email.missing],
    });
  });

  // POST /api/contact
  app.post('/api/contact', checkRateLimit, async (req, res) => {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Please review the highlighted fields and try again.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const payload = parsed.data;
    if (payload.website && payload.website.length > 0) {
      res.status(400).json({
        ok: false,
        code: 'SPAM_DETECTED',
        message: 'Submission rejected by spam protection.',
      });
      return;
    }

    const dbStatus = getSupabaseConfigStatus();
    const emailStatus = getEmailConfigStatus();
    const missing = [...dbStatus.missing, ...emailStatus.missing];

    if (missing.length > 0) {
      res.status(503).json({
        ok: false,
        code: 'CONFIGURATION_REQUIRED',
        missing,
        message:
          'Contact submission validated, but Supabase and/or Resend environment variables are not configured in this environment. Configure the required keys to persist enquiries and send notifications.',
      });
      return;
    }

    const supabase = createSupabaseAdminClient();
    if (!supabase) {
      res.status(503).json({
        ok: false,
        code: 'CONFIGURATION_REQUIRED',
        missing: dbStatus.missing,
        message: 'Database client unavailable.',
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert({
          full_name: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          subject: payload.subject,
          service_interest: payload.serviceInterest,
          message: payload.message,
        })
        .select('id, created_at')
        .single();

      if (error) {
        console.error('[api/contact] Supabase insert error:', error.message);
        res.status(500).json({
          ok: false,
          code: 'DATABASE_ERROR',
          message: 'Unable to store your enquiry right now. Please verify database schema setup.',
        });
        return;
      }

      await sendContactNotificationEmail(payload);

      res.status(201).json({
        ok: true,
        id: data.id,
        createdAt: data.created_at,
        message: 'Your enquiry has been saved and our team has been notified.',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected server error';
      console.error('[api/contact] Processing failure:', message);
      res.status(502).json({
        ok: false,
        code: 'DELIVERY_ERROR',
        message: 'Enquiry processing could not complete email delivery. Please verify Resend credentials.',
      });
    }
  });

  // POST /api/quote
  app.post('/api/quote', checkRateLimit, async (req, res) => {
    const parsed = quoteRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Please complete all required quote request fields.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const payload = parsed.data;
    if (payload.website && payload.website.length > 0) {
      res.status(400).json({
        ok: false,
        code: 'SPAM_DETECTED',
        message: 'Submission rejected by spam protection.',
      });
      return;
    }

    const dbStatus = getSupabaseConfigStatus();
    const emailStatus = getEmailConfigStatus();
    const missing = [...dbStatus.missing, ...emailStatus.missing];

    if (missing.length > 0) {
      res.status(503).json({
        ok: false,
        code: 'CONFIGURATION_REQUIRED',
        missing,
        message:
          'Quote scope validated, but Supabase and/or Resend environment variables are not configured in this environment. Configure the required keys to persist quotes and dispatch confirmation emails.',
      });
      return;
    }

    const supabase = createSupabaseAdminClient();
    if (!supabase) {
      res.status(503).json({
        ok: false,
        code: 'CONFIGURATION_REQUIRED',
        missing: dbStatus.missing,
        message: 'Database client unavailable.',
      });
      return;
    }

    const referenceNumber = generateQuoteReference();

    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .insert({
          reference_number: referenceNumber,
          full_name: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          company_name: payload.companyName,
          preferred_contact_method: payload.preferredContactMethod,
          selected_services: payload.selectedServices,
          project_title: payload.projectTitle,
          business_name: payload.businessName,
          project_description: payload.projectDescription,
          objectives: payload.objectives,
          timeline: payload.timeline,
          budget_range: payload.budgetRange,
          status: 'submitted',
        })
        .select('id, reference_number, created_at')
        .single();

      if (error) {
        console.error('[api/quote] Supabase insert error:', error.message);
        res.status(500).json({
          ok: false,
          code: 'DATABASE_ERROR',
          message: 'Unable to save your quote request. Please verify database schema setup.',
        });
        return;
      }

      await sendQuoteEmails(payload, referenceNumber);

      res.status(201).json({
        ok: true,
        id: data.id,
        referenceNumber: data.reference_number,
        createdAt: data.created_at,
        message: 'Quote request submitted. Confirmation email sent.',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected server error';
      console.error('[api/quote] Processing failure:', message);
      res.status(502).json({
        ok: false,
        code: 'DELIVERY_ERROR',
        message: 'Quote saved, but confirmation email dispatch failed. Please verify Resend configuration.',
      });
    }
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        next();
        return;
      }
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NEXUS CORE server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
