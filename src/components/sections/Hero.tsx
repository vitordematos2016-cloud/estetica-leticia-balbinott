import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Reveal, RevealGroup, RevealItem } from '../motion/reveal';

interface HeroProps {
  splashFinished: boolean;
}

export function Hero({ splashFinished }: HeroProps) {
  const { hero } = siteContent;
  const professionalFirstName = siteContent.brand.professional.split(' ')[0];

  return (
    <section id="inicio" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-light via-cream to-cream"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(177,138,85,0.10),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-beige/40 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-40 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <RevealGroup active={splashFinished} stagger={0.12} className="flex flex-col items-start gap-6">
          <RevealItem>
            <Badge>{hero.eyebrow}</Badge>
          </RevealItem>
          <RevealItem className="flex flex-col gap-6">
            <h1 className="text-4xl leading-[1.15] text-brown-dark sm:text-5xl lg:text-[3.4rem]">
              {hero.title}
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-brown/80 sm:text-lg">
              {hero.description}
            </p>
          </RevealItem>
          <RevealItem className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:gap-4">
            <Button
              href={hero.secondaryCta.href}
              variant="primary"
              className="w-full shadow-[0_20px_45px_-18px_rgba(177,138,85,0.55)] hover:shadow-[0_24px_55px_-16px_rgba(177,138,85,0.65)] sm:w-auto"
            >
              {hero.secondaryCta.label}
            </Button>
            <Button href={hero.primaryCta.href} variant="secondary" className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </Button>
          </RevealItem>
        </RevealGroup>

        <Reveal
          active={splashFinished}
          delay={0.15}
          className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-lg"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -rotate-3 rounded-[3rem] rounded-tr-[6rem] bg-beige/50"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-[3.5rem] bg-gold/10 blur-2xl"
          />

          <div className="absolute inset-0 rounded-[3rem] rounded-tr-[6rem] bg-gradient-to-br from-beige via-cream-light to-cream shadow-warm ring-1 ring-gold/15" />
          <div className="absolute inset-4 rounded-[2.5rem] rounded-tr-[5rem] border border-gold/40" />

          <svg
            aria-hidden="true"
            className="absolute -left-6 top-10 h-24 w-24 text-gold/60 sm:h-28 sm:w-28"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M50 4C50 30 70 30 96 30C70 30 50 60 50 96C50 60 30 30 4 30C30 30 50 30 50 4Z"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>

          <div
            role="img"
            aria-label={`Foto profissional da ${professionalFirstName}: em preparação`}
            className="absolute inset-x-8 bottom-8 top-8 flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-gold/30 bg-cream/40 text-center backdrop-blur-sm"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 text-gold">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.2" />
                <path
                  d="M4 24c1.2-6.5 5-9.5 10-9.5S22.8 17.5 24 24"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <p className="px-6 text-xs font-medium uppercase tracking-[0.2em] text-brown/60">
              Foto profissional da {professionalFirstName}
            </p>
            <p className="px-8 text-[0.7rem] text-brown/45">Em preparação</p>
          </div>

          <div
            aria-hidden="true"
            className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full border border-gold/35 sm:h-24 sm:w-24"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 h-4 w-4 rounded-full bg-gold shadow-[0_0_16px_4px_rgba(177,138,85,0.45)] sm:-bottom-4 sm:-right-4"
          />
        </Reveal>
      </Container>
    </section>
  );
}
