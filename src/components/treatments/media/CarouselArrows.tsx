import { motion } from 'motion/react';
import { PREMIUM_HOVER_TRANSITION } from '../../motion/variants';
import { useGoldRipple } from '../../../hooks/useGoldRipple';

interface CarouselArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
}

/**
 * Setas premium do carrossel -- dourado fosco sobre fundo translúcido escuro
 * para manter contraste em cima de qualquer foto/vídeo. Só deve ser
 * renderizado pelo chamador quando a lista ativa tem mais de um item.
 */
export function CarouselArrows({ onPrev, onNext, prevLabel = 'Item anterior', nextLabel = 'Próximo item' }: CarouselArrowsProps) {
  return (
    <>
      <CarouselArrow direction="prev" onClick={onPrev} label={prevLabel} />
      <CarouselArrow direction="next" onClick={onNext} label={nextLabel} />
    </>
  );
}

function CarouselArrow({
  direction,
  onClick,
  label,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  label: string;
}) {
  const { onPointerDown, rippleLayer } = useGoldRipple();
  const isPrev = direction === 'prev';

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onPointerDown={onPointerDown}
      aria-label={label}
      whileHover={{
        scale: 1.08,
        rotate: isPrev ? -6 : 6,
        boxShadow: '0 0 0 4px rgba(177,138,85,0.16), 0 8px 18px -8px rgba(177,138,85,0.55)',
        transition: PREMIUM_HOVER_TRANSITION,
      }}
      whileTap={{ scale: 0.92 }}
      className={`absolute top-1/2 z-20 -translate-y-1/2 ${
        isPrev ? 'left-3' : 'right-3'
      } flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-gold/50 bg-brown-dark/35 text-gold-soft backdrop-blur-sm transition-colors hover:border-gold hover:bg-brown-dark/45`}
    >
      {rippleLayer}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {isPrev ? (
          <path d="M10 2 4 8l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </motion.button>
  );
}
