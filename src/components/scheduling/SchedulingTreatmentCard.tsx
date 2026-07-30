import { motion } from 'motion/react';
import type { Treatment } from '../../types/siteContent';
import { TreatmentCoverImage } from '../treatments/TreatmentCoverImage';
import { getTreatmentCategoryName } from '../../utils/treatments';
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

function ArrowIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5"
    >
      <path
        d="M2.5 7h9M7.5 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SWEEP_CLASSES =
  'pointer-events-none absolute inset-0 z-[3] -translate-x-[120%] skew-x-[-14deg] bg-gradient-to-r from-transparent via-gold-soft/25 to-transparent opacity-0 transition-[transform,opacity] duration-[1100ms] ease-out group-hover:translate-x-[120%] group-hover:opacity-100 group-active:translate-x-[120%] group-active:opacity-100 motion-reduce:transition-none motion-reduce:opacity-0';

const TEXT_SHADOW = '0 1px 3px rgba(30,20,14,0.45)';

/**
 * Card do catálogo de tratamentos dentro do agendamento -- mesma composição
 * de capa preenchendo 100% do card usada em `TreatmentCard` (imagem,
 * gradiente, conteúdo sobreposto), com duas ações reais lado a lado -- "Ver
 * mais detalhes" (ação secundária, abre o mesmo modal completo da seção
 * principal) e "Selecionar tratamento" (ação principal) -- sem aninhar
 * `<button>` dentro de `<button>`, que é HTML inválido; por isso o wrapper
 * externo é um `motion.article` (não clicável).
 */
export function SchedulingTreatmentCard({
  treatment,
  isSelected,
  onSelect,
  onViewDetails,
}: SchedulingTreatmentCardProps) {
  const categoryName = getTreatmentCategoryName(treatment.categoryId);

  return (
    <motion.article
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className={`group relative isolate aspect-[4/5] min-h-[430px] w-full overflow-hidden rounded-[1.75rem] border shadow-warm-sm transition-[box-shadow,border-color] duration-300 hover:shadow-warm active:shadow-warm ${
        isSelected ? 'border-gold shadow-warm' : 'border-gold/25 hover:border-gold/60 active:border-gold/60'
      }`}
    >
      <TreatmentCoverImage
        treatmentId={treatment.id}
        coverImage={treatment.coverImage}
        label={treatment.name}
        className="group-hover:scale-[1.035] group-active:scale-[1.015]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-90 transition-opacity duration-500 ease-out group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(to top, rgba(48,34,28,0.88) 0%, rgba(63,42,27,0.62) 28%, rgba(91,64,51,0.22) 52%, rgba(255,253,249,0.03) 74%, transparent 100%)',
        }}
      />

      {isSelected && (
        <span className="absolute right-3 top-3 z-[2] flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-brown-dark shadow-warm-sm">
          <CheckIcon />
          Selecionado
        </span>
      )}

      <div className="relative z-[2] flex h-full min-h-full flex-col justify-end gap-2 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
        {categoryName && (
          <span
            style={{ textShadow: TEXT_SHADOW }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-gold-soft"
          >
            {categoryName}
          </span>
        )}
        <h3 style={{ textShadow: TEXT_SHADOW }} className="line-clamp-2 text-lg text-cream">
          {treatment.name}
        </h3>
        {treatment.subtitle && (
          <p style={{ textShadow: TEXT_SHADOW }} className="-mt-1 text-sm font-medium text-cream-light/90">
            {treatment.subtitle}
          </p>
        )}
        <p style={{ textShadow: TEXT_SHADOW }} className="line-clamp-2 text-sm leading-relaxed text-cream-light/90">
          {treatment.summary ?? 'Descrição completa em atualização.'}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onViewDetails(treatment)}
            aria-label={`Ver mais detalhes do tratamento ${treatment.name}`}
            className="group/btn inline-flex items-center gap-1.5 rounded-full border border-gold/65 bg-cream-light/10 px-4 py-2 text-sm font-medium text-cream backdrop-blur-md transition-colors duration-300 hover:border-gold hover:bg-cream-light/20 active:bg-cream-light/25"
          >
            Ver mais detalhes
            <ArrowIcon />
          </button>

          <motion.button
            type="button"
            onClick={() => onSelect(treatment)}
            aria-pressed={isSelected}
            aria-label={
              isSelected
                ? `Remover ${treatment.name} da seleção`
                : `Selecionar ${treatment.name} para o agendamento`
            }
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className={`ml-auto inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide backdrop-blur-md transition-colors duration-300 ${
              isSelected
                ? 'bg-gold/85 text-brown-dark'
                : 'border border-gold/65 bg-cream-light/10 text-cream hover:border-gold hover:bg-cream-light/20 active:bg-cream-light/25'
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
          </motion.button>
        </div>
      </div>

      <div className={SWEEP_CLASSES} />
    </motion.article>
  );
}
