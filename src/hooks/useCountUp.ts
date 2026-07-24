import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Conta de 0 até `target` com easing suave via requestAnimationFrame,
 * disparada apenas quando `start` vira true, e apenas uma vez (ignora
 * `start` voltar a true depois de já ter contado). Com prefers-reduced-motion
 * mostra o valor final direto, sem animação.
 */
export function useCountUp(target: number, durationMs: number, start: boolean) {
  const [value, setValue] = useState(0);
  const hasStartedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!start || hasStartedRef.current) return;
    hasStartedRef.current = true;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let rafId: number;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, durationMs, prefersReducedMotion]);

  return value;
}
