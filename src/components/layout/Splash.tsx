import { useCallback, useEffect, useRef, useState } from 'react';
import splashImage from '../../assets/images/branding/abertura-estetica-leticia-balbinott.webp';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollLock } from '../../hooks/useScrollLock';
import { markSplashAsShown, wasSplashAlreadyShown } from '../../utils/splashSession';

if (typeof document !== 'undefined' && !document.head.querySelector(`link[href="${splashImage}"]`)) {
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'image';
  preloadLink.href = splashImage;
  document.head.appendChild(preloadLink);
}

type Phase = 'enter' | 'beam' | 'hold' | 'exit';

const TIMING = { enter: 600, beam: 1100, hold: 300, exit: 600 };
const REDUCED_TIMING = { enter: 0, beam: 0, hold: 200, exit: 200 };

interface GlowRect {
  top: number;
  left: number;
  width: number;
}

interface SplashProps {
  onFinish: () => void;
}

export function Splash({ onFinish }: SplashProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !wasSplashAlreadyShown());
  const [phase, setPhase] = useState<Phase>('enter');
  const [showSkip, setShowSkip] = useState(false);
  const [glowRect, setGlowRect] = useState<GlowRect | null>(null);
  const finishedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    markSplashAsShown();
    setVisible(false);
    onFinish();
  }, [onFinish]);

  useScrollLock(visible);

  useEffect(() => {
    if (visible) dialogRef.current?.focus();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    function measureGlow() {
      const dialog = dialogRef.current;
      const img = imgRef.current;
      if (!dialog || !img) return;
      const dialogRect = dialog.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      setGlowRect({
        top: imgRect.top - dialogRect.top + imgRect.height * 0.708,
        left: imgRect.left - dialogRect.left + imgRect.width * 0.5,
        width: imgRect.width * 0.1,
      });
    }

    measureGlow();
    window.addEventListener('resize', measureGlow);
    return () => window.removeEventListener('resize', measureGlow);
  }, [visible, phase]);

  useEffect(() => {
    if (!visible) return;

    const timing = prefersReducedMotion ? REDUCED_TIMING : TIMING;
    const timers: number[] = [];

    timers.push(window.setTimeout(() => setShowSkip(true), prefersReducedMotion ? 0 : 700));
    timers.push(window.setTimeout(() => setPhase('beam'), timing.enter));
    timers.push(window.setTimeout(() => setPhase('hold'), timing.enter + timing.beam));
    timers.push(window.setTimeout(() => setPhase('exit'), timing.enter + timing.beam + timing.hold));
    timers.push(
      window.setTimeout(finish, timing.enter + timing.beam + timing.hold + timing.exit),
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [visible, prefersReducedMotion, finish]);

  if (!visible) return null;

  const isExiting = phase === 'exit';
  const showBeam = !prefersReducedMotion && phase !== 'enter';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Apresentação da Estética Letícia Balbinott"
      tabIndex={-1}
      className={`fixed inset-0 z-[9999] overflow-hidden bg-brown-dark outline-none transition-[opacity,filter,transform] duration-[600ms] ease-out ${
        isExiting ? 'pointer-events-none' : ''
      }`}
      style={
        isExiting
          ? { opacity: 0, filter: 'blur(8px)', transform: 'scale(0.99)' }
          : { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' }
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,218,145,0.16),transparent_60%)] transition-opacity duration-700 ease-out"
        style={{ opacity: prefersReducedMotion || phase !== 'enter' ? 1 : 0 }}
      />

      {showBeam && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,224,160,0.35),transparent_55%)] splash-center-glow"
        />
      )}

      <img
        ref={imgRef}
        src={splashImage}
        alt=""
        width={1536}
        height={1024}
        fetchPriority="high"
        decoding="async"
        className={`relative h-full w-full object-contain ${prefersReducedMotion ? '' : 'splash-image-in'}`}
      />

      {showBeam && <span aria-hidden="true" className="splash-beam pointer-events-none" />}

      {showBeam && glowRect && (
        <span
          aria-hidden="true"
          className="splash-line-glow pointer-events-none absolute h-[3px]"
          style={{
            top: glowRect.top,
            left: glowRect.left,
            width: glowRect.width,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      <button
        type="button"
        onClick={finish}
        className={`fixed bottom-6 right-5 z-10 rounded-full border border-gold/40 bg-brown-dark/60 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-cream-light/85 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-cream active:border-gold active:text-cream sm:bottom-8 sm:right-8 ${
          showSkip ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        Pular abertura
      </button>
    </div>
  );
}
