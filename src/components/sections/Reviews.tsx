import { useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-gold" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          width="17"
          height="17"
          viewBox="0 0 16 16"
          fill={index < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M8 1l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.8l-4.2 2.2.8-4.7L1.2 6l4.7-.7L8 1Z" />
        </svg>
      ))}
    </div>
  );
}

function LeafArrow({ direction }: { direction: 'prev' | 'next' }) {
  const tilt = direction === 'prev' ? '-rotate-12' : 'rotate-12';
  const corners =
    direction === 'prev'
      ? 'rounded-tl-none rounded-tr-full rounded-br-full rounded-bl-full'
      : 'rounded-tr-none rounded-tl-full rounded-bl-full rounded-br-full';

  return (
    <span
      aria-hidden="true"
      className={`flex h-10 w-10 items-center justify-center border border-gold/50 bg-cream shadow-warm-sm transition-all duration-300 ${corners} ${tilt} group-hover:border-gold group-hover:-translate-y-0.5 group-hover:shadow-warm`}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        className={`text-brown-dark ${direction === 'prev' ? 'rotate-12' : '-rotate-12'}`}
      >
        {direction === 'prev' ? (
          <path d="M8 2.5L3.5 6.5L8 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M5 2.5L9.5 6.5L5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </span>
  );
}

export function Reviews() {
  const { reviews, reviewsNotice, address } = siteContent;
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [animClass, setAnimClass] = useState('');
  const touchStartX = useRef<number | null>(null);

  function goToNext() {
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    setAnimClass(prefersReducedMotion ? 'review-fade-only' : 'review-slide-next');
  }

  function goToPrevious() {
    setIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setAnimClass(prefersReducedMotion ? 'review-fade-only' : 'review-slide-prev');
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      goToPrevious();
    }
  }

  function handleTouchStart(event: TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: TouchEvent) {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) goToNext();
    else if (index > 0) goToPrevious();
  }

  const current = reviews[index];

  return (
    <section id="avaliacoes" className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading eyebrow="Avaliações" title="O que dizem sobre a Estética Letícia Balbinott" />

        {reviews.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[2rem] border border-dashed border-gold/40 bg-cream px-8 py-14 text-center">
            <p className="text-base text-brown-dark">{reviewsNotice}</p>
          </div>
        ) : (
          <>
            <div
              role="region"
              aria-roledescription="carrossel"
              aria-label="Avaliações de clientes"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full max-w-xl rounded-none outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            >
              <figure
                key={current.id}
                className={`relative flex flex-col items-center gap-5 rounded-[2.5rem_2.5rem_2.5rem_1rem] border border-gold/25 bg-beige/25 px-7 py-9 text-center shadow-warm-sm sm:px-10 sm:py-11 ${animClass}`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-6 top-3 font-heading text-6xl leading-none text-gold/20 sm:text-7xl"
                >
                  “
                </span>

                <StarRow rating={current.rating} />

                <blockquote className="relative max-w-md text-base leading-relaxed text-brown-dark sm:text-lg">
                  “{current.text}”
                </blockquote>

                <figcaption className="flex flex-col items-center gap-1">
                  <span className="text-sm font-medium text-brown-dark">{current.author}</span>
                  <span className="text-xs text-brown/50">Avaliação publicada no Google</span>
                </figcaption>
              </figure>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="group flex items-center gap-4">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Ver avaliação anterior"
                    className="group"
                  >
                    <LeafArrow direction="prev" />
                  </button>
                )}
                <button type="button" onClick={goToNext} aria-label="Ver próxima avaliação" className="group">
                  <LeafArrow direction="next" />
                </button>
              </div>

              <p className="text-xs font-medium tracking-[0.15em] text-brown/50">
                {String(index + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
              </p>
            </div>
          </>
        )}

        <a
          href={address.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver todas as avaliações da Estética Letícia Balbinott no Google"
          className="flex items-center gap-2 rounded-full border border-gold/40 bg-transparent px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-brown-dark transition-colors hover:border-gold hover:bg-beige/30"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.8l-4.2 2.2.8-4.7L1.2 6l4.7-.7L8 1Z" fill="currentColor" className="text-gold" />
          </svg>
          Ver todas as avaliações no Google
        </a>
      </Container>
    </section>
  );
}
