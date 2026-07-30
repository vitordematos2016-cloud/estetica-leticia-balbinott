import { useState } from 'react';
import type { RefObject } from 'react';
import { motion } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { useSelection } from '../../context/SelectionContext';
import { getTreatmentCategoryName } from '../../utils/treatments';
import { EASE_OUT } from '../motion/variants';
import { TreatmentCatalogModal } from './TreatmentCatalogModal';

interface TreatmentPickerProps {
  triggerRef: RefObject<HTMLButtonElement | null>;
  error?: string;
}

function CatalogIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-brown/60">
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/**
 * Gatilho de "Escolher/Alterar tratamento" do agendamento -- abre o
 * catálogo visual (`TreatmentCatalogModal`) em vez do antigo dropdown de
 * lista simples. Seleção continua vivendo em `useSelection` (a mesma
 * "Minha Seleção"); este componente só lê `items`/`removeItem` para
 * desenhar o resumo elegante de tratamentos já escolhidos.
 */
export function TreatmentPicker({ triggerRef, error }: TreatmentPickerProps) {
  const { treatments } = siteContent;
  const { items, removeItem } = useSelection();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const labelId = 'scheduling-treatments-label';

  function openCatalog() {
    setIsCatalogOpen(true);
  }

  function closeCatalog() {
    setIsCatalogOpen(false);
    triggerRef.current?.focus();
  }

  // `SelectionItem` só guarda id/nome/categoria (ver SelectionContext.tsx) --
  // subtítulo e miniatura vêm do catálogo oficial para o resumo abaixo.
  const selectedTreatments = items
    .map((item) => treatments.find((treatment) => treatment.id === item.id))
    .filter((treatment): treatment is (typeof treatments)[number] => !!treatment);

  return (
    <div className="flex flex-col gap-3">
      <span id={labelId} className="block text-center text-sm font-medium text-brown-dark">
        Selecione o tratamento desejado *
      </span>

      <motion.button
        ref={triggerRef}
        type="button"
        onClick={openCatalog}
        aria-haspopup="dialog"
        aria-expanded={isCatalogOpen}
        aria-labelledby={labelId}
        aria-invalid={!!error}
        whileHover={{ y: -1.5 }}
        whileTap={{ scale: 0.975 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-gold/30 bg-cream px-4 py-3 text-left text-sm text-brown-dark shadow-[inset_0_1px_2px_rgba(91,64,51,0.05)] transition-all duration-200 hover:border-gold/60 focus:border-gold focus:ring-2 focus:ring-gold/15"
      >
        <span className={items.length === 0 ? 'text-brown/50' : ''}>
          {items.length === 0
            ? 'Escolher tratamento'
            : `Alterar tratamento (${items.length} selecionado${items.length > 1 ? 's' : ''})`}
        </span>
        <CatalogIcon />
      </motion.button>

      {error && (
        <p id="scheduling-treatments-error" className="text-xs text-red-700">
          {error}
        </p>
      )}

      {selectedTreatments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gold/30 bg-cream-light/30 px-4 py-4 text-center text-sm text-brown/70">
          <p>Nenhum tratamento selecionado.</p>
          <p className="mt-1">Toque acima para abrir o catálogo e escolher um ou mais tratamentos.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {selectedTreatments.map((treatment) => {
            const categoryName = getTreatmentCategoryName(treatment.categoryId);
            return (
              <li
                key={treatment.id}
                className="flex items-center gap-3 rounded-xl border border-gold/25 bg-cream p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-brown-dark">{treatment.name}</p>
                  {treatment.subtitle && (
                    <p className="truncate text-xs text-brown/60">{treatment.subtitle}</p>
                  )}
                  {categoryName && (
                    <p className="text-xs font-medium uppercase tracking-wide text-gold-deep">{categoryName}</p>
                  )}
                </div>
                <motion.button
                  type="button"
                  onClick={() => removeItem(treatment.id)}
                  aria-label={`Remover ${treatment.name} da seleção`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.15, ease: EASE_OUT }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brown/45 transition-colors hover:bg-gold/10 hover:text-brown-dark active:bg-gold/15"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </motion.button>
              </li>
            );
          })}
        </ul>
      )}

      <TreatmentCatalogModal isOpen={isCatalogOpen} onClose={closeCatalog} />
    </div>
  );
}
