/**
 * Capas ilustradas premium para os cards de tratamento -- composições
 * abstratas/conceituais (sem fotos de pessoas, sem antes/depois, sem
 * agulhas/seringas em destaque), uma por tratamento, todas com a mesma
 * moldura e identidade (fundo bege/creme, borda dourada fina, textura
 * discreta), mudando só o elemento central e pequenos detalhes de cor.
 *
 * Sem geração de imagem (sem GEMINI_API_KEY configurada neste ambiente) --
 * tudo é SVG/gradiente/CSS, decisão confirmada com o usuário. Sem loop
 * contínuo por card (isto renderiza numa grade com vários cards ao mesmo
 * tempo -- animações contínuas em cada um seriam um risco de performance
 * real, diferente de um único hero como o da seção Sobre); o movimento
 * (elemento se deslocando, luz atravessando, borda acendendo) só acontece
 * no hover/toque, via `group-hover`/`group-active` puro em CSS -- só
 * dispara com o `group` já existente no card (`TreatmentCard`/
 * `SchedulingTreatmentCard`), sem estado novo.
 */

interface TreatmentCoverArtProps {
  treatmentId: string;
  label: string;
  className?: string;
}

const SWEEP_CLASSES =
  'pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-cream/60 to-transparent opacity-0 transition-[transform,opacity] duration-[1200ms] ease-out group-hover:translate-x-[420%] group-hover:opacity-100 group-active:translate-x-[420%] group-active:opacity-100 motion-reduce:transition-none motion-reduce:opacity-0';

const ELEMENT_MOTION_CLASSES =
  'transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03] group-active:-translate-y-1 group-active:scale-[1.03] motion-reduce:transition-none';

