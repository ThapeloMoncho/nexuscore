export type ServiceSlug =
  | 'it-consulting'
  | 'web-development'
  | 'it-support'
  | 'brand-identity'
  | 'digital-marketing'
  | 'mobile-software';

export interface ServiceProcessStep {
  step: string;
  title: string;
  detail: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: ServiceSlug;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  heroSummary: string;
  iconName: 'Server' | 'Globe' | 'Laptop' | 'Layers' | 'TrendingUp' | 'Smartphone';
  offerings: string[];
  benefits: {
    title: string;
    detail: string;
  }[];
  process: ServiceProcessStep[];
  faqs: ServiceFaq[];
  relatedIds: ServiceSlug[];
  imagePath: string;
  imageAlt: string;
}

export type ProjectCategory =
  | 'Web development'
  | 'IT infrastructure'
  | 'Branding'
  | 'Digital marketing'
  | 'Software solutions';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  architectureNote: string;
  deliverables: string[];
  imagePath: string;
  imageAlt: string;
  isSample: boolean;
}

export type InsightCategory =
  | 'Technology'
  | 'IT Support'
  | 'Cybersecurity'
  | 'Web Development'
  | 'Digital Marketing'
  | 'Business Innovation';

export interface InsightArticle {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
  imagePath: string;
  imageAlt: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  isDemonstrationContent: boolean;
}
