import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import type { Treatment } from '../../types/siteContent';
import { useSelection } from '../../context/SelectionContext';
import { useScrollLock } from '../../hooks/useScrollLock';
import { getTreatmentCategoryName } from '../../utils/treatments';
import { RevealGroup, RevealItem } from '../motion/reveal';
import { EASE_OUT, overlayBackdropVariants, overlayPanelVariants } from '../motion/variants';
import { SchedulingTreatmentCard } from './SchedulingTreatmentCard';

interface TreatmentCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Mesmo estilo de chip já usado na aba Tratamentos (ver Treatments.tsx),
 * reescrito aqui porque a função original não é exportada -- evita alterar
 * um arquivo não relacionado só para compartilhar seis linhas de classes. */
function chipClass(active: boolean) {
  return `shrink-0 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-all duration-300 ${
    active
      ? 'border-gold bg-brown-dark text-cream-light shadow-warm-sm'
      : 'border-gold/25 bg-cream text-brown/60 hover:border-gold/60 hover:text-brown-dark active:border-gold/60 active:text-brown-dark'
  }`;
}

const CHIP_TAP = { scale: 0.96 };
const CHIP_TRANSITION = { duration: 0.2, ease: EASE_OUT };
const TITLE_ID = 'catalogo-tratamentos-title';

/**
 * Catálogo visual de tratamentos aberto de dentro do agendamento -- mesma
 * linguagem visual da aba Tratamentos (categorias em chips, grade de
 * cards), com dados e categorias vindos direto de `siteContent` (sem
 * duplicar lista) e categoria ativa/busca guardadas localmente (nunca no
 * `TreatmentsFilterContext` global, para não afetar a aba Tratamentos).
 * Seleção usa `useSelection` -- o mesmo mecanismo da "Minha Seleção" já
 * usado pelo agendamento -- então escolher aqui ou na aba Tratamentos
 * afeta a mesma lista, sem duas fontes de verdade.
 *
 * Escudo de overlay próprio (backdrop + Escape + trap de foco + scroll
 * lock), nos mesmos moldes de `Modal.tsx`, construído à parte porque aqui o
 * cabeçalho e a barra de categorias precisam ficar fixos enquanto só a
 * grade rola, e a seleção precisa fechar o catálogo sozinha -- diferente o
 * bastante do `Modal` genérico (usado por `TreatmentModal`/
 * `LegalPolicyModal`) para não valer a pena forçar reuso.
 */
export function TreatmentCatalogModal({ isOpen, onClose }: TreatmentCatalogModalProps) {
  const { treatments, treatmentCategories } = siteContent;
  const { addItem, removeItem, isSelected } = useSelection();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const availableCategories = useMemo(
    () =>
      treatmentCategories.filter((category) =>
        treatments.some((treatment) => treatment.categoryId === category.id),
      ),
    [treatmentCategories, treatments],
  );

  const filteredTreatments = useMemo(() => {
    return treatments.filter((treatment) => {
      const matchesCategory = !activeCategoryId || treatment.categoryId === activeCategoryId;
      const matchesSearch =
        search.trim().length === 0 ||
        treatment.name.toLowerCase().includes(search.trim().toLowerCase()) ||
        (treatment.summary ?? '').toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [treatments, activeCategoryId, search]);

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Categoria/busca não sobrevivem ao fechamento -- reabrir sempre começa
  // do "Todos", sem resíduo de uma sessão anterior.
  useEffect(() => {
    if (!isOpen) {
      setActiveCategoryId(null);
      setSearch('');
    }
  }, [isOpen]);

  function handleSelect(treatment: Treatment) {
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
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayBackdropVariants}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={TITLE_ID}
            onClick={(event) => event.stopPropagation()}
            variants={overlayPanelVariants}
            className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-cream shadow-warm sm:h-auto sm:max-h-[85vh]"
          >
            <div className="relative flex shrink-0 items-start justify-center border-b border-gold/15 px-16 py-6 sm:px-20 sm:py-7">
              <div className="flex max-w-md flex-col items-center gap-1 text-center">
                <h2 id={TITLE_ID} className="text-2xl text-brown-dark">
                  Escolha seu tratamento
                </h2>
                <p className="text-sm text-brown/60">
                  {treatments.length} procedimento{treatments.length === 1 ? '' : 's'} disponíve
                  {treatments.length === 1 ? 'l' : 'is'} — toque em um card para selecionar.
                </p>
              </div>
              <motion.button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar catálogo de tratamentos"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.15, ease: EASE_OUT }}
                className="absolute right-6 top-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-brown-dark transition-colors hover:bg-gold/10 active:bg-gold/15 sm:right-7 sm:top-7"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3 border-b border-gold/10 p-4 sm:p-5">
              <div className="flex w-full gap-2.5 overflow-x-auto pb-1 lg:flex-wrap lg:justify-center">
                <motion.button
                  type="button"
                  onClick={() => setActiveCategoryId(null)}
                  aria-pressed={activeCategoryId === null}
                  whileTap={CHIP_TAP}
                  transition={CHIP_TRANSITION}
                  className={chipClass(activeCategoryId === null)}
                >
                  Todos
                </motion.button>
                {availableCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategoryId(category.id)}
                    aria-pressed={activeCategoryId === category.id}
                    title={category.description}
                    whileTap={CHIP_TAP}
                    transition={CHIP_TRANSITION}
                    className={chipClass(activeCategoryId === category.id)}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>

              <label className="relative w-full sm:w-72">
                <span className="sr-only">Buscar tratamento</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar tratamento..."
                  className="w-full rounded-full border border-gold/30 bg-cream-light/40 px-5 py-2.5 text-sm text-brown-dark placeholder:text-brown/40 focus:border-gold focus:bg-cream"
                />
              </label>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {filteredTreatments.length === 0 ? (
                <p className="py-10 text-center text-sm text-brown/60">
                  {search.trim().length > 0
                    ? 'Nenhum tratamento encontrado para essa busca.'
                    : 'Nenhum tratamento disponível nesta categoria no momento.'}
                </p>
              ) : (
                <RevealGroup active={isOpen} stagger={0.04} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredTreatments.map((treatment) => (
                    <RevealItem key={treatment.id}>
                      <SchedulingTreatmentCard
                        treatment={treatment}
                        isSelected={isSelected(treatment.id)}
                        onSelect={handleSelect}
                      />
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
