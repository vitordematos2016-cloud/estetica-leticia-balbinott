import { useRef } from 'react';
import { useInView } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Ornament } from '../ui/Ornament';
import { Reveal } from '../motion/reveal';

export function Aftercare() {
  const { aftercare } = siteContent;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="relative overflow-hidden py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(177,138,85,0.07),transparent_60%)]"
      />

      <Container className="relative flex flex-col items-center gap-8">
        <div className="relative mx-auto flex max-w-lg flex-col items-center gap-4 overflow-hidden rounded-[2rem_2rem_2rem_0.75rem] border border-gold/25 bg-gradient-to-br from-cream via-cream-light to-beige/30 px-8 py-11 text-center shadow-warm-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/45 hover:shadow-warm">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold/10 blur-2xl"
          />

          <Reveal active={isInView} delay={0}>
            <div className="flex flex-col items-center gap-3">
              <Ornament size="xs">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="text-gold">
                  <path
                    d="M10 2c3 3 6 6.5 6 10a6 6 0 1 1-12 0c0-3.5 3-7 6-10Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </Ornament>
              <h2 className="text-2xl text-brown-dark sm:text-3xl">{aftercare.title}</h2>
            </div>
          </Reveal>

          <Reveal active={isInView} delay={0.15}>
            <div className="flex flex-col items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-gradient-to-r from-transparent via-gold/50 to-transparent"
              />
              <p className="text-base leading-relaxed text-brown/75">{aftercare.text}</p>
            </div>
          </Reveal>
        </div>

        <Reveal active={isInView} delay={0.3}>
          <Button href={aftercare.cta.href} variant="primary" className="whitespace-nowrap active:scale-[0.99]">
            {aftercare.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
