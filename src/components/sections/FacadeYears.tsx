import { useRef } from 'react';
import { useInView } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { useCountUp } from '../../hooks/useCountUp';
import { Reveal } from '../motion/reveal';

export function FacadeYears() {
  const { facade } = siteContent;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const yearsValue = useCountUp(facade.years, 1200, isInView);
  const clientsValue = useCountUp(facade.clients, 1800, isInView);

  return (
    <section ref={ref} className="relative overflow-hidden bg-brown-dark py-24 text-center sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(177,138,85,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
      />

      <Container className="relative flex flex-col items-center gap-10">
        <Reveal
          as="p"
          active={isInView}
          direction="up"
          delay={0}
          className="text-sm font-medium uppercase tracking-[0.35em] text-gold"
        >
          {facade.title}
        </Reveal>

        <div className="flex flex-col items-center gap-8 md:flex-row md:items-stretch md:gap-14">
          <Reveal as="div" active={isInView} direction="none" delay={0.15} className="flex flex-col items-center gap-2">
            <span
              className="font-heading whitespace-nowrap text-[3rem] leading-none text-gold sm:text-[3.75rem] lg:text-[4.5rem]"
              aria-label={`Mais de ${facade.years} ${facade.yearsLabel}`}
            >
              <span aria-hidden="true">+</span>
              <span>{yearsValue}</span>
            </span>
            <Reveal as="p" active={isInView} direction="up" delay={0.4} className="text-sm font-medium uppercase tracking-[0.18em] text-cream-light/80">
              {facade.yearsLabel}
            </Reveal>
          </Reveal>

          <Reveal
            as="span"
            active={isInView}
            direction="none"
            delay={0.55}
            aria-hidden={true}
            className="h-px w-16 bg-gold/40 md:h-auto md:w-px md:self-stretch"
          />

          <Reveal as="div" active={isInView} direction="none" delay={0.15} className="flex flex-col items-center gap-2">
            <span
              className="font-heading whitespace-nowrap text-[3rem] leading-none text-gold sm:text-[3.75rem] lg:text-[4.5rem]"
              aria-label={`Mais de ${facade.clients.toLocaleString('pt-BR')} ${facade.clientsLabel}`}
            >
              <span aria-hidden="true">+</span>
              <span>{clientsValue.toLocaleString('pt-BR')}</span>
            </span>
            <Reveal as="p" active={isInView} direction="up" delay={0.45} className="text-sm font-medium uppercase tracking-[0.18em] text-cream-light/80">
              {facade.clientsLabel}
            </Reveal>
          </Reveal>
        </div>

        <Reveal as="p" active={isInView} direction="up" delay={0.7} className="max-w-md text-base leading-relaxed text-cream-light/70">
          {facade.text}
        </Reveal>
      </Container>
    </section>
  );
}
