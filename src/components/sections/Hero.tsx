import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function Hero() {
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
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-beige/40 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-40 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="flex flex-col items-start gap-7 fade-up">
          <Badge>{hero.eyebrow}</Badge>
          <h1 className="text-4xl leading-[1.15] text-brown-dark sm:text-5xl lg:text-[3.4rem]">
            {hero.title}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-brown/80 sm:text-lg">
            {hero.description}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs fade-up sm:max-w-sm" style={{ animationDelay: '0.15s' }}>
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-beige/60 via-cream-light/40 to-transparent blur-2xl"
          />

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
            className="relative flex aspect-[941/1672] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-[3rem] rounded-tr-[6rem] border border-gold/40 bg-gradient-to-br from-cream-light via-cream to-beige/40 text-center shadow-warm"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-12 -right-6 h-40 w-40 rounded-full bg-brown/10 blur-2xl"
            />
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
            <p className="px-8 text-sm font-medium uppercase tracking-[0.18em] text-brown/70">
              Foto profissional da {professionalFirstName}
            </p>
            <p className="px-8 text-xs text-brown/50">Em preparação</p>
          </div>

          <div
            aria-hidden="true"
            className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full border border-gold/35 sm:h-24 sm:w-24"
          />
        </div>
      </Container>
    </section>
  );
}
