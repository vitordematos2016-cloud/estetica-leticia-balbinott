import { HeroParticles } from './HeroParticles';

interface RayLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
  opacity: number;
}

interface RayArc {
  d: string;
  color: string;
  width: number;
  opacity: number;
}

// viewBox 100x140 -- mesma proporção aproximada do cartão (900x1200). Todas
// as linhas nascem fora da faixa central (25-75 horizontal / 15-95
// vertical) onde ficam rosto/mãos/produtos, e saem em diagonal pelas
// laterais e pela base, como pedido.
const OUTER_LINES: RayLine[] = [
  { x1: 18, y1: 8, x2: -14, y2: -22, color: '#e2bd79', width: 1.6, opacity: 0.75 },
  { x1: 82, y1: 8, x2: 114, y2: -22, color: '#f2dfb8', width: 1.2, opacity: 0.6 },
  { x1: 6, y1: 55, x2: -30, y2: 50, color: '#c89a4f', width: 1.8, opacity: 0.7 },
  { x1: 94, y1: 55, x2: 130, y2: 50, color: '#a8742f', width: 1.4, opacity: 0.55 },
  { x1: 24, y1: 118, x2: 6, y2: 156, color: '#e2bd79', width: 1.5, opacity: 0.65 },
  { x1: 76, y1: 118, x2: 94, y2: 156, color: '#c89a4f', width: 1.2, opacity: 0.55 },
];

const OUTER_ARCS: RayArc[] = [
  { d: 'M -10 30 Q -34 60 -8 100', color: '#f2dfb8', width: 1.4, opacity: 0.5 },
  { d: 'M 110 30 Q 134 60 108 100', color: '#e2bd79', width: 1.4, opacity: 0.5 },
];

const INNER_LINES: RayLine[] = [
  { x1: 14, y1: 30, x2: -6, y2: 14, color: '#f2dfb8', width: 1, opacity: 0.6 },
  { x1: 86, y1: 30, x2: 106, y2: 14, color: '#e2bd79', width: 0.9, opacity: 0.55 },
  { x1: 10, y1: 90, x2: -8, y2: 104, color: '#c89a4f', width: 1.1, opacity: 0.6 },
  { x1: 90, y1: 90, x2: 108, y2: 104, color: '#a8742f', width: 0.9, opacity: 0.5 },
];

function RaysSvg({ lines, arcs }: { lines: RayLine[]; arcs?: RayArc[] }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" className="absolute inset-0 h-full w-full overflow-visible">
      {lines.map((ray, index) => (
        <line
          key={index}
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          stroke={ray.color}
          strokeWidth={ray.width}
          strokeOpacity={ray.opacity}
          strokeLinecap="round"
        />
      ))}
      {arcs?.map((arc, index) => (
        <path
          key={index}
          d={arc.d}
          stroke={arc.color}
          strokeWidth={arc.width}
          strokeOpacity={arc.opacity}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/**
 * Feixes dourados champagne ao redor do cartão -- só existe montado durante
 * a transformação (o pai monta/desmonta via `showEffects`), então o próprio
 * ciclo de vida do componente cobre "aparecem no início, somem no fim": as
 * animações CSS (`animation-fill-mode: both`) já terminam em opacidade 0
 * antes do desmonte. Duas camadas independentes -- `--outer` (sentido
 * horário, mais lenta) e `--inner` (sentido anti-horário, mais rápida) --
 * para não parecerem um único elemento girando.
 */
export function HeroTransformationRays() {
  return (
    <div aria-hidden="true" className="hero-transform-rays pointer-events-none absolute inset-[-14%]">
      <div className="hero-transform-rays--outer absolute inset-0">
        <RaysSvg lines={OUTER_LINES} arcs={OUTER_ARCS} />
      </div>
      <div className="hero-transform-rays--inner absolute inset-[12%]">
        <RaysSvg lines={INNER_LINES} />
      </div>
      <HeroParticles />
    </div>
  );
}
