import type { ServiceItem, ServiceSlug } from '../types/nexus';

export const SERVICES: ServiceItem[] = [
  {
    id: 'it-consulting',
    number: '01',
    title: 'IT Consulting',
    shortTitle: 'IT Consulting',
    tagline: 'Build a smarter, more secure technology strategy.',
    description:
      'Build a smarter, more secure technology strategy.',
    heroSummary:
      'Align infrastructure decisions, cloud migration roadmaps, and security controls with measurable business operations.',
    iconName: 'Server',
    offerings: [
      'Technology strategy',
      'IT infrastructure planning',
      'Security and compliance',
      'Cloud migration',
      'Software integration',
    ],
    benefits: [
      {
        title: 'Structured Infrastructure Planning',
        detail: 'Eliminate fragmented tools and unexpected hardware bottlenecks with a documented multi-year architecture plan.',
      },
      {
        title: 'Risk-Reduced Cloud Transitions',
        detail: 'Move workloads, identity directories, and core data to resilient cloud environments without disrupting daily operations.',
      },
      {
        title: 'Security Posture Clarity',
        detail: 'Establish practical access governance, backup verification, and compliance readiness tailored to your operating footprint.',
      },
    ],
    process: [
      { step: '01', title: 'Systems Audit', detail: 'Inventory hardware, cloud accounts, licensing, and network dependencies.' },
      { step: '02', title: 'Architecture Blueprint', detail: 'Design target topology, security controls, and integration interfaces.' },
      { step: '03', title: 'Phased Migration', detail: 'Execute infrastructure upgrades and cloud cutovers with rollback safeguards.' },
      { step: '04', title: 'Governance Handover', detail: 'Deliver runbooks, vendor mapping, and ongoing advisory checkpoints.' },
    ],
    faqs: [
      {
        question: 'Can you audit our current IT setup before recommending changes?',
        answer: 'Yes. Every consulting engagement starts with an objective review of your existing network, software stack, and security exposure.',
      },
      {
        question: 'Do you assist with connecting separate business tools?',
        answer: 'Yes. We design clean software integrations across accounting, CRM, operations, and identity platforms to remove manual data entry.',
      },
      {
        question: 'Is cloud migration handled in stages to avoid downtime?',
        answer: 'Yes. We schedule staged cutovers outside peak trading hours and validate backups prior to every transition.',
      },
    ],
    relatedIds: ['it-support', 'mobile-software', 'web-development'],
    imagePath: '/src/assets/images/service_cloud_nodes_1795525676066.jpg',
    imageAlt: 'Interconnected enterprise cloud server nodes and luminous cyan network lines',
  },
  {
    id: 'web-development',
    number: '02',
    title: 'Web Design & Development',
    shortTitle: 'Web Development',
    tagline: 'Modern websites. Better experiences. More customers.',
    description:
      'Modern websites. Better experiences. More customers.',
    heroSummary:
      'Fast, accessible, search-ready websites engineered for clear customer journeys and dependable long-term maintenance.',
    iconName: 'Globe',
    offerings: [
      'Custom website development',
      'Responsive websites',
      'E-commerce websites',
      'CMS development',
      'Website maintenance',
    ],
    benefits: [
      {
        title: 'Performance Across Every Screen',
        detail: 'Responsive layouts engineered to load quickly and read cleanly across desktop monitors, tablets, and smartphones.',
      },
      {
        title: 'Structured Content Management',
        detail: 'Update service pages, project showcases, and insights effortlessly through clean CMS workflows without breaking layout integrity.',
      },
      {
        title: 'Conversion-Focused Architecture',
        detail: 'Clear navigation, accessible forms, and technical SEO foundations that turn visitors into qualified enquiries.',
      },
    ],
    process: [
      { step: '01', title: 'Information Architecture', detail: 'Map customer journeys, sitemap hierarchy, and conversion goals.' },
      { step: '02', title: 'Wireframes & Visual System', detail: 'Design responsive interface layouts aligned with your brand identity.' },
      { step: '03', title: 'Full-Stack Engineering', detail: 'Build with clean TypeScript, semantic markup, and technical SEO.' },
      { step: '04', title: 'Launch & Maintenance', detail: 'Verify accessibility, speed metrics, and ongoing security updates.' },
    ],
    faqs: [
      {
        question: 'Will our website work cleanly on mobile phones and tablets?',
        answer: 'Yes. Every interface is built mobile-first and verified across small mobile, tablet, and desktop viewports.',
      },
      {
        question: 'Can we manage content updates ourselves after launch?',
        answer: 'Yes. We implement structured CMS capabilities so your team can update pages, articles, and portfolios independently.',
      },
      {
        question: 'Do you provide ongoing website maintenance?',
        answer: 'Yes. We offer scheduled dependency updates, uptime checks, backups, and iterative feature enhancements.',
      },
    ],
    relatedIds: ['brand-identity', 'digital-marketing', 'mobile-software'],
    imagePath: '/src/assets/images/service_web_devices_1795525676196.jpg',
    imageAlt: 'Floating desktop, tablet, and smartphone screens displaying responsive dark-navy UI',
  },
  {
    id: 'it-support',
    number: '03',
    title: 'Computer & IT Support',
    shortTitle: 'IT Support',
    tagline: 'Keep your systems running. Minimise downtime.',
    description:
      'Keep your systems running. Minimise downtime.',
    heroSummary:
      'Practical hardware diagnostics, workstation maintenance, software provisioning, and responsive troubleshooting for teams and individuals.',
    iconName: 'Laptop',
    offerings: [
      'Computer repairs',
      'Laptop troubleshooting',
      'Software installation',
      'IT troubleshooting',
      'Technical support',
    ],
    benefits: [
      {
        title: 'Faster Fault Diagnosis',
        detail: 'Pinpoint hardware degradation, thermal throttling, storage faults, and OS errors systematically without guesswork.',
      },
      {
        title: 'Clean Software Provisioning',
        detail: 'Configure operating systems, business suites, security updates, and driver stacks consistently across devices.',
      },
      {
        title: 'Reduced Operational Interruptions',
        detail: 'Proactive preventive care and direct remote or hands-on support to get staff back to productive work quickly.',
      },
    ],
    process: [
      { step: '01', title: 'Diagnostic Scan', detail: 'Run structured hardware, thermal, storage, and system log checks.' },
      { step: '02', title: 'Root-Cause Isolation', detail: 'Verify whether faults stem from components, drivers, or network configuration.' },
      { step: '03', title: 'Repair & Configuration', detail: 'Perform component replacement, OS remediation, and software installation.' },
      { step: '04', title: 'Stability Verification', detail: 'Confirm system health, backup integrity, and peripheral compatibility.' },
    ],
    faqs: [
      {
        question: 'Do you handle both hardware repairs and software troubleshooting?',
        answer: 'Yes. We diagnose and resolve physical component faults as well as operating system, driver, and application issues.',
      },
      {
        question: 'Can you set up new laptops and software for incoming staff?',
        answer: 'Yes. We prepare workstations with required software installations, security policies, and user profiles.',
      },
      {
        question: 'Do you provide ongoing technical support agreements?',
        answer: 'Yes. Businesses can opt for ad-hoc assistance or structured ongoing technical support coverage.',
      },
    ],
    relatedIds: ['it-consulting', 'mobile-software', 'web-development'],
    imagePath: '/src/assets/images/service_diagnostic_hardware_1795525676679.jpg',
    imageAlt: 'Workstation laptop and motherboard circuitry illuminated by a cyan diagnostic light beam',
  },
  {
    id: 'brand-identity',
    number: '04',
    title: 'Brand Identity Design',
    shortTitle: 'Brand Identity',
    tagline: 'Build a brand that leaves a lasting impression.',
    description:
      'Build a brand that leaves a lasting impression.',
    heroSummary:
      'Cohesive logos, typography frameworks, colour architectures, and business stationery engineered for instant credibility.',
    iconName: 'Layers',
    offerings: [
      'Logo design',
      'Brand identity',
      'Business stationery',
      'Visual identity systems',
    ],
    benefits: [
      {
        title: 'Distinctive Market Recognition',
        detail: 'Stand apart from generic competitors with a disciplined geometric mark and memorable visual language.',
      },
      {
        title: 'Cross-Medium Consistency',
        detail: 'Ensure digital interfaces, pitch decks, and printed stationery share unified typography, spacing, and colour precision.',
      },
      {
        title: 'Ready-to-Use Brand Assets',
        detail: 'Receive vector master files, clear usage guidelines, and production-ready stationery templates.',
      },
    ],
    process: [
      { step: '01', title: 'Brand Discovery', detail: 'Define positioning, audience expectations, and visual differentiation.' },
      { step: '02', title: 'Geometric Exploration', detail: 'Develop vector logo concepts tested across dark, light, and small scales.' },
      { step: '03', title: 'Identity System', detail: 'Formalise typography, colour palette, grid rules, and graphic motifs.' },
      { step: '04', title: 'Stationery & Guidelines', detail: 'Prepare business cards, letterheads, email signatures, and asset kits.' },
    ],
    faqs: [
      {
        question: 'What deliverables are included in a brand identity package?',
        answer: 'You receive vector logos (SVG, EPS, PNG), colour and typography specifications, brand guidelines, and core stationery layouts.',
      },
      {
        question: 'Can you refresh an existing logo without losing brand recognition?',
        answer: 'Yes. We regularly refine legacy marks to improve legibility on modern screens while preserving brand heritage.',
      },
      {
        question: 'Does brand identity integrate directly with a new website?',
        answer: 'Yes. Our brand systems are engineered specifically to translate seamlessly into web interfaces and digital campaigns.',
      },
    ],
    relatedIds: ['web-development', 'digital-marketing', 'mobile-software'],
    imagePath: '/src/assets/images/service_brand_analytics_1795525676834.jpg',
    imageAlt: 'Dark-glass brand identity presentation plates, navy stationery, and geometric emblem blocks',
  },
  {
    id: 'digital-marketing',
    number: '05',
    title: 'Digital Marketing',
    shortTitle: 'Digital Marketing',
    tagline: 'More visibility. More engagement. More growth.',
    description:
      'More visibility. More engagement. More growth.',
    heroSummary:
      'Targeted social campaigns, digital advertising, and structured content systems built around transparent performance reporting.',
    iconName: 'TrendingUp',
    offerings: [
      'Social media marketing',
      'Digital advertising',
      'Content creation',
      'Online brand visibility',
    ],
    benefits: [
      {
        title: 'Focused Audience Reach',
        detail: 'Put clear, relevant messaging in front of decision-makers actively searching for your products or services.',
      },
      {
        title: 'Consistent Content Execution',
        detail: 'Maintain a cohesive visual and editorial cadence across social channels without straining internal bandwidth.',
      },
      {
        title: 'Measurable Campaign Attribution',
        detail: 'Connect ad spend and content touchpoints directly to website enquiries and qualified leads.',
      },
    ],
    process: [
      { step: '01', title: 'Channel Audit', detail: 'Review existing social presence, search footprint, and audience behaviour.' },
      { step: '02', title: 'Campaign Strategy', detail: 'Define target segments, messaging pillars, and monthly content calendars.' },
      { step: '03', title: 'Creative & Launch', detail: 'Produce campaign visuals, ad copy, and landing page alignment.' },
      { step: '04', title: 'Reporting & Refinement', detail: 'Track engagement and conversion signals to refine ongoing performance.' },
    ],
    faqs: [
      {
        question: 'Which platforms do you support for digital marketing?',
        answer: 'We tailor channel selection to your audience—covering LinkedIn, Meta platforms, Google Search, and content-driven web funnels.',
      },
      {
        question: 'Do you create the visual assets and copy for campaigns?',
        answer: 'Yes. Our team produces campaign graphics, social creatives, and structured copy aligned with your brand voice.',
      },
      {
        question: 'Can digital marketing connect to a new website landing page?',
        answer: 'Yes. Pairing campaigns with dedicated landing pages significantly improves lead quality and conversion clarity.',
      },
    ],
    relatedIds: ['web-development', 'brand-identity', 'it-consulting'],
    imagePath: '/src/assets/images/service_brand_analytics_1795525676834.jpg',
    imageAlt: 'Layered dark analytics panels and geometric marketing presentation cards',
  },
  {
    id: 'mobile-software',
    number: '06',
    title: 'Mobile & Software Solutions',
    shortTitle: 'Mobile & Software',
    tagline: 'Smart applications for a connected world.',
    description:
      'Smart applications for a connected world.',
    heroSummary:
      'Custom web applications, mobile-ready interfaces, and internal digital tools tailored to simplify complex operational workflows.',
    iconName: 'Smartphone',
    offerings: [
      'Application design',
      'Software solutions',
      'Mobile-friendly experiences',
      'Digital business tools',
    ],
    benefits: [
      {
        title: 'Workflows Built Around Your Team',
        detail: 'Replace brittle spreadsheets and disconnected manual trackers with purposeful, role-appropriate software tools.',
      },
      {
        title: 'Mobile-First Usability',
        detail: 'Equip field staff, managers, and customers with clean interfaces that perform reliably on mobile devices.',
      },
      {
        title: 'Maintainable Codebases',
        detail: 'Type-safe architecture, validated APIs, and modular components built for future expansion.',
      },
    ],
    process: [
      { step: '01', title: 'Workflow Mapping', detail: 'Document user roles, data flows, and operational bottlenecks.' },
      { step: '02', title: 'Interface Prototyping', detail: 'Design interactive application screens and state transitions.' },
      { step: '03', title: 'Modular Engineering', detail: 'Build frontend interfaces, API endpoints, and database schemas.' },
      { step: '04', title: 'Testing & Rollout', detail: 'Verify data integrity, security permissions, and team onboarding.' },
    ],
    faqs: [
      {
        question: 'Can you build internal portals or dashboards specific to our workflow?',
        answer: 'Yes. We design custom digital business tools—including client portals, booking workflows, and internal operations dashboards.',
      },
      {
        question: 'How do you handle mobile compatibility?',
        answer: 'We engineer responsive web applications and mobile-ready experiences designed specifically around touch targets and smaller screens.',
      },
      {
        question: 'Can custom software integrate with our existing databases or APIs?',
        answer: 'Yes. We build secure server-side integrations to connect new software modules with your existing systems.',
      },
    ],
    relatedIds: ['it-consulting', 'web-development', 'it-support'],
    imagePath: '/src/assets/images/service_web_devices_1795525676196.jpg',
    imageAlt: 'Floating mobile and software interface displays with cyan grid accents',
  },
];

export const SERVICE_BY_ID: Record<ServiceSlug, ServiceItem> = SERVICES.reduce(
  (acc, service) => {
    acc[service.id] = service;
    return acc;
  },
  {} as Record<ServiceSlug, ServiceItem>
);