function Frame({ borderClass = 'border-gold/25' }: { borderClass?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-2.5 rounded-[1.15rem] border transition-colors duration-500 ${borderClass} group-hover:border-gold/55 group-active:border-gold/55`}
    />
  );
}

function Bubble({ className, style }: { className: string; style?: React.CSSProperties }) {
  return <div aria-hidden="true" className={`absolute rounded-full ${className}`} style={style} />;
}

const RIBBON_PATH = 'M -10 70 C 60 40, 120 100, 190 55 C 250 15, 300 60, 340 35';

function GoldRibbon({ opacity = 0.5, stroke = '#b18a55' }: { opacity?: number; stroke?: string }) {
  return (
    <svg viewBox="0 0 320 120" className="absolute inset-x-0 bottom-2 h-1/2 w-full" aria-hidden="true">
      <path d={RIBBON_PATH} fill="none" stroke={stroke} strokeWidth={3} strokeLinecap="round" opacity={opacity} />
    </svg>
  );
}

function Leaf({ transform, fill }: { transform: string; fill: string }) {
  return (
    <path
      d="M0 20 C 4 4 20 -6 36 0 C 30 14 18 26 0 20 Z"
      transform={transform}
      fill={fill}
    />
  );
}

/** Cada função retorna só o elemento conceitual central -- o invólucro
 * (fundo, textura, moldura, sweep) já vem do componente principal. */
const COVER_RENDERERS: Record<string, () => React.ReactNode> = {
  // Limpeza de Pele Premium -- espuma delicada + fita dourada.
  'limpeza-pele-premium': () => (
    <div className={`relative h-full w-full ${ELEMENT_MOTION_CLASSES}`}>
      <Bubble className="left-[8%] top-[52%] h-14 w-14 bg-cream-light/90 blur-[1px]" />
      <Bubble className="left-[20%] top-[38%] h-9 w-9 bg-cream/95" />
      <Bubble className="left-[16%] top-[62%] h-5 w-5 bg-cream" />
      <Bubble className="left-[30%] top-[30%] h-4 w-4 bg-gold-soft/50" />
      <GoldRibbon opacity={0.55} />
    </div>
  ),

  // Limpeza de Pele GHK-Cu -- gota de sérum, cobre + azul muito suave.
  'limp-ghk-cu': () => (
    <div className={`relative flex h-full w-full items-center justify-center ${ELEMENT_MOTION_CLASSES}`}>
      <svg viewBox="0 0 100 120" className="h-24 w-24" aria-hidden="true">
        <path
          d="M50 6c16 24 32 44 32 66a32 32 0 1 1-64 0c0-22 16-42 32-66Z"
          fill="url(#ghkDropletGradient)"
          opacity={0.85}
        />
        <circle cx="50" cy="78" r="12" fill="#c9d6d3" opacity={0.55} />
        <defs>
          <linearGradient id="ghkDropletGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c9d6d3" />
            <stop offset="60%" stopColor="#d9c6ae" />
            <stop offset="100%" stopColor="#b18a55" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute right-[18%] top-[24%] h-3 w-3 rounded-full bg-[#b8895a]/70" />
      <span className="absolute right-[26%] top-[38%] h-1.5 w-1.5 rounded-full bg-[#b8895a]/50" />
    </div>
  ),

  // Dermaplaning -- pena deslizando.
  dermaplaning: () => (
    <div className={`relative flex h-full w-full items-center justify-center ${ELEMENT_MOTION_CLASSES}`}>
      <svg viewBox="0 0 140 140" className="h-28 w-28 -rotate-[18deg]" aria-hidden="true">
        <path
          d="M70 8c22 10 30 34 26 58-3 20-14 40-26 62-12-22-23-42-26-62-4-24 4-48 26-58Z"
          fill="url(#featherGradient)"
        />
        <path d="M70 10v118" stroke="#b18a55" strokeWidth={1.2} opacity={0.6} />
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={i}
            d={`M70 ${28 + i * 14} q-22 6 -30 ${16 + i * 2}`}
            fill="none"
            stroke="#c9a06d"
            strokeWidth={0.8}
            opacity={0.4}
          />
        ))}
        <defs>
          <linearGradient id="featherGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdf9" />
            <stop offset="100%" stopColor="#d9c6ae" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),

  // Skin Glass / Peeling de Vidro -- vidro translúcido, reflexos líquidos.
  'skin-class': () => (
    <div className={`relative flex h-full w-full items-center justify-center ${ELEMENT_MOTION_CLASSES}`}>
      <svg viewBox="0 0 300 140" className="h-28 w-full px-4" aria-hidden="true">
        <path d="M0 90 C 60 40, 110 120, 170 70 C 220 30, 260 90, 300 55" fill="none" stroke="#c9a06d" strokeWidth={2} opacity={0.35} />
        <path d="M0 100 C 60 55, 110 130, 170 82 C 220 42, 260 100, 300 66" fill="none" stroke="#fffdf9" strokeWidth={4} opacity={0.5} />
        <ellipse cx="90" cy="60" rx="10" ry="7" fill="#fffdf9" opacity={0.6} />
        <ellipse cx="210" cy="48" rx="6" ry="4.5" fill="#fffdf9" opacity={0.5} />
      </svg>
    </div>
  ),

  microagulhamento: () => (
    <div className={`relative h-full w-full ${ELEMENT_MOTION_CLASSES}`}>
      <svg viewBox="0 0 300 140" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, row) =>
          Array.from({ length: 14 }).map((_, col) => {
            const wave = Math.sin((col / 13) * Math.PI * 1.4 + row * 0.4) * 10;
            return (
              <circle
                key={`${row}-${col}`}
                cx={20 + col * 20}
                cy={30 + row * 9 + wave}
                r={1.1}
                fill="#b18a55"
                opacity={0.25 + (row / 10) * 0.35}
              />
            );
          }),
        )}
      </svg>
    </div>
  ),

  // Skin Booster -- bolhas + viço.
  'skin-booster': () => (
    <div className={`relative h-full w-full ${ELEMENT_MOTION_CLASSES}`}>
      <Bubble className="left-[62%] top-[30%] h-8 w-8 border border-gold/40 bg-cream-light/30" />
      <Bubble className="left-[74%] top-[48%] h-14 w-14 border border-gold/30 bg-cream/25" />
      <Bubble className="left-[54%] top-[58%] h-5 w-5 border border-gold/40 bg-cream-light/40" />
      <Bubble className="left-[82%] top-[26%] h-4 w-4 bg-gold-soft/40" />
      <GoldRibbon opacity={0.4} />
    </div>
  ),

  // Peeling de Hollywood -- luz de estúdio.
  'peeling-hollywood': () => (
    <div className="relative h-full w-full">
      <div
        aria-hidden="true"
        className={`absolute left-1/2 top-0 h-full w-2/3 -translate-x-1/2 opacity-70 ${ELEMENT_MOTION_CLASSES}`}
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,253,249,0.85) 0%, rgba(201,160,109,0.35) 35%, transparent 70%)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[58%] h-2 w-2 -translate-x-1/2 rounded-full bg-cream shadow-[0_0_16px_6px_rgba(255,253,249,0.55)]"
      />
    </div>
  ),

  // Peeling Herbal -- folhas + flecos dourados.
  'herbal-peel': () => (
    <div className={`relative h-full w-full ${ELEMENT_MOTION_CLASSES}`}>
      <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <Leaf transform="translate(30 70) rotate(-20) scale(2.2)" fill="#8a8f5c" />
        <Leaf transform="translate(58 92) rotate(18) scale(1.7)" fill="#9ba166" />
        <Leaf transform="translate(20 50) rotate(-55) scale(1.3)" fill="#7c8452" />
        {Array.from({ length: 10 }).map((_, i) => (
          <circle
            key={i}
            cx={90 + (i % 5) * 22}
            cy={30 + Math.floor(i / 5) * 18}
            r={1.4}
            fill="#c9a06d"
            opacity={0.5}
          />
        ))}
      </svg>
    </div>
  ),

  // Ultramed -- ondas concêntricas douradas.
  ultramed: () => (
    <div className={`relative h-full w-full ${ELEMENT_MOTION_CLASSES}`}>
      <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[26, 44, 64, 86].map((r, i) => (
          <path
            key={r}
            d={`M ${200 - r} 140 A ${r} ${r} 0 0 0 200 ${140 - r}`}
            fill="none"
            stroke="#b18a55"
            strokeWidth={1.6}
            opacity={0.55 - i * 0.1}
          />
        ))}
      </svg>
    </div>
  ),

  // Tratamento Rejuvenescedor e Clareador -- transição sombra/luz.
  'rejuvenescedor-clareador': () => (
    <div className="relative h-full w-full overflow-hidden">
      <div
        aria-hidden="true"
        className={`absolute inset-0 opacity-90 ${ELEMENT_MOTION_CLASSES}`}
        style={{
          background: 'linear-gradient(115deg, rgba(91,64,51,0.22) 0%, rgba(217,198,174,0.15) 45%, rgba(255,253,249,0.65) 75%)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute left-[68%] top-[42%] h-2.5 w-2.5 rounded-full bg-cream shadow-[0_0_20px_8px_rgba(255,253,249,0.5)]"
      />
    </div>
  ),

  // Depilação a Laser -- linha de luz dourada.
  'dep-laser-h': () => (
    <div className={`relative h-full w-full ${ELEMENT_MOTION_CLASSES}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(217,198,174,0.35) 100%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute left-[10%] top-1/2 h-[2px] w-4/5 -translate-y-1/2 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_10px_2px_rgba(177,138,85,0.5)]"
      />
      <span
        aria-hidden="true"
        className="absolute left-[46%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cream shadow-[0_0_14px_5px_rgba(255,253,249,0.55)]"
      />
    </div>
  ),

  // Remoção de Tatuagem -- partículas se dissipando + feixe discreto.
  // Deslocamentos pseudo-aleatórios fixos (seno/cosseno do índice) em vez de
  // `Math.random()` -- essas funções não são componentes React (chamadas
  // direto como `render()`, sem hooks disponíveis), então `Math.random()`
  // recalcularia posições novas a cada re-render do card (ex.: hover em
  // outro lugar da grade), fazendo as partículas "pularem" de lugar.
  'rem-tatuagem': () => (
    <div className={`relative h-full w-full ${ELEMENT_MOTION_CLASSES}`}>
      <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M20 100 L150 45" stroke="#c9a06d" strokeWidth={1.5} opacity={0.4} />
        {Array.from({ length: 16 }).map((_, i) => {
          const t = i / 15;
          const jitterX = Math.sin(i * 12.9898) * 7;
          const jitterY = Math.cos(i * 78.233) * 7;
          const x = 20 + t * 130 + jitterX;
          const y = 100 - t * 55 + jitterY;
          return <circle key={i} cx={x} cy={y} r={1 + (1 - t) * 1.4} fill="#5b4033" opacity={0.15 + t * 0.35} />;
        })}
      </svg>
    </div>
  ),

  // Jato de Plasma -- arcos finos de energia dourada.
  'jato-de-plasma': () => (
    <div className={`relative h-full w-full ${ELEMENT_MOTION_CLASSES}`}>
      <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M20 100 Q 70 40 100 90 T 180 60" fill="none" stroke="#b18a55" strokeWidth={1.6} opacity={0.6} />
        <path d="M30 110 Q 80 60 110 100 T 190 75" fill="none" stroke="#fffdf9" strokeWidth={1} opacity={0.5} />
        <circle cx="100" cy="90" r="2" fill="#fffdf9" opacity={0.8} />
        <circle cx="180" cy="60" r="1.6" fill="#fffdf9" opacity={0.7} />
      </svg>
    </div>
  ),
};

