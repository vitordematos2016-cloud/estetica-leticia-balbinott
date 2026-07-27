import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useTreatmentsFilter } from '../../context/TreatmentsFilterContext';
import { Reveal } from '../motion/reveal';

export function SkinConcerns() {
  const { skinConcerns } = siteContent;
  const { requestCategoryHighlight } = useTreatmentsFilter();

  return (
    <section className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading title={skinConcerns.title} text={skinConcerns.text} />
        </Reveal>

        <Reveal delay={0.1} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skinConcerns.items.map((concern) => (
            <a
              key={concern.id}
              href="#tratamentos"
              onClick={(event) => {
                // Se já existir um tratamento cadastrado nessa categoria, rolamos e
                // destacamos esse card específico em vez do salto genérico do link.
                const matchedId = requestCategoryHighlight(concern.categoryId);
                if (matchedId) event.preventDefault();
              }}
              className="group flex flex-col gap-2 rounded-[1.75rem] border border-gold/25 bg-cream p-6 text-left shadow-warm-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-warm"
            >
              <span className="text-lg text-brown-dark">{concern.label}</span>
              <span className="text-sm leading-relaxed text-brown/65">{concern.description}</span>
              <span className="mt-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                Ver tratamentos
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
