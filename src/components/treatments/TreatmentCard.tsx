import type { Treatment } from '../../types/siteContent';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';
import { useSelection } from '../../context/SelectionContext';

interface TreatmentCardProps {
  treatment: Treatment;
  onViewDetails: (treatment: Treatment) => void;
}

export function TreatmentCard({ treatment, onViewDetails }: TreatmentCardProps) {
  const { addItem, isSelected } = useSelection();
  const alreadySelected = isSelected(treatment.id);

  return (
    <article className="flex flex-col overflow-hidden rounded-[1.75rem] border border-gold/25 bg-cream shadow-warm-sm transition-shadow hover:shadow-warm">
      <PlaceholderMedia label={treatment.name} description="Imagem em preparação" ratio="landscape" className="rounded-none rounded-t-[1.75rem]" />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          {treatment.category}
        </span>
        <h3 className="text-xl text-brown-dark">{treatment.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-brown/70">{treatment.summary}</p>

        <div className="mt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onViewDetails(treatment)}
            className="text-sm font-medium text-brown-dark underline decoration-gold/50 underline-offset-4 hover:text-gold"
          >
            Ver detalhes
          </button>
          <button
            type="button"
            disabled={alreadySelected}
            onClick={() =>
              addItem({ id: treatment.id, type: 'treatment', name: treatment.name })
            }
            className="ml-auto rounded-full border border-gold/50 px-4 py-2 text-xs font-medium uppercase tracking-wide text-brown-dark transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {alreadySelected ? 'Selecionado' : 'Adicionar à Minha Seleção'}
          </button>
        </div>
      </div>
    </article>
  );
}
