import { useState } from 'react';
import type { LegalPolicyContent } from '../../types/siteContent';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { LegalPolicyModal } from '../ui/LegalPolicyModal';
import { Ornament } from '../ui/Ornament';
import { Reveal } from '../motion/reveal';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M8 2.5a5.5 5.5 0 0 0-4.8 8.2L2.5 13.5l2.9-.7A5.5 5.5 0 1 0 8 2.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M2.5 4.5 8 8.5l5.5-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const { brand, contact, address, nav, footer, legal } = siteContent;
  const whatsappUrl = buildWhatsAppUrl(contact.whatsappNumber, siteContent.whatsappDefaultMessage);
  const developerWhatsappUrl = buildWhatsAppUrl(
    footer.developerWhatsappNumber,
    footer.developerWhatsappMessage,
  );
  const [openPolicy, setOpenPolicy] = useState<LegalPolicyContent | null>(null);

  const mobileLinkClassName =
    'inline-flex min-h-11 items-center gap-2 text-sm text-cream-light/80 transition-colors duration-300 hover:text-gold active:text-gold';

  return (
    <footer className="bg-brown-dark text-cream-light">
      <Reveal>
        <div>
          {/* Celular (<640px): composição única, compacta e centralizada. */}
          <div className="flex flex-col items-center gap-7 px-5 py-12 text-center sm:hidden">
            <div className="flex flex-col items-center gap-1.5">
              <Ornament size="xs" className="mb-1" />
              <p className="font-heading text-2xl text-cream">{brand.name}</p>
              <p className="text-sm text-cream-light/70">{brand.professional}</p>
              <p className="text-sm text-cream-light/70">{brand.role}</p>
            </div>

            <span aria-hidden="true" className="h-px w-16 bg-gold/25" />

            <div className="flex w-full flex-col items-center gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
                Links rápidos
              </p>
              <nav
                aria-label="Links rápidos do rodapé"
                className="grid w-full max-w-xs grid-cols-2 gap-x-2 gap-y-1"
              >
                {nav.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex min-h-11 items-center justify-center rounded-lg px-2 text-sm text-cream-light/80 transition-colors duration-300 hover:text-gold active:text-gold"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <span aria-hidden="true" className="h-px w-16 bg-gold/25" />

            <div className="flex w-full flex-col items-center gap-2.5">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">Contato</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className={mobileLinkClassName}>
                <PhoneIcon />
                {contact.whatsappDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className={`${mobileLinkClassName} break-words`}>
                <MailIcon />
                {contact.email}
              </a>
              <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className={mobileLinkClassName}>
                <InstagramIcon />
                {contact.instagramHandle}
              </a>
            </div>

            <span aria-hidden="true" className="h-px w-16 bg-gold/25" />

            <div className="flex w-full flex-col items-center gap-1.5">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">Endereço</p>
              <a
                href={address.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir localização da Estética Letícia Balbinott no mapa"
                className="flex min-h-11 items-center text-sm text-cream-light/80 transition-colors duration-300 hover:text-gold active:text-gold"
              >
                {address.street}
              </a>
              <p className="text-xs text-cream-light/50">{address.reference}</p>
            </div>
          </div>

          {/* Tablet/desktop (>=640px): grade original preservada. */}
          <Container className="hidden gap-10 py-16 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="flex flex-col gap-3">
              <p className="font-heading text-2xl text-cream">{brand.name}</p>
              <p className="text-sm text-cream-light/70">{brand.professional}</p>
              <p className="text-sm text-cream-light/70">{brand.role}</p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
                Links rápidos
              </p>
              <nav aria-label="Links rápidos do rodapé" className="flex flex-col gap-2">
                {nav.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-cream-light/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">Contato</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-cream-light/80 transition-colors hover:text-gold"
              >
                <PhoneIcon />
                {contact.whatsappDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-sm text-cream-light/80 transition-colors hover:text-gold"
              >
                <MailIcon />
                {contact.email}
              </a>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-cream-light/80 transition-colors hover:text-gold"
              >
                <InstagramIcon />
                {contact.instagramHandle}
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">Endereço</p>
              <a
                href={address.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir localização da Estética Letícia Balbinott no mapa"
                className="text-sm text-cream-light/80 transition-colors hover:text-gold"
              >
                {address.street}
              </a>
              <p className="text-sm text-cream-light/60">{address.reference}</p>
            </div>
          </Container>
        </div>
      </Reveal>

      <div className="border-t border-cream-light/10 py-5">
        <Container className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <button
              type="button"
              onClick={() => setOpenPolicy(legal.privacyPolicy)}
              className="text-[0.7rem] text-cream-light/50 underline decoration-cream-light/20 underline-offset-2 transition-colors hover:text-gold"
            >
              {legal.privacyPolicy.title}
            </button>
            <button
              type="button"
              onClick={() => setOpenPolicy(legal.cancellationPolicy)}
              className="text-[0.7rem] text-cream-light/50 underline decoration-cream-light/20 underline-offset-2 transition-colors hover:text-gold"
            >
              {legal.cancellationPolicy.title}
            </button>
          </div>
          <p className="text-center text-[0.7rem] text-cream-light/40">{footer.copyright}</p>
          <p className="text-center text-[0.7rem] text-cream-light/40">
            {footer.developedByPrefix}
            <a
              href={developerWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar com a Matos Soluções pelo WhatsApp"
              className="text-gold/90 underline decoration-gold/40 underline-offset-2 transition-colors hover:text-gold hover:decoration-gold"
            >
              {footer.developerName}
            </a>
          </p>
        </Container>
      </div>

      <LegalPolicyModal policy={openPolicy} onClose={() => setOpenPolicy(null)} />
    </footer>
  );
}
