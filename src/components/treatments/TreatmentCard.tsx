import { motion } from 'motion/react';
import type { Treatment } from '../../types/siteContent';
import { TreatmentCoverImage } from './TreatmentCoverImage';
import { useSelection } from '../../context/SelectionContext';
import { getTreatmentCategoryName } from '../../utils/treatments';
import { EASE_OUT } from '../motion/variants';
import { useMobileViewportActive } from '../../hooks/useMobileViewportActive';
import { getMobileSurfaceStyle, mobileCardTransition, mobileCardVariants } from '../motion/mobileActive';

interface TreatmentCardProps {
  treatment: Treatment;
  onViewDetails: (treatment: Treatment) => void;
  isHighlighted?: boolean;
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
 * Card com composição única: capa preenchendo 100% da área (posicionamento
 * absoluto), gradiente de legibilidade e conteúdo sobreposto na parte
 * inferior -- sem faixa separada de imagem/texto. Só os controles internos
 * são interativos, o card em si não é um link/botão.
 *
 * `whileHover`/`whileTap` do Motion já ficam restritos a ponteiro fino real e
 * são neutralizados sob `prefers-reduced-motion` pelo `MotionConfig
 * reducedMotion="user"` global; `motion-reduce:duration-0` cobre a transição
 * de cor/sombra do destaque temporário (`isHighlighted`), que não é
 * controlada pelo Motion.
 *
 * O wrapper externo (`mobileActiveRef`) só entra em ação abaixo de 768px:
 * ele recua o card (`rest`) quando fora da região central da tela e devolve
 * a presença total (`active`, equivalente ao hover) quando o card cruza essa
 * região -- ver `useMobileViewportActive`. No desktop `animate` fica
 * `undefined`, então nenhum estilo inline é aplicado e o hover/tilt do
 * `motion.article` interno continua isolado, exatamente como antes.
 */
export function TreatmentCard({ treatment, onViewDetails, isHighlighted = false }: TreatmentCardProps) {
  const { addItem, removeItem, isSelected } = useSelection();
  const alreadySelected = isSelected(treatment.id);
  const categoryName = getTreatmentCategoryName(treatment.categoryId);
  const specialOffer = treatment.specialOffer?.active ? treatment.specialOffer : undefined;
  const { ref: mobileActiveRef, active: mobileActive, isMobileViewport } = useMobileViewportActive<HTMLDivElement>();
  // O destaque temporário de busca (isHighlighted) tem prioridade sobre a
  // presença mobile por rolagem -- nunca os dois competindo pelo mesmo estilo.
  const surfaceStyle = isHighlighted ? undefined : getMobileSurfaceStyle(isMobileViewport, mobileActive);
  return (
    <motion.div
      ref={mobileActiveRef}
      variants={mobileCardVariants}
      initial={false}
      animate={isMobileViewport ? (mobileActive ? 'active' : 'rest') : undefined}
      transition={mobileCardTransition}
      className="h-full"
    >
      <motion.article
        id={`servico-${treatment.id}`}
        whileHover={{ y: -3, scale: 1.01 }}
        whileTap={{ scale: 0.988 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        style={surfaceStyle}
        className={`group relative isolate aspect-[4/5] min-h-[430px] w-full overflow-hidden rounded-[1.75rem] border shadow-warm-sm transition-[box-shadow,border-color] duration-700 ease-out motion-reduce:duration-0 hover:shadow-warm active:shadow-warm ${
          isHighlighted ? 'border-gold shadow-warm' : 'border-gold/25 hover:border-gold/60 active:border-gold/60'
        }`}
      >
        <TreatmentCoverImage
          treatmentId={treatment.id}
          coverImage={treatment.coverImage}
          label={treatment.name}
          className="group-hover:scale-[1.035] group-active:scale-[1.015]"
        />

        {/* Gradiente de legibilidade -- forte só atrás do texto, some suave
            no topo; nunca escurece a capa inteira. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-90 transition-opacity duration-500 ease-out group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(to top, rgba(48,34,28,0.88) 0%, rgba(63,42,27,0.62) 28%, rgba(91,64,51,0.22) 52%, rgba(255,253,249,0.03) 74%, transparent 100%)',
          }}
        />

        <div className="relative z-[2] flex h-full min-h-full flex-col justify-end gap-2.5 p-6 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none">
          <div className="flex flex-wrap items-center gap-2">
            {categoryName && (
              <span
                style={{ textShadow: TEXT_SHADOW }}
                className="text-xs font-medium uppercase tracking-[0.2em] text-gold-soft"
              >
                {categoryName}
              </span>
            )}
            {specialOffer && (
              <span className="rounded-full border border-gold/60 bg-brown-dark/45 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-cream backdrop-blur-sm">
                Condição especial
              </span>
            )}
          </div>

          <h3
            style={{ textShadow: TEXT_SHADOW }}
            className="line-clamp-2 text-xl font-medium leading-snug text-cream"
          >
            {treatment.name}
          </h3>

          {treatment.subtitle && (
            <p style={{ textShadow: TEXT_SHADOW }} className="-mt-1.5 text-sm font-medium text-cream-light/90">
              {treatment.subtitle}
            </p>
          )}

          <p
            style={{ textShadow: TEXT_SHADOW }}
            className="line-clamp-2 text-sm leading-relaxed text-cream-light/90"
          >
            {treatment.summary ?? 'Descrição completa em atualização.'}
          </p>

          {specialOffer && (
            <div className="rounded-2xl border border-gold/40 bg-brown-dark/45 p-4 backdrop-blur-sm">
              {specialOffer.description && (
                <p style={{ textShadow: TEXT_SHADOW }} className="text-sm leading-relaxed text-cream">
                  {specialOffer.description}
                </p>
              )}
              <p className="mt-1 text-xs font-medium text-gold-soft">
                {specialOffer.validUntil
                  ? `Válida até ${specialOffer.validUntil}`
                  : 'Condição disponível por tempo limitado'}
              </p>
              {specialOffer.promoPrice && (
                <p style={{ textShadow: TEXT_SHADOW }} className="mt-1 text-sm text-cream">
                  {specialOffer.originalPrice && (
                    <span className="mr-2 text-cream-light/60 line-through">{specialOffer.originalPrice}</span>
                  )}
                  <span className="font-medium">{specialOffer.promoPrice}</span>
                </p>
              )}
            </div>
          )}

          <div className="mt-1 flex flex-wrap items-center gap-3">
            <motion.button
              type="button"
              onClick={() => onViewDetails(treatment)}
              aria-label={`Ver mais detalhes do tratamento ${treatment.name}`}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="group/btn inline-flex items-center gap-1.5 rounded-full border border-gold/65 bg-cream-light/10 px-4 py-2 text-sm font-medium text-cream backdrop-blur-md transition-colors duration-300 hover:border-gold hover:bg-cream-light/20 active:bg-cream-light/25"
            >
              Ver mais detalhes
              <ArrowIcon />
            </motion.button>
            <div className="ml-auto flex items-center gap-2">
              <motion.button
                type="button"
                onClick={() =>
                  addItem({
                    id: treatment.id,
                    type: 'treatment',
                    name: treatment.name,
                    category: categoryName,
                  })
                }
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide backdrop-blur-md transition-colors duration-300 ${
                  alreadySelected
                    ? 'bg-gold/85 text-brown-dark'
                    : 'border border-gold/65 bg-cream-light/10 text-cream hover:border-gold hover:bg-cream-light/20 active:bg-cream-light/25'
                }`}
              >
                {alreadySelected ? 'Adicionado ✓' : 'Adicionar à seleção'}
              </motion.button>
              {alreadySelected && (
                <button
                  type="button"
                  onClick={() => removeItem(treatment.id)}
                  style={{ textShadow: TEXT_SHADOW }}
                  className="text-xs font-medium text-cream-light/80 underline decoration-gold/60 underline-offset-2 transition-colors hover:text-gold active:text-gold"
                >
                  Remover
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={SWEEP_CLASSES} />
      </motion.article>
    </motion.div>
  );
}
