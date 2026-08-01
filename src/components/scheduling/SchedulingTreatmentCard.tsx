import { motion } from 'motion/react';
import type { Treatment } from '../../types/siteContent';
import { TreatmentCoverFrame } from '../treatments/TreatmentCoverFrame';
import { TreatmentCoverContent } from '../treatments/TreatmentCoverContent';
import { EASE_OUT } from '../motion/variants';

interface SchedulingTreatmentCardProps {
  treatment: Treatment;
  isSelected: boolean;
  onSelect: (treatment: Treatment) => void;
  onViewDetails: (treatment: Treatment) => void;
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.5 7.2l3 3 6-6.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Mesma altura de TreatmentCard, só um pouco maior para reservar espaço à
 * ação de seleção (`footerExtra`) sem comprimir o resto da capa -- não é uma
 * segunda proporção independente, é a mesma base (`aspect-[4/5]` no
 * desktop, mesma largura/formato no mobile) com ~48px a mais no fim. */
const SIZE_CLASSES =
  'mx-auto w-[min(calc(100vw-32px),340px)] h-[clamp(438px,124vw,488px)] min-h-0 sm:mx-0 sm:h-auto sm:w-full sm:aspect-[4/5] sm:min-h-[478px]';

/**
 * Card compacto do catálogo de Agendamento -- mesma capa oficial do card da
 * grade principal (`TreatmentCard`): mesma moldura (`TreatmentCoverFrame`) e
 * mesmo conteúdo (`TreatmentCoverContent`, logo LB, nome, descrição breve,
 * "Ver mais detalhes"), sem duplicar CSS/estrutura entre os dois lugares.
 * A única diferença é a ação de seleção, injetada via `footerExtra` --
 * reservada numa área própria abaixo de "Ver mais detalhes", nunca
 * sobrepondo texto ou arte. O selo "Selecionado" no canto superior (pequeno,
 * discreto) e o botão de seleção alternam texto conforme o estado, mantendo
 * a mesma lógica/rótulos já usados pelo agendamento.
 */
export function SchedulingTreatmentCard({
  treatment,
  isSelected,
  onSelect,
  onViewDetails,
}: SchedulingTreatmentCardProps) {
  return (
    <TreatmentCoverFrame treatment={treatment} isHighlighted={isSelected} sizeClassName={SIZE_CLASSES}>
      {isSelected && (
        <span className="absolute right-3 top-3 z-[3] flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-brown-dark shadow-warm-sm">
          <CheckIcon />
          Selecionado
        </span>
      )}

      <TreatmentCoverContent
        treatment={treatment}
        onViewDetails={onViewDetails}
        footerExtra={
          <motion.button
            type="button"
            onClick={() => onSelect(treatment)}
            aria-pressed={isSelected}
            aria-label={
              isSelected
                ? `Remover ${treatment.name} da seleção`
                : `Adicionar ${treatment.name} à seleção`
            }
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className={`inline-flex min-h-11 w-full max-w-[230px] items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm transition-colors duration-300 sm:w-auto ${
              isSelected
                ? 'border-gold-deep/30 bg-gold text-brown-dark hover:bg-gold-soft'
                : 'border-gold/50 bg-cream/70 text-brown-dark hover:border-gold hover:bg-cream'
            }`}
          >
            {isSelected ? (
              <>
                <CheckIcon />
                Remover da seleção
              </>
            ) : (
              <>
                <PlusIcon />
                Adicionar à seleção
              </>
            )}
          </motion.button>
        }
      />
    </TreatmentCoverFrame>
  );
}
