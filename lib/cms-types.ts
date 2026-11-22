export type LeadStatus = 'Pending' | 'Contacted' | 'Resolved';

export type AudienceSegment =
  | 'Individuals'
  | 'Students'
  | 'IT Educators'
  | 'Groups'
  | 'Organizations';

export interface ServiceItem {
  id: string;
  code: string;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  imageUrl: string;
  audiences: AudienceSegment[];
  deliverables: string[];
  outcomeMetric: string;
  whatsappTopic: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  imageUrl: string;
  completedDate: string;
}

export type AnnouncementType = 'Training Batch' | 'Seminar' | 'Company News';

export interface AnnouncementItem {
  id: string;
  title: string;
  type: AnnouncementType;
  date: string;
  location: string;
  summary: string;
  details: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface BusinessEnquiry {
  id: string;
  referenceId: string;
  name: string;
  serviceName: string;
  expectedStartDate: string;
  expectedEndDate: string;
  specificDetails: string;
  phone: string;
  email: string;
  location: string;
  additionalMessage: string;
  status: LeadStatus;
  createdAt: string;
}

export interface ConsultationBooking {
  id: string;
  referenceId: string;
  fullName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  visitorCount: number;
  purpose: string;
  status: LeadStatus;
  createdAt: string;
}

export interface SiteContent {
  companyName: string;
  tagline: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImageUrl: string;
  aboutOverview: string;
  missionStatement: string;
  visionStatement: string;
  philosophyHeading: string;
  philosophyBody: string;
  consultingHeading: string;
  consultingDescription: string;
  consultingExpectations: string[];
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string;
  email: string;
  address: string;
  officeHours: string;
  socialLinks: {
    linkedin: string;
    facebook: string;
    instagram: string;
    x: string;
  };
}

export interface CMSState {
  content: SiteContent;
  services: ServiceItem[];
  galleryCategories: string[];
  gallery: GalleryItem[];
  announcements: AnnouncementItem[];
  enquiries: BusinessEnquiry[];
  bookings: ConsultationBooking[];
  adminPasswordHash: string;
  updatedAt: string;
}
