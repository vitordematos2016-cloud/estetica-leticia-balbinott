import { useEffect, useRef, useState } from 'react';
import splashImage from '../../assets/images/branding/abertura-estetica-leticia-balbinott.webp';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollLock } from '../../hooks/useScrollLock';

const STORAGE_KEY = 'splash-leticia-exibido';

if (typeof document !== 'undefined' && !document.head.querySelector(`link[href="${splashImage}"]`)) {
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'image';
  preloadLink.href = splashImage;
  document.head.appendChild(preloadLink);
}

type Phase = 'enter' | 'beam' | 'hold' | 'exit';

const TIMING = { enter: 700, beam: 1150, hold: 400, exit: 550 };
const REDUCED_TIMING = { enter: 0, beam: 0, hold: 250, exit: 200 };

function alreadyShown() {
  if (typeof window === 'undefined') return true;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

interface GlowRect {
  top: number;
  left: number;
  width: number;
}

export function Splash() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !alreadyShown());
  const [phase, setPhase] = useState<Phase>('enter');
  const [showSkip, setShowSkip] = useState(false);
  const [glowRect, setGlowRect] = useState<GlowRect | null>(null);
  const finishedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, prefersReducedMotion]);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* sessionStorage indisponível — apenas segue sem persistir */
    }
    setVisible(false);
  }

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
      className="fixed inset-0 z-[200] overflow-hidden bg-brown-dark outline-none transition-[opacity,filter] duration-500 ease-out"
      style={
        isExiting
          ? { opacity: 0, filter: 'blur(10px) brightness(0.85)' }
          : { opacity: 1, filter: 'blur(0px) brightness(1)' }
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,218,145,0.16),transparent_60%)] transition-opacity duration-700 ease-out"
        style={{ opacity: prefersReducedMotion || phase !== 'enter' ? 1 : 0 }}
      />

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

      {showBeam && <span aria-hidden="true" className="splash-beam pointer-events-none absolute inset-0" />}

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
        className={`fixed bottom-6 right-5 z-10 rounded-full border border-gold/40 bg-brown-dark/60 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-cream-light/85 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-cream sm:bottom-8 sm:right-8 ${
          showSkip ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        Pular abertura
      </button>
    </div>
  );
}
