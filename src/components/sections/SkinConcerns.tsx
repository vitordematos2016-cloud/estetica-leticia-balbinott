import { motion } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useTreatmentsFilter } from '../../context/TreatmentsFilterContext';
import { Reveal, RevealGroup, RevealItem } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';

/**
 * Cada card continua sendo o mesmo `<a href="#tratamentos" onClick={...}>`
 * de sempre — só a apresentação visual mudou. Hover/toque seguem o mesmo
 * mecanismo já validado em Experience/ThoughtfulDetails: `group-hover` do
 * Tailwind só dispara com hover real (`@media (hover:hover)`, Tailwind v4),
 * `group-active` cobre toque e clique sem nunca ficar "preso", e o
 * `whileHover`/`whileTap` do Motion são neutralizados automaticamente sob
 * `prefers-reduced-motion` pelo `MotionConfig reducedMotion="user"` global.
 */
export function SkinConcerns() {
  const { skinConcerns } = siteContent;
  const { requestCategoryHighlight } = useTreatmentsFilter();

  return (
    <section className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading title={skinConcerns.title} text={skinConcerns.text} />
        </Reveal>

        <RevealGroup stagger={0.08} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skinConcerns.items.map((concern) => (
            <RevealItem key={concern.id}>
              <motion.a
                href="#tratamentos"
                onClick={(event) => {
                  // Se já existir um tratamento cadastrado nessa categoria, rolamos e
                  // destacamos esse card específico em vez do salto genérico do link.
                  const matchedId = requestCategoryHighlight(concern.categoryId);
                  if (matchedId) event.preventDefault();
                }}
                whileHover={{ y: -2.5 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="group relative flex h-full flex-col gap-2 overflow-hidden rounded-[1.75rem_1.75rem_1.75rem_0.75rem] border border-gold/25 bg-gradient-to-br from-cream via-cream to-beige/30 p-6 text-left shadow-warm-sm transition-all duration-300 hover:border-gold hover:shadow-warm active:border-gold active:shadow-warm"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/10 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
                />

                <span
                  aria-hidden="true"
                  className="relative h-1.5 w-1.5 rounded-full bg-gold/60 transition-transform duration-300 group-hover:scale-150 group-active:scale-150"
                />

                <span className="relative text-lg font-medium text-brown-dark transition-colors duration-300 group-hover:text-gold group-active:text-gold">
                  {concern.label}
                </span>
                <span className="relative text-sm leading-relaxed text-brown/65">
                  {concern.description}
                </span>

                <span className="relative mt-auto flex items-center gap-2 pt-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
                  Ver tratamentos
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1"
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent transition-all duration-300 group-hover:from-gold/80 group-active:from-gold/80"
                  />
                </span>
              </motion.a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
