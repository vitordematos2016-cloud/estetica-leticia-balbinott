import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useExpandableSection } from '../../hooks/useExpandableSection';
import { RevealGroup, RevealItem } from '../motion/reveal';

function ToggleIcon({ up }: { up: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`text-gold transition-transform duration-300 ${up ? 'rotate-180' : ''}`}
    >
      <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const toggleButtonClassName =
  'flex items-center gap-2.5 rounded-full border border-gold/40 bg-cream px-6 py-3 text-sm font-medium text-brown-dark shadow-warm-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:shadow-warm';

export function Technologies() {
  const { technologies } = siteContent;
  const {
    isOpen,
    sectionRef,
    bottomMarkerRef,
    topButtonVisible,
    bottomButtonVisible,
    toggle,
    closeFromBottom,
  } = useExpandableSection<HTMLElement, HTMLDivElement>();

  return (
    <section ref={sectionRef} className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionHeading title={technologies.title} text={technologies.text} />

          {topButtonVisible && (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={isOpen}
              aria-controls="conteudo-tecnologias"
              className={`mt-2 ${toggleButtonClassName}`}
            >
              {isOpen ? 'Ocultar tecnologias e produtos' : 'Conhecer tecnologias e produtos'}
              <ToggleIcon up={isOpen} />
            </button>
          )}
        </div>

        <div
          id="conteudo-tecnologias"
          aria-hidden={!isOpen}
          className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${
            isOpen ? 'max-h-[1800px] sm:max-h-[1100px] lg:max-h-[700px]' : 'max-h-0'
          }`}
        >
          <div ref={bottomMarkerRef} className="flex flex-col items-center gap-8 pt-4">
            {technologies.items.length === 0 ? (
              <RevealGroup active={isOpen} as="div" className="w-full">
                <RevealItem
                  direction="none"
                  className="w-full rounded-[2rem] border border-dashed border-gold/40 bg-cream px-8 py-14 text-center"
                >
                  <p className="text-base text-brown-dark">{technologies.notice}</p>
                </RevealItem>
              </RevealGroup>
            ) : (
              <RevealGroup
                active={isOpen}
                stagger={0.08}
                delayChildren={0.15}
                className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {technologies.items.map((item) => (
                  <RevealItem
                    key={item.id}
                    className="flex flex-col gap-2 rounded-[1.75rem] border border-gold/25 bg-cream p-6 shadow-warm-sm"
                  >
                    <h3 className="text-lg text-brown-dark">{item.name}</h3>
                    <p className="text-sm leading-relaxed text-brown/70">{item.purpose}</p>
                    {item.benefit && (
                      <p className="text-xs font-medium uppercase tracking-wide text-gold">
                        {item.benefit}
                      </p>
                    )}
                  </RevealItem>
                ))}
              </RevealGroup>
            )}

            {bottomButtonVisible && (
              <button
                type="button"
                onClick={closeFromBottom}
                aria-expanded={isOpen}
                aria-controls="conteudo-tecnologias"
                className={`mb-4 ${toggleButtonClassName}`}
              >
                Ocultar tecnologias e produtos
                <ToggleIcon up={true} />
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
