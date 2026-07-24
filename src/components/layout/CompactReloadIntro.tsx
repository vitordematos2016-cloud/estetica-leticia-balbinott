import { useCallback, useEffect, useRef, useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollLock } from '../../hooks/useScrollLock';

type Phase = 'enter' | 'exit';

const TIMING = { hold: 1050, exit: 300 };
const REDUCED_TIMING = { hold: 200, exit: 300 };

interface CompactReloadIntroProps {
  onFinish: () => void;
}

export function CompactReloadIntro({ onFinish }: CompactReloadIntroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('enter');
  const finishedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinish();
  }, [onFinish]);

  useScrollLock(true);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    const timing = prefersReducedMotion ? REDUCED_TIMING : TIMING;
    const exitTimer = window.setTimeout(() => setPhase('exit'), timing.hold);
    const finishTimer = window.setTimeout(finish, timing.hold + timing.exit);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
    };
  }, [prefersReducedMotion, finish]);

  const isExiting = phase === 'exit';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={siteContent.brand.name}
      tabIndex={-1}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-brown-dark outline-none transition-[opacity,transform] duration-300 ease-out"
      style={
        isExiting
          ? { opacity: 0, transform: 'translateY(-6px)' }
          : { opacity: 1, transform: 'translateY(0)' }
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,218,145,0.12),transparent_60%)]"
      />

      <div className="relative flex flex-col items-center gap-3 text-center">
        <span
          className={`text-xs font-medium uppercase tracking-[0.4em] text-gold ${
            prefersReducedMotion ? '' : 'compact-word-in'
          }`}
        >
          Estética
        </span>

        <span className="relative inline-block">
          <span
            className={`font-heading text-3xl text-cream-light sm:text-4xl ${
              prefersReducedMotion ? '' : 'compact-name-in'
            }`}
          >
            {siteContent.brand.professional}
          </span>
          {!prefersReducedMotion && (
            <span aria-hidden="true" className="compact-shine pointer-events-none absolute inset-0" />
          )}
        </span>

        <span
          aria-hidden="true"
          className={`h-px w-20 bg-gold/60 sm:w-28 ${prefersReducedMotion ? '' : 'compact-line-grow'}`}
        />
      </div>
    </div>
  );
}
