import { motion } from 'motion/react';
import type { Treatment } from '../../types/siteContent';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';
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

/**
 * O card em si não é um link/botão — só os controles internos são
 * interativos. `whileHover`/`whileTap` do Motion já ficam restritos a
 * ponteiro fino real e são neutralizados sob `prefers-reduced-motion` pelo
 * `MotionConfig reducedMotion="user"` global; `motion-reduce:duration-0`
 * cobre a transição de cor/sombra do destaque temporário (`isHighlighted`),
 * que não é controlada pelo Motion.
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
  // Cards nunca reproduzem vídeo -- quando a mídia é um vídeo, usamos o
  // poster (miniatura) como imagem estática; sem media, cai no placeholder.
  const cardImageSrc = treatment.media?.type === 'image' ? treatment.media.src : treatment.media?.poster;
  const cardImageAlt = treatment.media?.alt ?? treatment.name;

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
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.988 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        style={surfaceStyle}
        className={`group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] border bg-cream shadow-warm-sm transition-[box-shadow,border-color] duration-700 ease-out motion-reduce:duration-0 hover:shadow-warm active:shadow-warm ${
          isHighlighted ? 'border-gold shadow-warm' : 'border-gold/25'
        }`}
      >
        <div
          style={isMobileViewport ? { transform: `scale(${mobileActive ? 1.02 : 1})` } : undefined}
          className="shrink-0 transition-transform duration-500 ease-out motion-reduce:transition-none"
        >
          {cardImageSrc ? (
            <img
              src={cardImageSrc}
              alt={cardImageAlt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-t-[1.75rem] object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.02] group-active:scale-[1.015]"
            />
          ) : (
            <PlaceholderMedia
              label={treatment.name}
              description="Imagem em preparação"
              ratio="landscape"
              className="rounded-none rounded-t-[1.75rem] transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.02] group-active:scale-[1.015]"
            />
          )}
        </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          {categoryName && (
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
              {categoryName}
            </span>
          )}
          {specialOffer && (
            <span className="rounded-full border border-gold/50 bg-beige/40 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-brown-dark">
              Condição especial
            </span>
          )}
        </div>
        <h3 className="min-h-[3.375rem] line-clamp-2 text-xl text-brown-dark">{treatment.name}</h3>
        {treatment.subtitle && (
          <p className="-mt-1.5 min-h-[1.25rem] text-sm font-medium text-brown/70">{treatment.subtitle}</p>
        )}
        <p className="min-h-[4.5rem] flex-1 line-clamp-3 text-sm leading-relaxed text-brown/70">
          {treatment.summary ?? 'Descrição completa em atualização.'}
        </p>

        {specialOffer && (
          <div className="rounded-2xl border border-gold/30 bg-beige/25 p-4">
            {specialOffer.description && (
              <p className="text-sm leading-relaxed text-brown-dark">{specialOffer.description}</p>
            )}
            <p className="mt-1 text-xs font-medium text-gold-deep">
              {specialOffer.validUntil
                ? `Válida até ${specialOffer.validUntil}`
                : 'Condição disponível por tempo limitado'}
            </p>
            {specialOffer.promoPrice && (
              <p className="mt-1 text-sm text-brown-dark">
                {specialOffer.originalPrice && (
                  <span className="mr-2 text-brown/50 line-through">{specialOffer.originalPrice}</span>
                )}
                <span className="font-medium">{specialOffer.promoPrice}</span>
              </p>
            )}
          </div>
        )}

        <div className="mt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onViewDetails(treatment)}
            aria-label={`Ver mais detalhes do tratamento ${treatment.name}`}
            className="text-sm font-medium text-brown-dark underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold active:text-gold"
          >
            Ver mais detalhes
          </button>
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
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                alreadySelected
                  ? 'bg-gold/20 text-brown-dark'
                  : 'border border-gold/50 text-brown-dark hover:bg-gold/10 active:bg-gold/15'
              }`}
            >
              {alreadySelected ? 'Adicionado ✓' : 'Adicionar à seleção'}
            </motion.button>
            {alreadySelected && (
              <button
                type="button"
                onClick={() => removeItem(treatment.id)}
                className="text-xs font-medium text-brown/50 underline decoration-gold/40 underline-offset-2 transition-colors hover:text-gold active:text-gold"
              >
                Remover
              </button>
            )}
          </div>
        </div>
      </div>
      </motion.article>
    </motion.div>
  );
}
