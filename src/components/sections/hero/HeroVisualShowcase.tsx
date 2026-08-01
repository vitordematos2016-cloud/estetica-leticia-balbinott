import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimation } from 'motion/react';
import { EASE_IN_OUT, EASE_OUT } from '../../motion/variants';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useRepeatableInView } from '../../../hooks/useRepeatableInView';
import { HeroFloatingImage } from './HeroFloatingImage';
import { HeroTransformationRays } from './HeroTransformationRays';
import { HeroTransformationPulse } from './HeroTransformationPulse';
import { HeroCarouselIndicators } from './HeroCarouselIndicators';

export interface HeroShowcaseImage {
  src: string;
  alt: string;
}

interface HeroVisualShowcaseProps {
  images: [HeroShowcaseImage, HeroShowcaseImage];
  /** Só começa a contar/animar depois que a abertura (splash) terminar. */
  active: boolean;
}

const HOLD_MS = 3000;
const RESTING_Z = 50;
const JUMP_PEAK_Z = 110;
const JUMP_TRANSITION = { duration: 0.3, ease: EASE_OUT };
// [0.4, 0, 0.2, 1] pedido pela cliente para o giro -- já existe como
// EASE_IN_OUT em motion/variants.ts (mesma curva usada no fechamento das
// portas de "Cuidado presente em cada detalhe").
const SPIN_TRANSITION = { duration: 1, ease: EASE_IN_OUT };
const FADE_OUT_TRANSITION = { duration: 0.12, ease: 'easeOut' as const };
const FADE_IN_TRANSITION = { duration: 0.2, ease: EASE_OUT };
const REDUCED_FADE_OUT_TRANSITION = { duration: 0.15, ease: 'easeOut' as const };
const REDUCED_FADE_IN_TRANSITION = { duration: 0.2, ease: EASE_OUT };

const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Orquestra a cena inteira: uma única imagem por vez, girando 360° antes de
 * trocar de arquivo (nunca durante), com raios/pulso só durante a
 * transformação. Única fonte de verdade para o timer de 3s -- ver o efeito
 * mais abaixo -- nada mais no componente cria `setTimeout`/`setInterval`.
 */
export function HeroVisualShowcase({ images, active }: HeroVisualShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();
  const sceneRef = useRef<HTMLDivElement>(null);
  const isSectionVisible = useRepeatableInView(sceneRef, { amount: 0.35 });
  const [isTabVisible, setIsTabVisible] = useState(() => document.visibilityState === 'visible');
  const [isMobile, setIsMobile] = useState(false);

  const [activeIndex, setActiveIndex] = useState<0 | 1>(0);
  const [isTransforming, setIsTransforming] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [pulseNonce, setPulseNonce] = useState(0);
  const isTransformingRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    setIsMobile(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    function handleVisibilityChange() {
      setIsTabVisible(document.visibilityState === 'visible');
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Estado de repouso inicial -- só uma vez, sem transição perceptível.
  useEffect(() => {
    controls.set({ rotateY: 0, scale: 1, opacity: 1, z: RESTING_Z, filter: 'brightness(1)' });
  }, [controls]);

  const transformToNextImage = useCallback(
    async (withJump: boolean) => {
      if (isTransformingRef.current) return;
      isTransformingRef.current = true;
      setIsTransforming(true);

      if (prefersReducedMotion) {
        await controls.start({ opacity: 0, transition: REDUCED_FADE_OUT_TRANSITION });
        setActiveIndex((current) => (current === 0 ? 1 : 0));
        controls.set({ opacity: 0, rotateY: 0, scale: 1, z: RESTING_Z, filter: 'brightness(1)' });
        await controls.start({ opacity: 1, transition: REDUCED_FADE_IN_TRANSITION });
        isTransformingRef.current = false;
        setIsTransforming(false);
        return;
      }

      setShowEffects(true);

      if (withJump) {
        await controls.start({
          scale: [1, isMobile ? 1.04 : 1.05, 1],
          z: [RESTING_Z, isMobile ? 85 : JUMP_PEAK_Z, RESTING_Z],
          transition: JUMP_TRANSITION,
        });
      }

      // Giro completo -- o MESMO arquivo continua sendo exibido do início ao
      // fim; nada troca aos 90/180/270°.
      await controls.start({
        rotateY: 360,
        scale: [1, 0.94, 1],
        filter: ['brightness(1)', 'brightness(1.08)', 'brightness(1)'],
        transition: SPIN_TRANSITION,
      });

      // Giro terminou e a imagem está de frente de novo -- pulso + troca.
      setPulseNonce((n) => n + 1);
      await controls.start({ opacity: 0, scale: 0.985, transition: FADE_OUT_TRANSITION });

      setActiveIndex((current) => (current === 0 ? 1 : 0));
      // `rotateY: 0` aqui é idêntico visualmente a 360° -- só redefine o
      // valor interno para nunca acumular 360/720/1080. Acontece com
      // opacidade em 0, então é imperceptível.
      controls.set({ rotateY: 0, scale: 0.985, opacity: 0, z: RESTING_Z, filter: 'brightness(1)' });

      await controls.start({ opacity: 1, scale: 1, transition: FADE_IN_TRANSITION });

      setShowEffects(false);
      isTransformingRef.current = false;
      setIsTransforming(false);
    },
    [controls, prefersReducedMotion, isMobile],
  );

  const handleImageActivate = useCallback(() => {
    if (isTransformingRef.current) return;
    void transformToNextImage(true);
  }, [transformToNextImage]);

  const handleIndicatorSelect = useCallback(
    (index: number) => {
      if (isTransformingRef.current || index === activeIndex) return;
      void transformToNextImage(false);
    },
    [transformToNextImage, activeIndex],
  );

  const canAutoplay = active && isSectionVisible && isTabVisible;

  // Única origem do timer automático: reagenda um `setTimeout` fresco toda
  // vez que fica livre para tocar (não transformando, seção visível, aba
  // ativa). Qualquer troca manual muda `isTransforming` para `true` no mesmo
  // instante, o que limpa este efeito antes de reagendar -- nunca há dois
  // timers concorrentes.
  useEffect(() => {
    if (!canAutoplay || isTransforming) return;
    const id = window.setTimeout(() => {
      void transformToNextImage(false);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [canAutoplay, isTransforming, activeIndex, transformToNextImage]);

  const current = images[activeIndex];

  return (
    <div ref={sceneRef} className="hero-visual-scene relative mx-auto">
      {/* Sem AnimatePresence aqui de propósito: os próprios keyframes CSS de
          `HeroTransformationRays` já terminam em opacidade 0 (`both`) bem
          antes do fim da transformação, então quando `showEffects` vira
          `false` (só depois que a nova imagem termina de entrar) o
          desmonte já não é visível. */}
      {showEffects && !prefersReducedMotion && <HeroTransformationRays />}

      <HeroFloatingImage
        src={current.src}
        alt={current.alt}
        controls={controls}
        isTransforming={isTransforming}
        prefersReducedMotion={prefersReducedMotion}
        onActivate={handleImageActivate}
      />

      {showEffects && !prefersReducedMotion && <HeroTransformationPulse pulseKey={pulseNonce} />}

      <HeroCarouselIndicators
        count={images.length}
        activeIndex={activeIndex}
        onSelect={handleIndicatorSelect}
        disabled={isTransforming}
      />
    </div>
  );
}
