import { useEffect, useRef } from 'react';
import { useSelection } from '../../context/SelectionContext';
import { useScrollLock } from '../../hooks/useScrollLock';

export function SelectionWidget() {
  const { items, removeItem, clearItems, isPanelOpen, openPanel, closePanel, lastAddedName } =
    useSelection();
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollLock(isPanelOpen);

  useEffect(() => {
    if (!isPanelOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closePanel();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen, closePanel]);

  function handleReviewAndSchedule() {
    closePanel();
    window.setTimeout(() => {
      document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        aria-label={`Minha seleção, ${items.length} ${items.length === 1 ? 'item' : 'itens'}`}
        className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brown-dark text-cream shadow-warm transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path
            d="M2 3h2l1.6 10.6a2 2 0 0 0 2 1.7h8.4a2 2 0 0 0 2-1.7L20 6H5.2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="19" r="1.4" fill="currentColor" />
          <circle cx="16" cy="19" r="1.4" fill="currentColor" />
        </svg>
        {items.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-semibold text-brown-dark">
            {items.length}
          </span>
        )}
      </button>

      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-24 right-5 z-40 sm:bottom-28 sm:right-8"
      >
        {lastAddedName && (
          <div className="rounded-xl bg-brown-dark px-4 py-3 text-sm text-cream shadow-warm fade-up">
            "{lastAddedName}" adicionado à Minha Seleção
          </div>
        )}
      </div>

      {isPanelOpen && (
        <div className="fixed inset-0 z-[90] flex justify-end">
          <button
            aria-label="Fechar minha seleção"
            className="absolute inset-0 bg-brown-dark/50 backdrop-blur-sm"
            onClick={closePanel}
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="selection-panel-title"
            className="relative z-10 flex h-full w-full max-w-sm flex-col bg-cream p-6 shadow-warm sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 id="selection-panel-title" className="text-2xl text-brown-dark">
                Minha Seleção
              </h3>
              <button
                onClick={closePanel}
                aria-label="Fechar"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-brown-dark hover:bg-gold/10"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-sm text-brown/70">
                Você ainda não adicionou tratamentos ou ofertas à sua seleção.
              </p>
            ) : (
              <ul className="flex flex-1 flex-col gap-3 overflow-y-auto">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-gold/20 bg-cream-light/40 px-4 py-3"
                  >
                    <span className="text-sm text-brown-dark">{item.name}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remover ${item.name} da seleção`}
                      className="text-xs font-medium uppercase tracking-wide text-brown/60 hover:text-gold"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-col gap-3">
              {items.length > 0 && (
                <button
                  onClick={clearItems}
                  className="text-xs font-medium uppercase tracking-wide text-brown/60 hover:text-gold"
                >
                  Limpar seleção
                </button>
              )}
              <button
                onClick={handleReviewAndSchedule}
                disabled={items.length === 0}
                className="rounded-full bg-brown-dark px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-brown disabled:cursor-not-allowed disabled:opacity-40"
              >
                Revisar e agendar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
