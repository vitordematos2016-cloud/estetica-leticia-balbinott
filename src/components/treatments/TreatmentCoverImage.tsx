import { useState } from 'react';
import { TreatmentCoverArt } from './TreatmentCoverArt';

interface TreatmentCoverImageProps {
  treatmentId: string;
  coverImage?: string;
  label: string;
  className?: string;
  priority?: boolean;
}

/**
 * Enquadramento individual de cada capa oficial -- a maioria das artes
 * recebidas concentra o elemento principal na metade inferior (composição
 * deixa a parte de cima como respiro visual), por isso quase todas usam um
 * `object-position` deslocado para baixo; horizontal varia conforme onde o
 * elemento central de cada arte realmente está.
 */
const OBJECT_POSITIONS: Record<string, string> = {
  'limpeza-pele-premium': 'center 85%',
  'limp-ghk-cu': '68% 68%',
  dermaplaning: '62% 58%',
  'skin-class': '75% 78%',
  'herbal-peel': '38% 72%',
  'peeling-hollywood': 'center 62%',
  'skin-booster': '72% 62%',
  microagulhamento: 'center 72%',
  ultramed: 'center 82%',
  'rejuvenescedor-clareador': 'center',
  'jato-de-plasma': '58% 62%',
  'dep-laser-h': '42% 68%',
  'rem-tatuagem': '72% 74%',
};

/**
 * Capa oficial real do tratamento -- preenche por completo o contêiner do
 * chamador (posicionamento absoluto, `inset-0`), que é quem define a
 * proporção/altura do card. Some quando `coverImage` existir; se estiver
 * ausente ou falhar ao carregar, cai de volta para a ilustração conceitual
 * (nunca ícone quebrado, nunca espaço vazio). Exclusivo dos cards -- mídias
 * reais de procedimento/antes-depois continuam vindo só de
 * `media`/`beforeAfter` dentro do modal.
 */
export function TreatmentCoverImage({
  treatmentId,
  coverImage,
  label,
  className = '',
  priority = false,
}: TreatmentCoverImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!coverImage || failed) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <TreatmentCoverArt treatmentId={treatmentId} label={label} className="h-full" />
      </div>
    );
  }

  const objectPosition = OBJECT_POSITIONS[treatmentId] ?? 'center';

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-cream-light via-cream to-beige/50">
      <img
        src={coverImage}
        alt={label}
        width={640}
        height={800}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        onLoad={() => setLoaded(true)}
        onError={() => {
          console.warn(`Capa não encontrada ou falhou ao carregar: ${coverImage} (${label})`);
          setFailed(true);
        }}
        style={{ objectPosition }}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
}
