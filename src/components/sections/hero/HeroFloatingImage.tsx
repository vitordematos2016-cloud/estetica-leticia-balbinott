import { useEffect } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import { animate, motion, useAnimation, useMotionValue, useSpring, useTransform } from 'motion/react';

type HeroImageControls = ReturnType<typeof useAnimation>;

// Sombra 3D -- reage ao estado (parado vs. girando), não ao ciclo de
// abertura/fechamento de nenhum outro componente. Interpola suavemente
// porque as duas strings têm a mesma estrutura (2 `drop-shadow()` cada).
const RESTING_SHADOW = 'drop-shadow(0 26px 24px rgba(75,47,26,0.24)) drop-shadow(0 8px 14px rgba(200,156,85,0.18))';
const SPINNING_SHADOW = 'drop-shadow(0 38px 30px rgba(65,39,20,0.30)) drop-shadow(0 0 28px rgba(220,174,96,0.46))';

interface HeroFloatingImageProps {
  src: string;
  alt: string;
  controls: HeroImageControls;
  isTransforming: boolean;
  prefersReducedMotion: boolean;
  onActivate: () => void;
}

/**
 * Cartão 3D único. Duas camadas de movimento deliberadamente separadas para
 * não conflitarem no mesmo `rotateX`/`rotateY`:
 *
 * - Este wrapper (`hero-visual-image`) só cuida da flutuação ambiente (`y` +
 *   uma pequena oscilação de base em `rotateX`/`rotateY`) e da inclinação por
 *   mouse -- ambas somadas via `useTransform`, nunca pelo prop `animate`
 *   declarativo (que brigaria com o `style` vindo do spring do mouse).
 * - O elemento interno (`hero-visual-card`) é 100% controlado pelo
 *   `controls` do pai (`useAnimation`), que só ele comanda o giro de 360°, o
 *   salto (`z`/`scale`) e o pulso de brilho (`filter: brightness`) --
 *   nenhuma outra fonte escreve nessas propriedades.
 */
export function HeroFloatingImage({
  src,
  alt,
  controls,
  isTransforming,
  prefersReducedMotion,
  onActivate,
}: HeroFloatingImageProps) {
  const ambientY = useMotionValue(0);
  const ambientRotateX = useMotionValue(0.4);
  const ambientRotateY = useMotionValue(-0.8);

  useEffect(() => {
    if (prefersReducedMotion || isTransforming) {
      const toRest = [
        animate(ambientY, 0, { duration: 0.3, ease: 'easeOut' }),
        animate(ambientRotateX, 0, { duration: 0.3, ease: 'easeOut' }),
        animate(ambientRotateY, 0, { duration: 0.3, ease: 'easeOut' }),
      ];
      return () => toRest.forEach((playback) => playback.stop());
    }

    const loops = [
      animate(ambientY, [0, -6, 0], { duration: 5, repeat: Infinity, ease: 'easeInOut' }),
      animate(ambientRotateX, [0.4, 1.2, 0.4], { duration: 5, repeat: Infinity, ease: 'easeInOut' }),
      animate(ambientRotateY, [-0.8, 0.8, -0.8], { duration: 5, repeat: Infinity, ease: 'easeInOut' }),
    ];
    return () => loops.forEach((playback) => playback.stop());
  }, [isTransforming, prefersReducedMotion, ambientY, ambientRotateX, ambientRotateY]);

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltXSpring = useSpring(rawTiltX, { stiffness: 150, damping: 18, mass: 0.4 });
  const tiltYSpring = useSpring(rawTiltY, { stiffness: 150, damping: 18, mass: 0.4 });

  const combinedRotateX = useTransform([ambientRotateX, tiltXSpring], (values) =>
    (values as number[]).reduce((sum, value) => sum + value, 0),
  );
  const combinedRotateY = useTransform([ambientRotateY, tiltYSpring], (values) =>
    (values as number[]).reduce((sum, value) => sum + value, 0),
  );

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || isTransforming || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    rawTiltY.set(relX * 3);
    rawTiltX.set(relY * -2);
  }

  function handlePointerLeave() {
    rawTiltX.set(0);
    rawTiltY.set(0);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActivate();
    }
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`${alt} — toque para ver a próxima foto`}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ y: ambientY, rotateX: combinedRotateX, rotateY: combinedRotateY }}
      animate={{ filter: isTransforming ? SPINNING_SHADOW : RESTING_SHADOW }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="hero-visual-image group relative mx-auto block cursor-pointer touch-manipulation select-none outline-none focus-visible:rounded-[1.75rem] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
    >
      <motion.div
        animate={controls}
        style={{ transformStyle: 'preserve-3d' }}
        className="hero-visual-card relative h-full w-full overflow-hidden rounded-[1.75rem] border border-gold/55"
      >
        <img
          src={src}
          alt={alt}
          width={900}
          height={1200}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="block h-full w-full object-contain object-center"
        />
      </motion.div>
    </motion.div>
  );
}
