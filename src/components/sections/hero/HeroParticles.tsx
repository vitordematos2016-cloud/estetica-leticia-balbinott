interface Particle {
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

// Posições fixas (não aleatórias a cada render) -- espalhadas nas bordas do
// cartão, nunca sobre o centro onde ficam rosto/produtos. Atrasos/duração
// levemente diferentes entre si para não "piscarem" em sincronia.
const PARTICLES: Particle[] = [
  { top: '8%', left: '-4%', size: 3, delay: 0, duration: 1.5 },
  { top: '22%', left: '104%', size: 2.5, delay: 0.18, duration: 1.7 },
  { top: '58%', left: '-8%', size: 2, delay: 0.32, duration: 1.4 },
  { top: '78%', left: '102%', size: 3, delay: 0.1, duration: 1.9 },
  { top: '96%', left: '30%', size: 2, delay: 0.45, duration: 1.6 },
  { top: '4%', left: '62%', size: 2, delay: 0.55, duration: 1.5 },
];

/** Pontos de luz champagne delicados, só durante a transformação -- some
 * junto com `HeroTransformationRays` (montado/desmontado pelo pai). */
export function HeroParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="hero-particle absolute rounded-full"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
