import { Resend } from 'resend';
import type { ContactFormValues, QuoteRequestValues } from '../validation/schemas.js';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getEmailConfigStatus() {
  const apiKey = process.env.RESEND_API_KEY || '';
  const businessEmail = process.env.BUSINESS_EMAIL || '';
  const fromAddress = process.env.SMTP_FROM || '';
  const missing: string[] = [];

  if (!apiKey) missing.push('RESEND_API_KEY');
  if (!businessEmail) missing.push('BUSINESS_EMAIL');
  if (!fromAddress) missing.push('SMTP_FROM');

  return {
    configured: missing.length === 0,
    missing,
    apiKey,
    businessEmail,
    fromAddress,
  };
}

const SERVICE_TITLES: Record<string, string> = {
  'it-consulting': 'IT Consulting',
  'web-development': 'Web Design & Development',
  'it-support': 'Computer & IT Support',
  'brand-identity': 'Brand Identity Design',
  'digital-marketing': 'Digital Marketing',
  'mobile-software': 'Mobile & Software Solutions',
};

export async function sendContactNotificationEmail(payload: ContactFormValues) {
  const config = getEmailConfigStatus();
  if (!config.configured) {
    throw new Error(`Missing email configuration: ${config.missing.join(', ')}`);
  }

  const resend = new Resend(config.apiKey);

  const html = `
    <div style="font-family: Inter, Arial, sans-serif; background:#060b16; color:#f1f5f9; padding:32px; border-radius:8px;">
      <h2 style="color:#22d3ee; margin-top:0;">New Contact Enquiry — NEXUS CORE</h2>
      <p style="color:#94a3b8;">A new contact enquiry was submitted through the website.</p>
      <table style="width:100%; border-collapse:collapse; margin-top:16px;">
        <tr><td style="padding:8px 0; color:#94a3b8; width:160px;">Full Name</td><td style="padding:8px 0; color:#f8fafc;">${escapeHtml(payload.fullName)}</td></tr>
        <tr><td style="padding:8px 0; color:#94a3b8;">Email</td><td style="padding:8px 0; color:#f8fafc;">${escapeHtml(payload.email)}</td></tr>
        <tr><td style="padding:8px 0; color:#94a3b8;">Phone</td><td style="padding:8px 0; color:#f8fafc;">${escapeHtml(payload.phone)}</td></tr>
        <tr><td style="padding:8px 0; color:#94a3b8;">Service Interest</td><td style="padding:8px 0; color:#f8fafc;">${escapeHtml(payload.serviceInterest)}</td></tr>
        <tr><td style="padding:8px 0; color:#94a3b8;">Subject</td><td style="padding:8px 0; color:#f8fafc;">${escapeHtml(payload.subject)}</td></tr>
      </table>
      <div style="margin-top:20px; padding:16px; background:#0b1324; border:1px solid #1e293b; border-radius:6px;">
        <p style="margin:0 0 8px 0; color:#94a3b8; font-size:12px;">Message</p>
        <p style="margin:0; color:#f1f5f9; white-space:pre-line;">${escapeHtml(payload.message)}</p>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: config.fromAddress,
    to: [config.businessEmail],
    replyTo: payload.email,
    subject: `[NEXUS CORE Contact] ${payload.subject}`,
    html,
  });

  if (error) {
    throw new Error(error.message || 'Resend failed to deliver business notification.');
  }
}

export async function sendQuoteEmails(payload: QuoteRequestValues, referenceNumber: string) {
  const config = getEmailConfigStatus();
  if (!config.configured) {
    throw new Error(`Missing email configuration: ${config.missing.join(', ')}`);
  }

  const resend = new Resend(config.apiKey);
  const serviceList = payload.selectedServices
    .map((id) => SERVICE_TITLES[id] || id)
    .map((label) => `<li style="margin-bottom:4px;">${escapeHtml(label)}</li>`)
    .join('');

  const businessHtml = `
    <div style="font-family: Inter, Arial, sans-serif; background:#060b16; color:#f1f5f9; padding:32px; border-radius:8px;">
      <h2 style="color:#22d3ee; margin-top:0;">New Quote Request (${escapeHtml(referenceNumber)})</h2>
      <p style="color:#94a3b8;">Submitted by ${escapeHtml(payload.fullName)} — ${escapeHtml(payload.companyName)}</p>
      <table style="width:100%; border-collapse:collapse; margin-top:16px;">
        <tr><td style="padding:6px 0; color:#94a3b8; width:170px;">Reference</td><td style="padding:6px 0; color:#22d3ee; font-weight:600;">${escapeHtml(referenceNumber)}</td></tr>
        <tr><td style="padding:6px 0; color:#94a3b8;">Project Title</td><td style="padding:6px 0;">${escapeHtml(payload.projectTitle)}</td></tr>
        <tr><td style="padding:6px 0; color:#94a3b8;">Business Name</td><td style="padding:6px 0;">${escapeHtml(payload.businessName)}</td></tr>
        <tr><td style="padding:6px 0; color:#94a3b8;">Timeline</td><td style="padding:6px 0;">${escapeHtml(payload.timeline)}</td></tr>
        <tr><td style="padding:6px 0; color:#94a3b8;">Budget Range</td><td style="padding:6px 0;">${escapeHtml(payload.budgetRange)}</td></tr>
        <tr><td style="padding:6px 0; color:#94a3b8;">Contact Method</td><td style="padding:6px 0;">${escapeHtml(payload.preferredContactMethod)}</td></tr>
        <tr><td style="padding:6px 0; color:#94a3b8;">Email</td><td style="padding:6px 0;">${escapeHtml(payload.email)}</td></tr>
        <tr><td style="padding:6px 0; color:#94a3b8;">Phone</td><td style="padding:6px 0;">${escapeHtml(payload.phone)}</td></tr>
      </table>
      <h3 style="color:#f8fafc; margin-top:20px;">Selected Services</h3>
      <ul style="color:#e2e8f0; padding-left:20px;">${serviceList}</ul>
      <h3 style="color:#f8fafc; margin-top:20px;">Project Description</h3>
      <p style="color:#cbd5e1; white-space:pre-line;">${escapeHtml(payload.projectDescription)}</p>
      <h3 style="color:#f8fafc; margin-top:20px;">Main Objectives</h3>
      <p style="color:#cbd5e1; white-space:pre-line;">${escapeHtml(payload.objectives)}</p>
    </div>
  `;

  const customerHtml = `
    <div style="font-family: Inter, Arial, sans-serif; background:#060b16; color:#f1f5f9; padding:32px; border-radius:8px;">
      <h2 style="color:#22d3ee; margin-top:0;">Quote Request Received — NEXUS CORE</h2>
      <p style="color:#e2e8f0;">Hi ${escapeHtml(payload.fullName)},</p>
      <p style="color:#cbd5e1;">Thank you for submitting your project scope to NEXUS CORE IT Consulting. Your quote request has been recorded under reference <strong style="color:#22d3ee;">${escapeHtml(referenceNumber)}</strong>.</p>
      <div style="margin:20px 0; padding:16px; background:#0b1324; border:1px solid #1e293b; border-radius:6px;">
        <p style="margin:0 0 8px 0; color:#94a3b8; font-size:12px;">Project Summary</p>
        <p style="margin:0 0 6px 0; color:#f8fafc;"><strong>${escapeHtml(payload.projectTitle)}</strong></p>
        <p style="margin:0; color:#cbd5e1;">Timeline: ${escapeHtml(payload.timeline)} · Budget: ${escapeHtml(payload.budgetRange)}</p>
      </div>
      <h3 style="color:#f8fafc;">Requested Services</h3>
      <ul style="color:#cbd5e1; padding-left:20px;">${serviceList}</ul>
      <p style="color:#94a3b8; margin-top:24px;">We will reach out via ${escapeHtml(payload.preferredContactMethod)} shortly.</p>
      <p style="color:#64748b; font-size:12px; margin-top:24px;">NEXUS CORE IT Consulting · Innovate. Secure. Grow.</p>
    </div>
  `;

  const [bizRes, custRes] = await Promise.all([
    resend.emails.send({
      from: config.fromAddress,
      to: [config.businessEmail],
      replyTo: payload.email,
      subject: `[NEXUS CORE Quote ${referenceNumber}] ${payload.projectTitle}`,
      html: businessHtml,
    }),
    resend.emails.send({
      from: config.fromAddress,
      to: [payload.email],
      subject: `NEXUS CORE Quote Confirmation (${referenceNumber})`,
      html: customerHtml,
    }),
  ]);

  if (bizRes.error || custRes.error) {
    throw new Error(
      bizRes.error?.message || custRes.error?.message || 'Resend failed to deliver quote notification emails.'
    );
  }
}
