import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function HowItWorks() {
  const { howItWorks } = siteContent;

  return (
    <section className="py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading title={howItWorks.title} text={howItWorks.text} />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col gap-4 px-2">
              <span className="font-heading text-4xl text-gold/70">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl text-brown-dark">{step.title}</h3>
              <p className="text-sm leading-relaxed text-brown/70">{step.text}</p>
              {index < howItWorks.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-5 hidden h-px w-8 -translate-y-1/2 translate-x-full bg-gold/40 lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
