import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Conta de 0 até `target` a ritmo linear via requestAnimationFrame,
 * disparada apenas quando `start` vira true, e apenas uma vez (ignora
 * `start` voltar a true depois de já ter contado). Com prefers-reduced-motion
 * mostra o valor final direto, sem animação.
 *
 * Ritmo linear (em vez de ease-out) é proposital: com um `target` pequeno
 * (ex.: 8), um easing que desacelera no fim faz o valor chegar ao número
 * final bem antes da duração terminar, dando a impressão de que o contador
 * "pulou" direto pro resultado em vez de contar. Linear mantém cada
 * incremento igualmente espaçado ao longo de toda a duração, então o
 * intervalo entre um número e outro fica sempre visível, seja o alvo 8 ou
 * 1000.
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
      setValue(Math.round(progress * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, durationMs, prefersReducedMotion]);

  return value;
}
