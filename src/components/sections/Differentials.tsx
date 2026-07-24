import type { CSSProperties } from 'react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const icons = [
  <path key="ethics" d="M14 3v22M6 9l8-4 8 4M6 9l-4 10h8L6 9Zm16 0l-4 10h8l-4-10Z" />,
  <path key="care" d="M14 25s-9-5.6-9-13a5.5 5.5 0 0 1 9-4.2A5.5 5.5 0 0 1 23 12c0 7.4-9 13-9 13Z" />,
  <path key="natural" d="M14 25V13M14 13C8 13 5 9 5 4c5 0 9 3 9 9Zm0 0c0-6 4-9 9-9 0 5-3 9-9 9Z" />,
  <path key="safety" d="M14 3l10 4v7c0 6.5-4.3 10.9-10 13-5.7-2.1-10-6.5-10-13V7l10-4Z" />,
  <path key="innovation" d="M14 3v4M14 21v4M4 14H2M26 14h-2M6.5 6.5 5 5M23 23l-1.5-1.5M6.5 21.5 5 23M23 5l-1.5 1.5M20 14a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />,
  <path key="excellence" d="m14 3 3 6.5 7 1-5 5 1.3 7L14 19l-6.3 3.5L9 15.5l-5-5 7-1L14 3Z" />,
];

export function Differentials() {
  const { differential, values } = siteContent;
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.2);

  function revealStyle(delayMs: number): CSSProperties {
    return isVisible
      ? { opacity: 1, transitionDelay: `${delayMs}ms` }
      : { opacity: 0, transform: 'translateY(20px)', transitionDelay: `${delayMs}ms` };
  }

  // Transição própria (não depende da classe utilitária .reveal), para não
  // colidir com as classes de transform/shadow/border do hover do card.
  // Usa apenas propriedades longhand (nunca a shorthand `transition`) para
  // não conflitar com `transitionDelay` no mesmo objeto de estilo.
  function cardRevealStyle(delayMs: number): CSSProperties {
    return {
      ...(isVisible ? { opacity: 1 } : { opacity: 0, transform: 'translateY(20px)' }),
      transitionProperty: 'opacity, transform, box-shadow, border-color',
      transitionDuration: '750ms, 500ms, 300ms, 300ms',
      transitionTimingFunction: 'ease-out',
      transitionDelay: `${delayMs}ms`,
    };
  }

  return (
    <section className="relative overflow-hidden bg-cream-light/30 py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-beige/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
      />

      <Container className="relative flex flex-col gap-14">
        <div ref={ref} className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span
            className="reveal text-xs font-medium uppercase tracking-[0.28em] text-gold"
            style={revealStyle(0)}
          >
            {differential.eyebrow}
          </span>
          <h2
            className="reveal text-3xl leading-[1.2] text-brown-dark sm:text-4xl"
            style={revealStyle(100)}
          >
            {differential.title}
          </h2>
          <p className="reveal text-base leading-relaxed text-brown/75 sm:text-lg" style={revealStyle(200)}>
            {differential.text}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group relative flex flex-col gap-4 rounded-[1.75rem] border border-gold/20 bg-cream p-7 shadow-warm-sm hover:-translate-y-1 hover:border-gold/50 hover:shadow-warm"
              style={cardRevealStyle(350 + index * 100)}
            >
              <div className="flex items-center gap-3">
                <span className="font-heading text-2xl text-gold/70">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-brown-dark">
                  <svg width="18" height="18" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      {icons[index]}
                    </g>
                  </svg>
                </span>
              </div>

              <h3 className="text-lg text-brown-dark">{value.title}</h3>
              <p className="text-sm leading-relaxed text-brown/70">{value.text}</p>

              <span
                aria-hidden="true"
                className="mt-1 h-px w-10 bg-gold/60 transition-[width,opacity] duration-500 ease-out group-hover:w-16"
                style={{ opacity: isVisible ? 1 : 0, transitionDelay: `${450 + index * 100}ms` }}
              />
            </div>
          ))}
        </div>

        <p
          className="reveal mx-auto max-w-xl text-center text-base italic leading-relaxed text-brown/70"
          style={revealStyle(350 + values.length * 100 + 150)}
        >
          {differential.closing}
        </p>
      </Container>
    </section>
  );
}
