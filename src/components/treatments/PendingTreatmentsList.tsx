import type { PendingTreatment } from '../../types/siteContent';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';

interface PendingTreatmentsListProps {
  items: PendingTreatment[];
}

export function PendingTreatmentsList({ items }: PendingTreatmentsListProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Em identificação</span>
        <h3 className="text-xl text-brown-dark sm:text-2xl">
          Tratamentos identificados, aguardando confirmação
        </h3>
        <p className="text-sm leading-relaxed text-brown/60">
          Vistos no Instagram da Leh Estetic, mas ainda sem detalhes suficientes para entrar no
          catálogo oficial. Nada abaixo foi inventado — apenas o nome já é público.
        </p>
      </div>

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
    </div>
  );
}
