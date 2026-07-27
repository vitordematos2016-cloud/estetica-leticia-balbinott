import type { Treatment } from '../../types/siteContent';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';
import { useSelection } from '../../context/SelectionContext';
import { getTreatmentCategoryName } from '../../utils/treatments';

interface TreatmentCardProps {
  treatment: Treatment;
  onViewDetails: (treatment: Treatment) => void;
  isHighlighted?: boolean;
}

export function TreatmentCard({ treatment, onViewDetails, isHighlighted = false }: TreatmentCardProps) {
  const { addItem, removeItem, isSelected } = useSelection();
  const alreadySelected = isSelected(treatment.id);
  const categoryName = getTreatmentCategoryName(treatment.categoryId);
  const specialOffer = treatment.specialOffer?.active ? treatment.specialOffer : undefined;

  return (
    <article
      id={`servico-${treatment.id}`}
      className={`flex scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] border bg-cream shadow-warm-sm transition-[box-shadow,border-color] duration-700 ease-out hover:shadow-warm ${
        isHighlighted ? 'border-gold shadow-warm' : 'border-gold/25'
      }`}
    >
      <PlaceholderMedia label={treatment.name} description="Imagem em preparação" ratio="landscape" className="rounded-none rounded-t-[1.75rem]" />

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
        <h3 className="text-xl text-brown-dark">{treatment.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-brown/70">
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
            className="text-sm font-medium text-brown-dark underline decoration-gold/50 underline-offset-4 hover:text-gold"
          >
            Ver mais detalhes
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                addItem({
                  id: treatment.id,
                  type: 'treatment',
                  name: treatment.name,
                  category: categoryName,
                })
              }
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                alreadySelected
                  ? 'bg-gold/20 text-brown-dark'
                  : 'border border-gold/50 text-brown-dark hover:bg-gold/10'
              }`}
            >
              {alreadySelected ? 'Adicionado ✓' : 'Adicionar à seleção'}
            </button>
            {alreadySelected && (
              <button
                type="button"
                onClick={() => removeItem(treatment.id)}
                className="text-xs font-medium text-brown/50 underline decoration-gold/40 underline-offset-2 hover:text-gold"
              >
                Remover
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
