import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

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
  'flex items-center gap-2.5 rounded-full border border-gold/40 bg-cream-light/60 px-6 py-3 text-sm font-medium text-brown-dark shadow-warm-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:shadow-warm';

export function InstagramShowcase() {
  const { instagramShowcase, contact } = siteContent;
  const slots = Array.from({ length: instagramShowcase.postsPlaceholderCount }, (_, index) => index + 1);
  const [isOpen, setIsOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bottomMarkerRef = useRef<HTMLDivElement>(null);

  // Só observa o marcador final enquanto aberto -- fechado, o botão inferior
  // nunca deve aparecer, então não há necessidade de rastrear a rolagem.
  useEffect(() => {
    if (!isOpen) {
      setIsAtBottom(false);
      return;
    }

    const node = bottomMarkerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setIsAtBottom(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [isOpen]);

  // Anima conforme isOpen. Ao abrir, cada publicação surge em sequência; ao
  // fechar, todas recolhem juntas (delay 0), sem nada "sobrando" visível.
  function cardOpenStyle(index: number): CSSProperties {
    return isOpen
      ? { opacity: 1, transitionDelay: `${150 + index * 60}ms` }
      : { opacity: 0, transform: 'translateY(16px)', transitionDelay: '0ms' };
  }

  // Nunca ambos ao mesmo tempo: o superior cobre "fechado" e "aberto, ainda no
  // início"; o inferior só existe quando aberto E o marcador final já entrou
  // na tela. O botão oculto é removido da renderização (nunca só opacity:0),
  // então nunca fica clicável nem focável por engano.
  const topButtonVisible = !(isOpen && isAtBottom);
  const bottomButtonVisible = isOpen && isAtBottom;

  function handleCloseFromBottom() {
    setIsOpen(false);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section ref={sectionRef} className="py-24 sm:py-28">
      <Container className="flex flex-col gap-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">Instagram</span>
          <h2 className="text-3xl leading-[1.2] text-brown-dark sm:text-4xl">{instagramShowcase.title}</h2>
          <p className="text-base leading-relaxed text-brown/75 sm:text-lg">{instagramShowcase.text}</p>

          {topButtonVisible && (
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              aria-expanded={isOpen}
              aria-controls="conteudo-instagram"
              className={`mt-2 ${toggleButtonClassName}`}
            >
              <InstagramIcon />
              {isOpen ? 'Ocultar publicações' : 'Ver publicações do Instagram'}
              <ToggleIcon up={isOpen} />
            </button>
          )}
        </div>

        <div
          id="conteudo-instagram"
          aria-hidden={!isOpen}
          className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${
            isOpen ? 'max-h-[2400px] sm:max-h-[1300px] lg:max-h-[1000px]' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-10 pt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {slots.map((slot, index) => (
                <div
                  key={slot}
                  className="transition-[opacity,transform] duration-500 ease-out"
                  style={cardOpenStyle(index)}
                >
                  <PlaceholderMedia label={`Publicação ${slot}`} description="Em preparação" ratio="square" />
                </div>
              ))}
            </div>

            <div ref={bottomMarkerRef} className="flex flex-col items-center gap-4 pb-2 text-center">
              <p className="text-sm text-brown/60">{instagramShowcase.notice}</p>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-brown-dark underline decoration-gold/50 underline-offset-4 hover:text-gold"
              >
                Acompanhar no Instagram
              </a>

              {bottomButtonVisible && (
                <button
                  type="button"
                  onClick={handleCloseFromBottom}
                  aria-expanded={isOpen}
                  aria-controls="conteudo-instagram"
                  className={`mb-4 mt-2 ${toggleButtonClassName}`}
                >
                  Ocultar publicações
                  <ToggleIcon up={true} />
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
