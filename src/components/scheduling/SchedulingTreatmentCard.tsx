import { motion } from 'motion/react';
import type { Treatment } from '../../types/siteContent';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';
import { getTreatmentCategoryName } from '../../utils/treatments';
import { EASE_OUT } from '../motion/variants';

interface SchedulingTreatmentCardProps {
  treatment: Treatment;
  isSelected: boolean;
  onSelect: (treatment: Treatment) => void;
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

/**
 * Card do catálogo de tratamentos dentro do agendamento -- reaproveita a
 * aparência visual de `TreatmentCard` (imagem, nome, subtítulo, categoria,
 * resumo), mas com uma única ação: selecionar para o agendamento. Sem "Ver
 * mais detalhes", sem "Adicionar à Minha Seleção" separado e sem nenhum
 * botão aninhado -- o cartão inteiro é um único `motion.button`, então não
 * existe risco de duas ações disparando no mesmo clique nem necessidade de
 * `stopPropagation` interno.
 */
export function SchedulingTreatmentCard({ treatment, isSelected, onSelect }: SchedulingTreatmentCardProps) {
  const categoryName = getTreatmentCategoryName(treatment.categoryId);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(treatment)}
      aria-pressed={isSelected}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className={`group flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border bg-cream text-left shadow-warm-sm transition-[box-shadow,border-color] duration-300 hover:shadow-warm active:shadow-warm ${
        isSelected ? 'border-gold shadow-warm' : 'border-gold/25'
      }`}
    >
      <div className="relative">
        <PlaceholderMedia
          label={treatment.name}
          description="Imagem em preparação"
          ratio="landscape"
          className="rounded-none rounded-t-[1.75rem] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        {isSelected && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-brown-dark shadow-warm-sm">
            <CheckIcon />
            Selecionado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {categoryName && (
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">{categoryName}</span>
        )}
        <h3 className="text-lg text-brown-dark">{treatment.name}</h3>
        {treatment.subtitle && (
          <p className="-mt-1 text-sm font-medium text-brown/70">{treatment.subtitle}</p>
        )}
        {treatment.summary && (
          <p className="flex-1 text-sm leading-relaxed text-brown/70">{treatment.summary}</p>
        )}
        <span
          className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
            isSelected
              ? 'bg-gold/20 text-brown-dark'
              : 'border border-gold/50 text-brown-dark transition-colors group-hover:bg-gold/10'
          }`}
        >
          {isSelected ? (
            <>
              <CheckIcon />
              Selecionado
            </>
          ) : (
            'Selecionar tratamento'
          )}
        </span>
      </div>
    </motion.button>
  );
}
