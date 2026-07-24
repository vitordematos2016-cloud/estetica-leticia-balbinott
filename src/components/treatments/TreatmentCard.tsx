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

  return (
    <article
      id={`servico-${treatment.id}`}
      className={`flex scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] border bg-cream shadow-warm-sm transition-[box-shadow,border-color] duration-700 ease-out hover:shadow-warm ${
        isHighlighted ? 'border-gold shadow-warm' : 'border-gold/25'
      }`}
    >
      <PlaceholderMedia label={treatment.name} description="Imagem em preparação" ratio="landscape" className="rounded-none rounded-t-[1.75rem]" />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          {getTreatmentCategoryName(treatment.categoryId)}
        </span>
        <h3 className="text-xl text-brown-dark">{treatment.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-brown/70">{treatment.summary}</p>

        <div className="mt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onViewDetails(treatment)}
            aria-label={`Ver detalhes do tratamento ${treatment.name}`}
            className="text-sm font-medium text-brown-dark underline decoration-gold/50 underline-offset-4 hover:text-gold"
          >
            Ver detalhes
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                addItem({
                  id: treatment.id,
                  type: 'treatment',
                  name: treatment.name,
                  category: getTreatmentCategoryName(treatment.categoryId),
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
