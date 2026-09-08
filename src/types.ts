export type CategoryId = 
  | 'all'
  | 'separation-anxiety'
  | 'noise-phobias'
  | 'crate-training'
  | 'calming-gear'
  | 'supplements'
  | 'behavioral-modification';

export interface Author {
  name: string;
  role: string;
  credentials: string;
  avatar: string;
}

export interface Reviewer {
  name: string;
  title: string;
  clinic: string;
}

export interface GearRecommendation {
  name: string;
  category: string;
  badge: string;
  rating: number;
  priceLevel: '$' | '$$' | '$$$';
  pros: string[];
  cons: string[];
  verdict: string;
  linkText: string;
  image: string;
}

export interface ProtocolStep {
  stepNumber: number;
  phase: string;
  title: string;
  duration: string;
  action: string;
  proTip: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: CategoryId;
  readTime: string;
  publishDate: string;
  featured?: boolean;
  coverImage: string;
  imageAlt: string;
  tags: string[];
  author: Author;
  vetReviewed: boolean;
  reviewer?: Reviewer;
  keyTakeaways: string[];
  protocolSteps?: ProtocolStep[];
  gearRecommendations?: GearRecommendation[];
  faqs?: FaqItem[];
  fullBodyHtml: string[];
}

export interface GearItem {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  bestFor: string;
  rating: number;
  reviewsCount: number;
  priceLevel: '$' | '$$' | '$$$';
  image: string;
  keyFeature: string;
  pros: string[];
  cons: string[];
  clinicalNote: string;
  affiliateBadge: string;
}

export interface QuizAnswer {
  primaryTrigger: string;
  stressBehaviors: string[];
  durationSeverity: string;
  currentRemedies: string[];
}
