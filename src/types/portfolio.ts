export type Language = 'uz' | 'en';

export type WorkCategory = 'all' | 'apex' | 'bot' | 'mobile' | 'ai' | 'web' | 'uiux' | 'branding' | 'other';

export type WorkCategoryValue = Exclude<WorkCategory, 'all'>;

export interface PortfolioWork {
  id: string;
  ownerUid: string;
  title: string;
  category: WorkCategoryValue;
  year: string;
  client: string;
  role: string;
  summary: string;
  details: string;
  imageUrl: string;
  liveUrl: string;
  tools: string[];
  featured: boolean;
  isPublished: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
  isStarter?: boolean;
}

export interface PublicProfile {
  ownerUid: string;
  brandName: string;
  specialty: string;
  headline: string;
  subheadline: string;
  aboutBio: string;
  experienceYears: string;
  skills: string[];
  contactEmail: string;
  telegram: string;
  githubUrl: string;
  behanceUrl: string;
  instagramUrl: string;
  updatedAt?: unknown;
}

export interface VisitorMessage {
  id: string;
  senderName: string;
  senderContact: string;
  body: string;
  isRead: boolean;
  createdAt?: unknown;
}
