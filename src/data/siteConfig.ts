/**
 * Central editable business contact configuration.
 * Replace placeholder contact details with verified NEXUS CORE details before production launch.
 */
export const SITE_CONFIG = {
  brandName: 'NEXUS CORE',
  tagline: 'Innovate. Secure. Grow.',
  heroTagline: 'Technology that moves your business forward.',
  shortDescription:
    'IT consulting and digital solutions helping businesses build, connect, secure, and grow through reliable technology.',
  contact: {
    emailPlaceholder: 'hello@nexuscore.example',
    phonePlaceholder: '+27 (0) 21 000 0000',
    whatsappPlaceholder: '+27 00 000 0000',
    whatsappHrefPlaceholder: 'https://wa.me/27000000000',
    locationPlaceholder: 'Cape Town & Remote across South Africa',
    businessHoursPlaceholder: 'Monday – Friday · 08:30 – 17:00 SAST',
    isPlaceholderNotice: 'Placeholder contact details — editable in site configuration.',
  },
  socials: {
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    x: 'https://x.com',
  },
} as const;
