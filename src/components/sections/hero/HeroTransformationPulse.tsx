interface HeroTransformationPulseProps {
  /** Muda a cada ciclo -- remonta o `span` (via `key`) para reiniciar a
   * animação CSS em vez de reaproveitar um nó que já terminou em opacidade 0. */
  pulseKey: number;
}

/** Halo champagne breve (~220ms) no instante em que o giro termina, antes da
 * troca de arquivo -- ver `HeroVisualShowcase.transformToNextImage`. */
export function HeroTransformationPulse({ pulseKey }: HeroTransformationPulseProps) {
  return (
    <span
      key={pulseKey}
      aria-hidden="true"
      className="hero-transform-pulse pointer-events-none absolute inset-[-10%] rounded-[2rem]"
    />
  );
}
