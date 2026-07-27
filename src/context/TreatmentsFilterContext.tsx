import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { siteContent } from '../data/siteContent';

interface TreatmentsFilterContextValue {
  activeCategoryId: string | null;
  selectCategory: (categoryId: string | null) => void;
  highlightTreatmentId: string | null;
  /** Filtra pela categoria e, se houver um tratamento cadastrado nela, marca-o
   * para ser localizado e destacado. Retorna o id encontrado (ou null caso
   * nenhum tratamento dessa categoria exista ainda no catálogo). */
  requestCategoryHighlight: (categoryId: string) => string | null;
  /** Mesma finalidade de `requestCategoryHighlight`, mas para tratamentos sem
   * categoria confirmada (ex.: Skin Class) — destaca pelo id do tratamento
   * diretamente, só limpando o filtro de categoria ativo (nunca a busca).
   * Retorna o id quando o tratamento existe no catálogo, senão null. */
  requestTreatmentHighlight: (treatmentId: string) => string | null;
  clearHighlight: () => void;
}

const TreatmentsFilterContext = createContext<TreatmentsFilterContextValue | undefined>(
  undefined,
);

export function TreatmentsFilterProvider({ children }: { children: ReactNode }) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [highlightTreatmentId, setHighlightTreatmentId] = useState<string | null>(null);

  const selectCategory = useCallback((categoryId: string | null) => {
    setActiveCategoryId(categoryId);
  }, []);

  const requestCategoryHighlight = useCallback((categoryId: string) => {
    const match = siteContent.treatments.find((treatment) => treatment.categoryId === categoryId);
    setActiveCategoryId(categoryId);
    setHighlightTreatmentId(match ? match.id : null);
    return match ? match.id : null;
  }, []);

  const requestTreatmentHighlight = useCallback((treatmentId: string) => {
    const match = siteContent.treatments.find((treatment) => treatment.id === treatmentId);
    if (!match) return null;
    setActiveCategoryId(null);
    setHighlightTreatmentId(match.id);
    return match.id;
  }, []);

  const clearHighlight = useCallback(() => {
    setHighlightTreatmentId(null);
  }, []);

  const value = useMemo(
    () => ({
      activeCategoryId,
      selectCategory,
      highlightTreatmentId,
      requestCategoryHighlight,
      requestTreatmentHighlight,
      clearHighlight,
    }),
    [
      activeCategoryId,
      selectCategory,
      highlightTreatmentId,
      requestCategoryHighlight,
      requestTreatmentHighlight,
      clearHighlight,
    ],
  );

  return (
    <TreatmentsFilterContext.Provider value={value}>{children}</TreatmentsFilterContext.Provider>
  );
}

export function useTreatmentsFilter(): TreatmentsFilterContextValue {
  const context = useContext(TreatmentsFilterContext);
  if (!context) {
    throw new Error('useTreatmentsFilter deve ser usado dentro de um TreatmentsFilterProvider');
  }
  return context;
}
