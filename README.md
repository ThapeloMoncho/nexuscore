# NEXUS CORE IT Consulting

Production web application for **NEXUS CORE IT Consulting** — *"Technology that moves your business forward."*

## Project Structure

```text
├── server.ts                          # Express API server & Vite dev/prod entrypoint
├── index.html                         # HTML shell & typography configuration
├── metadata.json                      # Application metadata
├── public/
│   ├── robots.txt                     # Search crawler directives
│   └── sitemap.xml                    # Route sitemap
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql     # PostgreSQL schema + RLS policies for contacts & quote_requests
└── src/
    ├── App.tsx                        # Route definitions & persistent layout
    ├── index.css                      # Tailwind v4 design tokens & reduced-motion rules
    ├── context/
    │   └── QuoteScopeContext.tsx       # Persistent Project Scope Drawer state (localStorage)
    ├── data/
    │   ├── siteConfig.ts              # Editable business contact placeholders
    │   ├── services.ts                # Central configuration for all 6 services
    │   ├── projects.ts                # Labelled sample portfolio blueprints
    │   └── insights.ts                # Editable demonstration insight articles
    ├── lib/
    │   ├── validation/schemas.ts      # Shared Zod schemas (client + server)
    │   └── server/
    │       ├── supabaseAdmin.ts       # Server-only Supabase service-role client
    │       └── emailService.ts        # Server-only Resend notification & confirmation emails
    ├── components/
    │   ├── navigation/Navbar.tsx
    │   ├── hero/HeroSection.tsx
    │   ├── services/
    │   ├── approach/ApproachTimeline.tsx
    │   ├── scope-drawer/ProjectScopeDrawer.tsx
    │   ├── quote-builder/QuoteBuilder.tsx
    │   ├── forms/ContactForm.tsx
    │   ├── cta/FinalCtaSection.tsx
    │   ├── footer/Footer.tsx
    │   └── ui/
    └── pages/                         # All primary, service detail, insight, legal & conversion routes
```

## Environment Variables

Copy `.env.example` to `.env` and populate your credentials (never commit secrets):

- `NEXT_PUBLIC_SITE_URL`: Canonical site URL (e.g. `https://nexuscore.example`)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Server-only Supabase service role key (never expose to client)
- `RESEND_API_KEY`: Server-only Resend API key
- `BUSINESS_EMAIL`: Destination inbox for incoming contact and quote notifications
- `SMTP_FROM`: Verified Resend sender address (e.g. `NEXUS CORE <no-reply@yourdomain.com>`)
- `WHATSAPP_NUMBER`: Editable business WhatsApp contact number

## Supabase Setup

1. Create a new Supabase project.
2. Open the **SQL Editor** and execute `supabase/migrations/001_initial_schema.sql`.
3. Verify that Row Level Security (RLS) is enabled on both `public.contacts` and `public.quote_requests`.
4. Copy the Project URL and `service_role` secret key into your server environment variables.

## Resend Setup

1. Create a Resend account and add/verify your sending domain (`SPF` and `DKIM` DNS records).
2. Generate an API key and set `RESEND_API_KEY`, `SMTP_FROM`, and `BUSINESS_EMAIL`.
3. Note: If database or email credentials are absent, `/api/contact` and `/api/quote` return HTTP `503` with an explicit configuration notice rather than simulating email delivery.

## Local Development & Build

```bash
npm install
npm run dev      # Starts Express + Vite on port 3000
npm run lint     # Runs TypeScript type-checking (tsc --noEmit)
npm run build    # Builds production frontend bundle to dist/
```

## Vercel / Production Deployment

1. Connect your GitHub repository to your hosting project (Vercel or Cloud Run).
2. Configure all server environment variables listed in `.env.example`.
3. Run the Supabase SQL migration (`supabase/migrations/001_initial_schema.sql`).
4. Verify Resend domain DNS records.
5. Deploy a preview build, test `/contact`, `/request-a-quote`, and all 6 `/services/*` routes, then promote to production and attach your custom domain.
