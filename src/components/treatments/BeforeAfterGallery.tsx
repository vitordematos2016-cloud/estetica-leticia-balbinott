import { useState } from 'react';
import type { TreatmentBeforeAfter } from '../../types/siteContent';
import { useScrollLock } from '../../hooks/useScrollLock';

interface BeforeAfterGalleryProps {
  beforeAfter: TreatmentBeforeAfter;
}

export function BeforeAfterGallery({ beforeAfter }: BeforeAfterGalleryProps) {
  const [expandedSide, setExpandedSide] = useState<'before' | 'after' | null>(null);

  useScrollLock(expandedSide !== null);

  const pairs: { side: 'before' | 'after'; label: string; src: string; alt: string }[] = [
    { side: 'before', label: 'Antes', src: beforeAfter.before, alt: beforeAfter.beforeAlt },
    { side: 'after', label: 'Depois', src: beforeAfter.after, alt: beforeAfter.afterAlt },
  ];

  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
        Antes e depois
      </p>
      <div className="grid grid-cols-2 gap-3">
        {pairs.map((pair) => (
          <button
            key={pair.side}
            type="button"
            onClick={() => setExpandedSide(pair.side)}
            aria-label={`Ampliar imagem: ${pair.label} do tratamento`}
            className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-gold/25 bg-cream-light/40"
          >
            <img
              src={pair.src}
              alt={pair.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute left-2 top-2 rounded-full bg-brown-dark/70 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-cream-light">
              {pair.label}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-brown/50">
        Resultados individuais podem variar. Cada tratamento é indicado após avaliação
        personalizada.
      </p>

      {expandedSide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ampliada: ${expandedSide === 'before' ? 'Antes' : 'Depois'}`}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-4 bg-brown-dark/90 px-4 py-8"
        >
          <button
            type="button"
            onClick={() => setExpandedSide(null)}
            aria-label="Fechar"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-cream-light/40 text-cream-light transition-colors hover:bg-cream-light/10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="relative flex w-full max-w-xl flex-1 items-center justify-center">
            {pairs.map(
              (pair) =>
                pair.side === expandedSide && (
                  <img
                    key={pair.side}
                    src={pair.src}
                    alt={pair.alt}
                    className="max-h-[75vh] w-full max-w-md rounded-2xl border border-gold/40 object-contain shadow-warm"
                  />
                ),
            )}
          </div>

          <div className="flex items-center gap-3">
            {pairs.map((pair) => (
              <button
                key={pair.side}
                type="button"
                onClick={() => setExpandedSide(pair.side)}
                aria-pressed={expandedSide === pair.side}
                className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                  expandedSide === pair.side
                    ? 'bg-cream-light text-brown-dark'
                    : 'border border-cream-light/40 text-cream-light hover:bg-cream-light/10'
                }`}
              >
                {pair.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
