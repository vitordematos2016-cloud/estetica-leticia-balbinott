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
  eyebrow: string;
  heading: string;
  subheading: string;
  purposeTitle: string;
  purposeText: string;
  objectiveTitle: string;
  objectiveText: string;
}

export interface DifferentialContent {
  eyebrow: string;
  title: string;
  text: string;
  closing: string;
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
  yearsLabel: string;
  clients: number;
  clientsLabel: string;
  text: string;
}

export interface TreatmentCategory {
  id: string;
  name: string;
  description: string;
}

/** Os 7 objetivos de "Qual cuidado sua pele precisa?" -- também a chave de
 * `treatmentsByGoal` (src/data/treatmentsByGoal.ts), a configuração
 * centralizada e única que liga cada objetivo aos tratamentos reais do
 * catálogo. `SkinConcern` não guarda mais essa lista (evita duplicar). */
export type SkinGoal =
  | 'manchas'
  | 'linhas-sinais'
  | 'oleosidade-acne'
  | 'textura-vico'
  | 'saude-pele'
  | 'flacidez'
  | 'prevencao-envelhecimento';

export interface SkinConcern {
  id: SkinGoal;
  label: string;
  description: string;
}

export interface SkinConcernsContent {
  title: string;
  text: string;
  items: SkinConcern[];
}

export interface TreatmentSpecialOffer {
  active: boolean;
  title?: string;
  description?: string;
  originalPrice?: string;
  promoPrice?: string;
  validUntil?: string;
}

/** Estrutura única para um item de mídia do tratamento (card e modal de
 * detalhes) -- substitui o antigo campo `image` solto. `poster` só se aplica
 * a vídeo (miniatura exibida antes do play e usada como imagem nos cards,
 * que nunca reproduzem vídeo). Enquanto ausente, os componentes mostram um
 * placeholder elegante em vez de imagem quebrada ou espaço vazio. */
export interface TreatmentMedia {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
}

export interface Treatment {
  id: string;
  name: string;
  /** Nome técnico/comercial real, exibido logo abaixo do nome principal
   * quando existir (ex.: "Peeling de Vidro" para o Skin Glass). */
  subtitle?: string;
  categoryId?: string;
  /** Capa oficial exclusiva do card (Tratamentos e catálogo do Agendamento)
   * -- nunca usada dentro do modal de detalhes, galeria de procedimento,
   * antes/depois ou vídeos, que continuam vindo só de `media`/`beforeAfter`.
   * Enquanto ausente, o card mostra a ilustração conceitual de
   * `TreatmentCoverArt` como alternativa. */
  coverImage?: string;
  /** Resumo breve (120-170 caracteres) exibido nos cards -- card em
   * Tratamentos, card no catálogo do Agendamento. */
  summary?: string;
  /** Explicação completa exibida no modal de detalhes. */
  description?: string;
  /** Mídia do conteúdo "Procedimento" no showcase do modal -- imagens e/ou
   * vídeos, navegados em carrossel quando há mais de um item. */
  media?: TreatmentMedia[];
  indication?: string;
  howItWorks?: string;
  benefits?: string[];
  sessions?: string;
  duration?: string;
  careBefore?: string[];
  careAfter?: string[];
  contraindications?: string[];
  price?: string;
  professional?: string;
  whatsappMessage?: string;
  /** Imagens do conteúdo "Antes/Depois" no showcase do modal -- cada item já
   * é uma foto composta (antes e depois na mesma imagem), por isso reaproveita
   * `TreatmentMedia` em vez de um par de campos separados; navegadas em
   * carrossel quando há mais de uma. */
  beforeAfter?: TreatmentMedia[];
  specialOffer?: TreatmentSpecialOffer;
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
  institution?: string;
  year?: string;
  hours?: string;
  description?: string;
  image?: string;
}

export interface CredentialsContent {
  title: string;
  text: string;
  moduleTitle: string;
  moduleTeaser: string;
  moduleCta: string;
  notice: string;
  items: CredentialItem[];
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
  cta: { label: string; href: string };
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
  ctaLabel: string;
}

export interface LegalPolicySection {
  heading: string;
  text: string;
}

export interface LegalPolicyContent {
  title: string;
  reviewNotice?: string;
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

export interface SeoContent {
  title: string;
  description: string;
  ogImage?: string;
}

export interface FooterContent {
  developedByPrefix: string;
  developerName: string;
  developerWhatsappNumber: string;
  developerWhatsappMessage: string;
  copyright: string;
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
  facade: FacadeContent;
  credentials: CredentialsContent;
  skinConcerns: SkinConcernsContent;
  treatmentCategories: TreatmentCategory[];
  treatments: Treatment[];
  aftercare: AftercareContent;
  thoughtfulDetails: ThoughtfulDetailsContent;
  technologies: TechnologiesContent;
  instagramShowcase: InstagramContent;
  finalCta: FinalCtaContent;
  reviews: Review[];
  reviewsNotice: string;
  faq: FaqItem[];
  seo: SeoContent;
  footer: FooterContent;
  legal: LegalContent;
  schedulingConsent: SchedulingConsentContent;
  whatsappDefaultMessage: string;
}
