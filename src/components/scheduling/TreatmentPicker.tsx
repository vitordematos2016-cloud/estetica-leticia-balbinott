import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { siteContent } from '../../data/siteContent';
import { useSelection } from '../../context/SelectionContext';
import { getTreatmentCategoryName } from '../../utils/treatments';

interface TreatmentPickerProps {
  triggerRef: RefObject<HTMLButtonElement | null>;
  error?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 text-brown/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-gold">
      <path d="M2.5 7.2l3 3 6-6.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TreatmentPicker({ triggerRef, error }: TreatmentPickerProps) {
  const { treatments } = siteContent;
  const { items, addItem, removeItem, isSelected } = useSelection();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const labelId = 'scheduling-treatments-label';

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, triggerRef]);

  useEffect(() => {
    if (!isOpen) setSearch('');
  }, [isOpen]);

  const filteredTreatments = treatments.filter((treatment) =>
    treatment.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  function toggleTreatment(treatment: (typeof treatments)[number]) {
    if (isSelected(treatment.id)) {
      removeItem(treatment.id);
    } else {
      addItem({
        id: treatment.id,
        type: 'treatment',
        name: treatment.name,
        category: getTreatmentCategoryName(treatment.categoryId),
      });
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span id={labelId} className="text-sm font-medium text-brown-dark">
        Selecione o tratamento desejado *
      </span>

      <div ref={containerRef} className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={labelId}
          aria-invalid={!!error}
          className="flex w-full items-center justify-between rounded-xl border border-gold/30 bg-cream px-4 py-3 text-left text-sm text-brown-dark focus:border-gold"
        >
          <span className={items.length === 0 ? 'text-brown/50' : ''}>
            {items.length === 0
              ? 'Escolher tratamento'
              : `${items.length} tratamento${items.length > 1 ? 's' : ''} selecionado${items.length > 1 ? 's' : ''}`}
          </span>
          <ChevronIcon open={isOpen} />
        </button>

        {isOpen && (
          <div className="absolute z-20 mt-2 w-full rounded-xl border border-gold/30 bg-cream shadow-warm">
            <div className="border-b border-gold/20 p-2">
              <label>
                <span className="sr-only">Buscar tratamento</span>
                <input
                  type="search"
                  autoFocus
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar tratamento..."
                  className="w-full rounded-lg border border-gold/20 bg-cream-light/40 px-3 py-2 text-sm text-brown-dark focus:border-gold"
                />
              </label>
            </div>
            <ul role="listbox" aria-multiselectable="true" aria-labelledby={labelId} className="max-h-56 overflow-y-auto p-1.5">
              {filteredTreatments.length === 0 ? (
                <li className="px-3 py-2.5 text-sm text-brown/50">Nenhum tratamento encontrado.</li>
              ) : (
                filteredTreatments.map((treatment) => {
                  const selected = isSelected(treatment.id);
                  const categoryName = getTreatmentCategoryName(treatment.categoryId);
                  return (
                    <li key={treatment.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => toggleTreatment(treatment)}
                        className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          selected ? 'bg-gold/15 text-brown-dark' : 'text-brown-dark hover:bg-gold/10'
                        }`}
                      >
                        <span className="flex flex-col">
                          <span>{treatment.name}</span>
                          {categoryName && (
                            <span className="text-xs text-brown/50">{categoryName}</span>
                          )}
                        </span>
                        {selected && <CheckIcon />}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <p id="scheduling-treatments-error" className="text-xs text-red-700">
          {error}
        </p>
      )}

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gold/30 bg-cream-light/30 px-4 py-4 text-sm text-brown/70">
          <p>Nenhum tratamento selecionado.</p>
          <p className="mt-1">Escolha acima um ou mais tratamentos para solicitar seu agendamento.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-brown/50">
            Tratamentos selecionados
          </span>
          <ul className="flex flex-wrap gap-2">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-cream px-3.5 py-1.5 text-xs font-medium text-brown-dark transition-colors hover:border-gold"
                >
                  {item.name}
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Remover {item.name} da seleção</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
