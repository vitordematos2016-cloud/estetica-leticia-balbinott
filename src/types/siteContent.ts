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

export interface ExperienceContent {
  title: string;
  text: string;
  placeholders: { label: string; description: string }[];
}

export interface FacadeContent {
  title: string;
  years: number;
  text: string;
}

export interface Treatment {
  id: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  image?: string;
  benefits: string[];
  indication: string;
  care: string;
  duration: string;
  price: string;
  featured: boolean;
  professional: string;
  whatsappMessage: string;
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
  treatments: Treatment[];
  treatmentsCatalogNotice: string;
  offers: Offer[];
  offersNotice: string;
  reviews: Review[];
  reviewsNotice: string;
  faq: FaqItem[];
  seo: SeoContent;
  footer: FooterContent;
  whatsappDefaultMessage: string;
}