const BG_TINTS: Record<string, string> = {
  'peeling-hollywood': 'from-[#4a3626] via-brown-dark to-[#2a1e18]',
  'herbal-peel': 'from-cream-light via-[#eef0e2] to-beige/60',
  'limp-ghk-cu': 'from-cream-light via-cream to-[#e4ecec]/60',
};

const DEFAULT_BG = 'from-cream-light via-cream to-beige/50';

/**
 * Capa ilustrada -- substitui `PlaceholderMedia` na mesma posição/formato
 * (aspect-[4/3], cantos arredondados só no topo, `className` repassado
 * pelos cards para as classes de rolagem/escala já existentes).
 */
export function TreatmentCoverArt({ treatmentId, label, className = '' }: TreatmentCoverArtProps) {
  const render = COVER_RENDERERS[treatmentId];
  const bg = BG_TINTS[treatmentId] ?? DEFAULT_BG;
  const isDark = treatmentId === 'peeling-hollywood';

  return (
    <div
      role="img"
      aria-label={`${label} -- ilustração conceitual do tratamento`}
      className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br ${bg} ${className}`}
    >
      {/* textura discreta */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, currentColor 0.5px, transparent 0.5px), radial-gradient(circle at 70% 60%, currentColor 0.5px, transparent 0.5px)',
          backgroundSize: '26px 26px',
          color: isDark ? '#fffdf9' : '#5b4033',
        }}
      />

      <Frame borderClass={isDark ? 'border-gold/30' : 'border-gold/20'} />

      <div className="relative z-10 h-full w-full p-6">{render?.()}</div>

      <div className={SWEEP_CLASSES} />
    </div>
  );
}
