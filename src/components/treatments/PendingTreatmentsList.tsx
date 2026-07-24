import type { PendingTreatment } from '../../types/siteContent';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';

interface PendingTreatmentsListProps {
  items: PendingTreatment[];
}

export function PendingTreatmentsList({ items }: PendingTreatmentsListProps) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-dashed border-gold/40 bg-cream-light/30 p-6"
        >
          <PlaceholderMedia label={item.name} description="Imagem em preparação" ratio="landscape" />

          <div>
            <h4 className="text-lg text-brown-dark">{item.name}</h4>
            <p className="mt-1 text-xs text-brown/50">{item.source}</p>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.18em] text-brown/50">
              Ainda precisa confirmar
            </p>
            <ul className="flex flex-col gap-1">
              {item.pendingInfo.map((info) => (
                <li key={info} className="text-sm leading-relaxed text-brown/70">
                  • {info}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
