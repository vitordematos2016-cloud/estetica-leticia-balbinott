export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

// Mesma curva já usada em index.css (.splash-image-in) — reaproveitada aqui
// para manter a mesma assinatura de movimento em toda a experiência Motion.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN = [0.4, 0, 1, 1] as const;

export const directionOffset: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 22 },
  down: { y: -22 },
  left: { x: -32 },
  right: { x: 32 },
  none: {},
};

export const overlayBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: EASE_IN } },
};

export const overlayPanelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.26, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.97, y: 6, transition: { duration: 0.16, ease: EASE_IN } },
};
