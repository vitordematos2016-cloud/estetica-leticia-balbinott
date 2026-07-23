import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export function PersonalAssessment() {
  const { personalAssessment } = siteContent;

  return (
    <section className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Avaliação
          </span>
          <h2 className="text-3xl leading-[1.2] text-brown-dark sm:text-4xl">
            {personalAssessment.title}
          </h2>
          <p className="text-base leading-relaxed text-brown/80 sm:text-lg">
            {personalAssessment.text}
          </p>

          <div>
            <Button href={personalAssessment.cta.href} variant="primary">
              {personalAssessment.cta.label}
            </Button>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {personalAssessment.criteria.map((criterion) => (
            <li
              key={criterion}
              className="flex items-center gap-3 rounded-2xl border border-gold/25 bg-cream px-5 py-4 text-sm text-brown-dark shadow-warm-sm"
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 7.5L5.5 10.5L11.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {criterion}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
