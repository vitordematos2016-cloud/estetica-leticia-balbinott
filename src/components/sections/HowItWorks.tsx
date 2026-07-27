import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../motion/reveal';

export function HowItWorks() {
  const { howItWorks } = siteContent;

  return (
    <section className="py-24 sm:py-28">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <SectionHeading eyebrow="Jornada" title={howItWorks.title} text={howItWorks.text} />
        </Reveal>

        <RevealGroup as="ol" stagger={0.08} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {howItWorks.steps.map((step, index) => (
            <RevealItem
              as="li"
              key={step.title}
              className="relative flex flex-col items-center gap-4 text-center"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-cream-light/50 font-heading text-2xl text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg text-brown-dark">{step.title}</h3>
              </div>
              <p className="max-w-[16rem] text-sm leading-relaxed text-brown/70">{step.text}</p>

              {index < howItWorks.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-[-1.5rem] top-8 hidden h-px w-12 bg-gold/40 lg:block"
                />
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
