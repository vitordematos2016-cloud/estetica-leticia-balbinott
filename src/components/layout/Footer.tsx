import { useState } from 'react';
import type { LegalPolicyContent } from '../../types/siteContent';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { LegalPolicyModal } from '../ui/LegalPolicyModal';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

export function Footer() {
  const { brand, contact, address, nav, footer, legal } = siteContent;
  const whatsappUrl = buildWhatsAppUrl(contact.whatsappNumber, siteContent.whatsappDefaultMessage);
  const [openPolicy, setOpenPolicy] = useState<LegalPolicyContent | null>(null);

  return (
    <footer className="bg-brown-dark text-cream-light">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
            className="text-sm text-cream-light/80 transition-colors hover:text-gold"
          >
            {contact.whatsappDisplay}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-cream-light/80 transition-colors hover:text-gold"
          >
            {contact.email}
          </a>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-cream-light/80 transition-colors hover:text-gold"
          >
            {contact.instagramHandle}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">Endereço</p>
          <p className="text-sm text-cream-light/80">{address.street}</p>
          <p className="text-sm text-cream-light/60">{address.reference}</p>
        </div>
      </Container>

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
          <p className="text-center text-[0.7rem] text-cream-light/40">{footer.developedBy}</p>
        </Container>
      </div>

      <LegalPolicyModal policy={openPolicy} onClose={() => setOpenPolicy(null)} />
    </footer>
  );
}
