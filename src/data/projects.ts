import type { ProjectItem } from '../types/nexus';

export const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'sample-cloud-core',
    title: 'Multi-Site Cloud & Identity Consolidation',
    category: 'IT infrastructure',
    summary:
      'Sample architectural blueprint demonstrating hybrid cloud migration, zero-trust access policies, and unified backup orchestration across regional offices.',
    architectureNote: 'Sample Showcase · Editable Demonstration Case',
    deliverables: ['Infrastructure Topology', 'Cloud Migration Plan', 'Access Governance', 'Automated Backups'],
    imagePath: '/src/assets/images/service_cloud_nodes_1795525676066.jpg',
    imageAlt: 'Isometric 3D cloud infrastructure and interconnected server racks',
    isSample: true,
  },
  {
    id: 'sample-commerce-portal',
    title: 'B2B Client Portal & Responsive Web Platform',
    category: 'Web development',
    summary:
      'Sample web engineering concept pairing high-contrast responsive UI with structured product catalogues, quote workflows, and fast technical SEO.',
    architectureNote: 'Sample Showcase · Editable Demonstration Case',
    deliverables: ['Responsive Web App', 'CMS Architecture', 'Quote Intake Engine', 'Performance Audit'],
    imagePath: '/src/assets/images/service_web_devices_1795525676196.jpg',
    imageAlt: 'Desktop, tablet, and mobile screens showcasing responsive web application layout',
    isSample: true,
  },
  {
    id: 'sample-monolith-identity',
    title: 'Geometric Visual System & Corporate Stationery',
    category: 'Branding',
    summary:
      'Sample brand identity system illustrating modular vector marks, typography pairing, dark-mode design tokens, and print-ready stationery suites.',
    architectureNote: 'Sample Showcase · Editable Demonstration Case',
    deliverables: ['Primary & Secondary Marks', 'Typography System', 'Brand Guidelines', 'Stationery Templates'],
    imagePath: '/src/assets/images/service_brand_analytics_1795525676834.jpg',
    imageAlt: 'Matte navy stationery and layered glass brand identity plates',
    isSample: true,
  },
  {
    id: 'sample-demand-engine',
    title: 'Multi-Channel Acquisition & Analytics Framework',
    category: 'Digital marketing',
    summary:
      'Sample digital marketing programme aligning targeted social campaigns, conversion landing pages, and clear weekly attribution dashboards.',
    architectureNote: 'Sample Showcase · Editable Demonstration Case',
    deliverables: ['Campaign Architecture', 'Creative Asset Kit', 'Landing Page Funnel', 'Attribution Reporting'],
    imagePath: '/src/assets/images/hero_infrastructure_1795525674840.jpg',
    imageAlt: 'High-contrast architectural technology environment with cyan data trails',
    isSample: true,
  },
  {
    id: 'sample-field-operations',
    title: 'Mobile Dispatch & Service Diagnostics Tool',
    category: 'Software solutions',
    summary:
      'Sample custom software concept enabling field technicians and support desks to log diagnostics, track hardware repairs, and notify stakeholders.',
    architectureNote: 'Sample Showcase · Editable Demonstration Case',
    deliverables: ['Mobile-Ready Interface', 'API & Data Schema', 'Role Permissions', 'Diagnostic Checklists'],
    imagePath: '/src/assets/images/service_diagnostic_hardware_1795525676679.jpg',
    imageAlt: 'Workstation laptop and hardware motherboard with cyan diagnostic beam',
    isSample: true,
  },
];
