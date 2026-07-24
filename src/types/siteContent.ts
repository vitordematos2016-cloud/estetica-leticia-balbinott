export interface NavLink {
  label: string;
  href: string;
}

export interface BrandInfo {
  name: string;
  professional: string;
  role: string;
  focus: string;
  experienceYears: number;
  tagline: string;
}

export interface ContactInfo {
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
}

export interface AddressInfo {
  street: string;
  reference: string;
  googleMapsUrl: string;
  wazeUrl: string;
  latitude: number;
  longitude: number;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface BrandLoopContent {
  items: string[];
  ariaLabel: string;
}

export interface ManifestoContent {
  title: string;
  text: string;
}

export interface AboutContent {
  title: string;
  text: string;
  highlights: string[];
}

export interface PurposeContent {
  title: string;
  text: string;
  emphasis: string[];
  objectiveTitle: string;
  objectiveText: string;
}

export interface DifferentialContent {
  title: string;
  text: string;
}

export interface ValueItem {
  title: string;
  text: string;
}

export interface ExperienceBlock {
  title: string;
  text: string;
}

export interface ExperienceContent {
  title: string;
  text: string;
  additionalBlocks: ExperienceBlock[];
}

export interface FacadeContent {
  title: string;
  years: number;
  text: string;
}

export interface TreatmentCategory {
  id: string;
  name: string;
  description: string;
}

export interface SkinConcern {
  id: string;
  label: string;
  description: string;
  categoryId: string;
}

export interface SkinConcernsContent {
  title: string;
  text: string;
  items: SkinConcern[];
}

export interface Treatment {
  id: string;
  name: string;
  categoryId: string;
  summary: string;
  description: string;
  image?: string;
  indication: string;
  howItWorks: string;
  benefits: string[];
  sessions?: string;
  duration: string;
  careBefore: string[];
  careAfter: string[];
  contraindications: string[];
  price: string;
  featured: boolean;
  professional: string;
  whatsappMessage: string;
}

export type CredentialType =
  | 'formacao'
  | 'especializacao'
  | 'curso'
  | 'certificado'
  | 'tecnologia'
  | 'evento';

export interface CredentialItem {
  id: string;
  type: CredentialType;
  title: string;
  description?: string;
  year?: string;
}

export interface CredentialsContent {
  title: string;
  text: string;
  notice: string;
  items: CredentialItem[];
}

export interface PersonalAssessmentContent {
  title: string;
  text: string;
  criteria: string[];
  cta: { label: string; href: string };
}

export interface FinalCtaContent {
  title: string;
  text: string;
  primaryCta: { label: string; href: string };
  secondaryCtaLabel: string;
}

export interface AftercareContent {
  title: string;
  text: string;
}

export interface ThoughtfulDetailsContent {
  title: string;
  text: string;
}

export interface TechnologyItem {
  id: string;
  name: string;
  purpose: string;
  benefit?: string;
}

export interface TechnologiesContent {
  title: string;
  text: string;
  notice: string;
  items: TechnologyItem[];
}

export interface InstagramContent {
  title: string;
  text: string;
  notice: string;
  postsPlaceholderCount: number;
}

export interface LegalPolicySection {
  heading: string;
  text: string;
}

export interface LegalPolicyContent {
  title: string;
  reviewNotice: string;
  sections: LegalPolicySection[];
}

export interface LegalContent {
  privacyPolicy: LegalPolicyContent;
  cancellationPolicy: LegalPolicyContent;
}

export interface SchedulingConsentContent {
  label: string;
  error: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  validUntil?: string;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: string;
  label: string;
  category: string;
}

export interface SeoContent {
  title: string;
  description: string;
  ogImage?: string;
}

export interface FooterContent {
  developedBy: string;
}

export interface SiteContent {
  brand: BrandInfo;
  contact: ContactInfo;
  address: AddressInfo;
  nav: NavLink[];
  headerCta: { label: string; href: string };
  hero: HeroContent;
  brandLoop: BrandLoopContent;
  manifesto: ManifestoContent;
  about: AboutContent;
  purpose: PurposeContent;
  differential: DifferentialContent;
  values: ValueItem[];
  howItWorks: { title: string; text: string; steps: { title: string; text: string }[] };
  experience: ExperienceContent;
  gallery: { title: string; text: string; images: GalleryImage[] };
  facade: FacadeContent;
  authorizedResults: { title: string; text: string; placeholder: string };
  credentials: CredentialsContent;
  skinConcerns: SkinConcernsContent;
  treatmentCategories: TreatmentCategory[];
  treatments: Treatment[];
  treatmentsCatalogNotice: string;
  personalAssessment: PersonalAssessmentContent;
  aftercare: AftercareContent;
  thoughtfulDetails: ThoughtfulDetailsContent;
  technologies: TechnologiesContent;
  instagramShowcase: InstagramContent;
  finalCta: FinalCtaContent;
  offers: Offer[];
  offersNotice: string;
  reviews: Review[];
  reviewsNotice: string;
  faq: FaqItem[];
  seo: SeoContent;
  footer: FooterContent;
  legal: LegalContent;
  schedulingConsent: SchedulingConsentContent;
  whatsappDefaultMessage: string;
}
