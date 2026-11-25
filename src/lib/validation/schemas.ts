import { z } from 'zod';

export const SERVICE_SLUGS = [
  'it-consulting',
  'web-development',
  'it-support',
  'brand-identity',
  'digital-marketing',
  'mobile-software',
] as const;

export const TIMELINE_OPTIONS = [
  'Immediate (2–4 weeks)',
  'Short-term (1–2 months)',
  'Medium-term (3–6 months)',
  'Flexible / Ongoing partnership',
] as const;

export const BUDGET_OPTIONS = [
  'Under R15,000',
  'R15,000 – R40,000',
  'R40,000 – R100,000',
  'R100,000+',
  'To be scoped together',
] as const;

export const PREFERRED_CONTACT_METHODS = ['Email', 'Phone', 'WhatsApp'] as const;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(160),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid telephone number.')
    .max(30)
    .regex(/^[+\d\s()-]{7,30}$/, 'Telephone number contains invalid characters.'),
  subject: z.string().trim().min(3, 'Please enter a subject.').max(160),
  serviceInterest: z.string().trim().min(2, 'Please select a service of interest.').max(100),
  message: z.string().trim().min(15, 'Please provide at least 15 characters describing your enquiry.').max(3000),
  // Honeypot anti-spam field: must remain empty
  website: z.string().max(0, 'Spam verification failed.').optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const quoteRequestSchema = z.object({
  selectedServices: z
    .array(z.enum(SERVICE_SLUGS))
    .min(1, 'Please select at least one service for your quote.'),
  projectTitle: z.string().trim().min(3, 'Please enter a project title.').max(150),
  businessName: z.string().trim().min(2, 'Please enter your business name.').max(140),
  projectDescription: z
    .string()
    .trim()
    .min(20, 'Please describe your project scope (minimum 20 characters).')
    .max(4000),
  objectives: z.string().trim().min(10, 'Please outline your main project objectives.').max(2000),
  timeline: z.string().trim().min(2, 'Please select a preferred timeline.').max(100),
  budgetRange: z.string().trim().min(2, 'Please select an indicative budget range.').max(100),
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(120),
  email: z.string().trim().email('Please enter a valid business email.').max(160),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number.')
    .max(30)
    .regex(/^[+\d\s()-]{7,30}$/, 'Phone number contains invalid characters.'),
  companyName: z.string().trim().min(2, 'Please enter your company name.').max(140),
  preferredContactMethod: z.enum(PREFERRED_CONTACT_METHODS),
  // Honeypot anti-spam field: must remain empty
  website: z.string().max(0, 'Spam verification failed.').optional(),
});

export type QuoteRequestValues = z.infer<typeof quoteRequestSchema>;
