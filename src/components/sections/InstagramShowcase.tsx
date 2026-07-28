import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/reveal';

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Bloco pequeno e minimalista, tratado como extra próximo do final da
 * página -- sem cards, carrossel ou galeria (removidos por decisão de
 * produto). Só ícone + título curto + frase curta + botão direto para o
 * Instagram, usando a mesma URL já cadastrada em `siteContent.contact`.
 */
export function InstagramShowcase() {
  const { instagramShowcase, contact } = siteContent;

  return (
    <section className="py-10 sm:py-12">
      <Container className="flex justify-center">
        <Reveal
          as="div"
          amount={0.4}
          className="flex w-full max-w-md flex-col items-center gap-3 rounded-[1.5rem] border border-gold/20 bg-cream-light/30 px-6 py-8 text-center shadow-warm-sm sm:px-8"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold">
            <InstagramIcon />
          </span>
          <h2 className="text-xl text-brown-dark sm:text-2xl">{instagramShowcase.title}</h2>
          <p className="text-sm leading-relaxed text-brown/70">{instagramShowcase.text}</p>
          <Button
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="mt-1 px-6 py-2.5 text-xs"
          >
            {instagramShowcase.ctaLabel}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
