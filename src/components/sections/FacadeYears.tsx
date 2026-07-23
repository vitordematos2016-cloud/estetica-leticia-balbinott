import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';

export function FacadeYears() {
  const { facade } = siteContent;

  return (
    <section className="relative overflow-hidden bg-brown-dark py-28 text-center sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(177,138,85,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
      />

      <Container className="relative flex flex-col items-center gap-6 fade-up">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-gold">
          {facade.title}
        </p>

        <div className="flex items-center gap-6">
          <span aria-hidden="true" className="hidden h-px w-16 bg-gold/50 sm:block" />
          <span className="font-heading text-[7rem] leading-none text-cream sm:text-[10rem]">
            {facade.years}
          </span>
          <span aria-hidden="true" className="hidden h-px w-16 bg-gold/50 sm:block" />
        </div>

        <p className="max-w-md text-lg leading-relaxed text-cream-light/80">{facade.text}</p>
      </Container>
    </section>
  );
}
