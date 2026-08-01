interface HeroCarouselIndicatorsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  disabled: boolean;
}

/** Dois pontinhos discretos -- dourado (ativo) / bege (inativo). Cada botão
 * tem 32x32px de área de toque mesmo com o ponto visual bem menor. */
export function HeroCarouselIndicators({ count, activeIndex, onSelect, disabled }: HeroCarouselIndicatorsProps) {
  return (
    <div
      role="tablist"
      aria-label="Selecionar foto em destaque"
      className="relative z-10 mt-3 flex items-center justify-center gap-1"
    >
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Mostrar foto ${index + 1} de ${count}`}
            disabled={disabled}
            onClick={() => onSelect(index)}
            className="flex h-8 w-8 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:cursor-not-allowed"
          >
            <span
              aria-hidden="true"
              className={`block h-2 rounded-full transition-all duration-300 ${
                isActive ? 'w-5 bg-gold' : 'w-2 bg-beige hover:bg-gold/50'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
