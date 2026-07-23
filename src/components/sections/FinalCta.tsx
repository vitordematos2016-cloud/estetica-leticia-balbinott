import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

export function FinalCta() {
  const { finalCta, contact, whatsappDefaultMessage } = siteContent;
  const whatsappUrl = buildWhatsAppUrl(contact.whatsappNumber, whatsappDefaultMessage);

  return (
    <section className="relative overflow-hidden bg-brown-dark py-24 text-center sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(177,138,85,0.2),transparent_65%)]"
      />

      <Container className="relative flex flex-col items-center gap-7">
        <h2 className="max-w-2xl font-heading text-3xl leading-[1.2] text-cream sm:text-4xl">
          {finalCta.title}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-cream-light/80 sm:text-lg">
          {finalCta.text}
        </p>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row">
          <Button href={finalCta.primaryCta.href} variant="primary" className="bg-gold text-brown-dark hover:bg-gold-soft">
            {finalCta.primaryCta.label}
          </Button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream-light/40 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-all hover:border-cream-light hover:bg-cream-light/10"
          >
            {finalCta.secondaryCtaLabel}
          </a>
        </div>
      </Container>
    </section>
  );
}
