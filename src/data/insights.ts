import type { InsightArticle } from '../types/nexus';

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    slug: 'practical-cloud-migration-checklist-for-growing-businesses',
    title: 'A Practical Cloud Migration Checklist for Growing Teams',
    category: 'Technology',
    excerpt:
      'Editable demonstration article covering how to sequence workload discovery, identity governance, and cutover verification without disrupting operations.',
    publishedAt: 'November 2026',
    readingTime: '5 min read',
    featured: true,
    imagePath: '/src/assets/images/hero_infrastructure_1795525674840.jpg',
    imageAlt: 'Enterprise cloud infrastructure server monoliths with cyan data pathways',
    isDemonstrationContent: true,
    sections: [
      {
        heading: 'Start with a Complete Dependency Map',
        paragraphs: [
          'Successful infrastructure transitions rarely begin with moving servers. They begin by mapping every application, shared drive, authentication directory, and third-party integration your staff rely on daily.',
          'Documenting these dependencies early prevents hidden bottlenecks—such as legacy accounting connectors or local printer relays—from stalling a weekend cutover.',
        ],
      },
      {
        heading: 'Separate Identity Hygiene from Storage Migration',
        paragraphs: [
          'Before migrating files or virtual machines, standardise user permissions and multi-factor authentication policies. Clean role boundaries ensure data stays protected the moment it enters a cloud environment.',
        ],
      },
      {
        heading: 'Validate Rollback and Backup Integrity',
        paragraphs: [
          'Every migration milestone should include a verified, offline-tested backup snapshot and a documented rollback procedure so operations remain resilient at every step.',
        ],
      },
    ],
  },
  {
    slug: 'reducing-workstation-downtime-with-preventive-diagnostics',
    title: 'Reducing Workstation Downtime Through Preventive Diagnostics',
    category: 'IT Support',
    excerpt:
      'Editable demonstration article outlining how structured thermal, storage, and patch checks prevent sudden laptop and desktop failures.',
    publishedAt: 'November 2026',
    readingTime: '4 min read',
    imagePath: '/src/assets/images/service_diagnostic_hardware_1795525676679.jpg',
    imageAlt: 'Laptop and motherboard hardware illuminated by cyan diagnostic beam',
    isDemonstrationContent: true,
    sections: [
      {
        heading: 'Catching Early Hardware Warning Signals',
        paragraphs: [
          'Most unexpected workstation outages leave subtle clues weeks earlier: rising fan acoustics, thermal throttling under light workloads, or SMART drive warnings.',
          'Routine diagnostic sweeps catch failing solid-state drives and cooling bottlenecks before critical project files or deadlines are impacted.',
        ],
      },
      {
        heading: 'Standardised Software Provisioning',
        paragraphs: [
          'Maintaining consistent OS patch levels and approved application baselines across team laptops lowers support ticket volume and speeds up troubleshooting.',
        ],
      },
    ],
  },
  {
    slug: 'essential-security-controls-for-modern-business-networks',
    title: 'Essential Security Controls for Modern Business Networks',
    category: 'Cybersecurity',
    excerpt:
      'Editable demonstration article detailing pragmatic security foundations—access control, endpoint hardening, and verified recovery drills.',
    publishedAt: 'October 2026',
    readingTime: '6 min read',
    imagePath: '/src/assets/images/service_cloud_nodes_1795525676066.jpg',
    imageAlt: 'Interconnected server infrastructure and secure network nodes',
    isDemonstrationContent: true,
    sections: [
      {
        heading: 'Least-Privilege Access as Default',
        paragraphs: [
          'Limiting administrative privileges to dedicated accounts and enforcing phishing-resistant multi-factor authentication remains one of the highest-return defences any organisation can implement.',
        ],
      },
      {
        heading: 'Test Recovery, Not Just Backups',
        paragraphs: [
          'An automated backup log only proves files were copied; scheduled restoration tests prove your business can actually resume operations inside target recovery timeframes.',
        ],
      },
    ],
  },
  {
    slug: 'why-web-performance-and-accessibility-drive-b2b-conversion',
    title: 'Why Web Performance and Accessibility Drive B2B Conversion',
    category: 'Web Development',
    excerpt:
      'Editable demonstration article examining how clean semantic markup, fast rendering, and keyboard-accessible forms directly raise lead quality.',
    publishedAt: 'October 2026',
    readingTime: '4 min read',
    imagePath: '/src/assets/images/service_web_devices_1795525676196.jpg',
    imageAlt: 'Responsive desktop, tablet, and smartphone web interfaces',
    isDemonstrationContent: true,
    sections: [
      {
        heading: 'Speed Signals Engineering Discipline',
        paragraphs: [
          'Prospective clients form an impression of technical competence within seconds of landing on your website. Eliminating layout shift and heavy scripts creates immediate confidence.',
        ],
      },
      {
        heading: 'Accessible Forms Reduce Friction',
        paragraphs: [
          'Clear labels, descriptive validation messages, and predictable keyboard focus states ensure every prospective buyer can submit an enquiry effortlessly on any device.',
        ],
      },
    ],
  },
  {
    slug: 'aligning-brand-identity-with-digital-campaigns',
    title: 'Aligning Brand Identity with Measurable Digital Campaigns',
    category: 'Digital Marketing',
    excerpt:
      'Editable demonstration article exploring how cohesive visual systems elevate ad recall and landing-page trust.',
    publishedAt: 'September 2026',
    readingTime: '5 min read',
    imagePath: '/src/assets/images/service_brand_analytics_1795525676834.jpg',
    imageAlt: 'Dark-glass brand identity cards and geometric typography layout',
    isDemonstrationContent: true,
    sections: [
      {
        heading: 'Visual Continuity from Ad to Landing Page',
        paragraphs: [
          'When digital advertising shares the exact typography, colour discipline, and tone of the destination website, visitors experience seamless continuity rather than jarring disconnects.',
        ],
      },
      {
        heading: 'Measure Qualified Pipeline Over Vanity Impressions',
        paragraphs: [
          'Focus campaign reporting on completed quote scopes, qualified contact enquiries, and cost per meaningful conversation.',
        ],
      },
    ],
  },
  {
    slug: 'replacing-spreadsheet-bottlenecks-with-purpose-built-tools',
    title: 'Replacing Spreadsheet Bottlenecks with Purpose-Built Software',
    category: 'Business Innovation',
    excerpt:
      'Editable demonstration article on recognising when manual spreadsheets slow operations down and how modular web tools restore clarity.',
    publishedAt: 'September 2026',
    readingTime: '5 min read',
    imagePath: '/src/assets/images/service_web_devices_1795525676196.jpg',
    imageAlt: 'Connected software interface across multiple devices',
    isDemonstrationContent: true,
    sections: [
      {
        heading: 'Spotting Workflow Friction',
        paragraphs: [
          'When multiple team members duplicate data across disconnected spreadsheets or wait on manual status updates, small errors compound into costly delays.',
        ],
      },
      {
        heading: 'Start with a Focused Operational Scope',
        paragraphs: [
          'Custom software does not have to mean a massive multi-year build. Focused internal tools targeting a single high-friction workflow often deliver rapid operational clarity.',
        ],
      },
    ],
  },
];
