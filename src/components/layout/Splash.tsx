import { useCallback, useEffect, useRef, useState } from 'react';
import splashDesktop from '../../assets/images/branding/abertura-estetica-leticia-balbinott.webp';
import splashMobile from '../../assets/images/branding/abertura-estetica-leticia-balbinott-mobile.webp';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollLock } from '../../hooks/useScrollLock';
import { markSplashAsShown, wasSplashAlreadyShown } from '../../utils/splashSession';

type Phase = 'enter' | 'beam' | 'hold' | 'exit';

// `hold` + `exit` calibrados para o pedido da cliente: capa visível por
// ~2200-2800ms (enter+beam+hold) e saída em ~600-800ms.
const TIMING = { enter: 600, beam: 1100, hold: 550, exit: 700 };
const REDUCED_TIMING = { enter: 0, beam: 0, hold: 300, exit: 200 };

// Mesma faixa usada pelo resto do site para "é mobile" (`sm:` do Tailwind =
// 640px, mas a arte 9:16 foi desenhada para caber com folga até tablets
// estreitos em retrato) -- reavaliada a cada render via `matchMedia`, então
// gira o aparelho durante a apresentação e o `<picture>` troca de fonte
// sozinho, sem JS extra.
const MOBILE_PORTRAIT_QUERY = '(max-width: 767px) and (orientation: portrait)';

interface GlowRect {
  top: number;
  left: number;
  width: number;
}

interface SplashProps {
  onFinish: () => void;
}

/** Nunca rejeita -- uma falha de rede/decodificação não deve travar a
 * apresentação para sempre, só faz a promessa resolver mesmo assim. */
function preloadAndDecode(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (typeof img.decode === 'function') {
      img.decode().then(() => resolve(), () => resolve());
    } else {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    }
  });
}

export function Splash({ onFinish }: SplashProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !wasSplashAlreadyShown());
  // Só true depois que AMBAS as versões (desktop e mobile) já estiverem
  // decodificadas -- garante que, se o aparelho for girado em pleno
  // apresentação e o `<picture>` trocar de fonte, a troca seja instantânea
  // (já em cache/decodificada), sem novo flash de carregamento.
  const [ready, setReady] = useState(false);
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
    if (!visible) return;

    const preloadHref = window.matchMedia(MOBILE_PORTRAIT_QUERY).matches ? splashMobile : splashDesktop;
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = preloadHref;
    document.head.appendChild(preloadLink);

    let cancelled = false;
    // Timeout de segurança: se a imagem nunca carregar (rede ruim/offline),
    // a capa ainda assim revela e termina em vez de bloquear o site para
    // sempre atrás de um fundo sólido.
    const safetyTimeout = new Promise<void>((resolve) => window.setTimeout(resolve, 4000));

    Promise.race([
      Promise.all([preloadAndDecode(splashDesktop), preloadAndDecode(splashMobile)]),
      safetyTimeout,
    ]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
      preloadLink.remove();
    };
  }, [visible]);

  useEffect(() => {
    if (visible && ready) dialogRef.current?.focus();
  }, [visible, ready]);

  useEffect(() => {
    if (!visible || !ready) return;

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
  }, [visible, ready, phase]);

  useEffect(() => {
    if (!visible || !ready) return;

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
  }, [visible, ready, prefersReducedMotion, finish]);

  if (!visible) return null;

  const isExiting = phase === 'exit';
  const showBeam = ready && !prefersReducedMotion && phase !== 'enter';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Apresentação da Estética Letícia Balbinott"
      tabIndex={-1}
      // `w-dvw`/`h-dvh`/`min-h-svh` além do `fixed inset-0`: cobre o caso de
      // navegadores mobile que não recalculam `inset` dinamicamente contra a
      // barra de endereço retrátil (Safari/iOS, Chrome Android). Fundo
      // `cream-light` -- mesma família de tom claro/quente da própria arte
      // -- em vez do `brown-dark` antigo, para nunca aparecer um flash
      // marrom nas bordas enquanto a imagem carrega ou fora de proporção.
      className={`fixed inset-0 z-[99999] w-dvw h-dvh min-h-svh overflow-hidden bg-cream-light outline-none transition-[opacity,filter,transform] duration-[700ms] ease-out ${
        isExiting ? 'pointer-events-none' : ''
      }`}
      style={
        isExiting
          ? { opacity: 0, filter: 'blur(8px)', transform: 'scale(0.99)' }
          : { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' }
      }
    >
      {/* Enquanto `ready` é false (imagens ainda decodificando), só o fundo
          sólido acima aparece -- nunca uma capa pela metade, nunca o Hero
          por trás, nunca um flash branco. */}
      {ready && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(216,165,89,0.14),transparent_60%)] transition-opacity duration-700 ease-out"
            style={{ opacity: prefersReducedMotion || phase !== 'enter' ? 1 : 0 }}
          />

          {showBeam && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(216,165,89,0.3),transparent_55%)] splash-center-glow"
            />
          )}

          {/* Cada arquivo já vem na proporção certa para o aparelho (16:9
              desktop, 9:16 mobile em retrato) -- `contain` só garante que
              nada seja cortado/deformado em proporções fora do padrão
              (ex.: ultrawide, tablets). Nunca `cover`. */}
          <picture className="absolute inset-0 block h-full w-full">
            <source media={MOBILE_PORTRAIT_QUERY} srcSet={splashMobile} />
            <img
              ref={imgRef}
              src={splashDesktop}
              alt="Estética Letícia Balbinott"
              width={1536}
              height={1024}
              fetchPriority="high"
              decoding="async"
              className={`block h-full w-full object-contain object-center ${prefersReducedMotion ? '' : 'splash-image-in'}`}
            />
          </picture>

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

          {isExiting && !prefersReducedMotion && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(216,165,89,0.35),transparent_60%)] splash-exit-glow"
            />
          )}
        </>
      )}

      <button
        type="button"
        onClick={finish}
        className={`fixed bottom-6 right-5 z-10 rounded-full border border-gold/40 bg-cream-light/70 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-brown-dark/85 backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-brown-dark active:border-gold active:text-brown-dark sm:bottom-8 sm:right-8 ${
          showSkip ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        Pular abertura
      </button>
    </div>
  );
}
