import type { Treatment } from '../../types/siteContent';
import { TreatmentCoverFrame } from './TreatmentCoverFrame';
import { TreatmentCoverContent } from './TreatmentCoverContent';

interface TreatmentCardProps {
  treatment: Treatment;
  onViewDetails: (treatment: Treatment) => void;
  isHighlighted?: boolean;
}

/** Menor no mobile: largura com teto de 340px e altura própria (`clamp`) em
 * vez de `aspect-ratio` -- a partir de `sm:` volta ao tamanho/proporção
 * original (inalterado desde a aprovação anterior). */
const SIZE_CLASSES =
  'mx-auto w-[min(calc(100vw-32px),340px)] h-[clamp(390px,112vw,440px)] min-h-0 sm:mx-0 sm:h-auto sm:w-full sm:aspect-[4/5] sm:min-h-[430px]';

/**
 * Card da grade principal de Tratamentos -- só a moldura (`TreatmentCoverFrame`)
 * e o tamanho são definidos aqui; o conteúdo visual (logo LB, nome,
 * descrição breve, "Ver mais detalhes") vem de `TreatmentCoverContent`,
 * reaproveitado também pelo catálogo de Agendamento (`SchedulingTreatmentCard`)
 * -- uma única fonte para o visual da capa nos dois lugares.
 */
export function TreatmentCard({ treatment, onViewDetails, isHighlighted = false }: TreatmentCardProps) {
  return (
    <TreatmentCoverFrame
      treatment={treatment}
      isHighlighted={isHighlighted}
      id={`servico-${treatment.id}`}
      sizeClassName={SIZE_CLASSES}
    >
      <TreatmentCoverContent treatment={treatment} onViewDetails={onViewDetails} />
    </TreatmentCoverFrame>
  );
}
