import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';

function revealStyle(isVisible: boolean, delayMs: number) {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
    transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
  };
}

export function FacadeYears() {
  const { facade } = siteContent;
  const { ref, isVisible } = useScrollReveal<HTMLElement>(0.3);

  const yearsValue = useCountUp(facade.years, 1200, isVisible);
  const clientsValue = useCountUp(facade.clients, 1800, isVisible);

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
        <p
          className="text-sm font-medium uppercase tracking-[0.35em] text-gold transition-all duration-700 ease-out"
          style={revealStyle(isVisible, 0)}
        >
          {facade.title}
        </p>

        <div className="flex flex-col items-center gap-8 md:flex-row md:items-stretch md:gap-14">
          <div
            className="flex flex-col items-center gap-2 transition-opacity duration-500 ease-out"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: isVisible ? '150ms' : '0ms' }}
          >
            <span
              className="font-heading whitespace-nowrap text-[3rem] leading-none text-gold sm:text-[3.75rem] lg:text-[4.5rem]"
              aria-label={`Mais de ${facade.years} ${facade.yearsLabel}`}
            >
              <span aria-hidden="true">+ DE </span>
              <span>{yearsValue}</span>
            </span>
            <p
              className="text-sm font-medium uppercase tracking-[0.18em] text-cream-light/80 transition-all duration-700 ease-out"
              style={revealStyle(isVisible, 400)}
            >
              {facade.yearsLabel}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="h-px w-16 bg-gold/40 transition-opacity duration-700 ease-out md:h-auto md:w-px md:self-stretch"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: isVisible ? '550ms' : '0ms' }}
          />

          <div
            className="flex flex-col items-center gap-2 transition-opacity duration-500 ease-out"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: isVisible ? '150ms' : '0ms' }}
          >
            <span
              className="font-heading whitespace-nowrap text-[3rem] leading-none text-gold sm:text-[3.75rem] lg:text-[4.5rem]"
              aria-label={`Mais de ${facade.clients.toLocaleString('pt-BR')} ${facade.clientsLabel}`}
            >
              <span aria-hidden="true">+</span>
              <span>{clientsValue.toLocaleString('pt-BR')}</span>
            </span>
            <p
              className="text-sm font-medium uppercase tracking-[0.18em] text-cream-light/80 transition-all duration-700 ease-out"
              style={revealStyle(isVisible, 450)}
            >
              {facade.clientsLabel}
            </p>
          </div>
        </div>

        <p
          className="max-w-md text-base leading-relaxed text-cream-light/70 transition-all duration-700 ease-out"
          style={revealStyle(isVisible, 700)}
        >
          {facade.text}
        </p>
      </Container>
    </section>
  );
}
