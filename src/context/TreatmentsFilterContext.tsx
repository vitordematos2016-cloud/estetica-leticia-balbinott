import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { siteContent } from '../data/siteContent';

interface TreatmentsFilterContextValue {
  activeCategoryId: string | null;
  /** Lista de ids ativa quando o filtro veio de um card de "Qual cuidado sua
   * pele precisa?" (`requestTreatmentsHighlight`) -- nunca combinada com
   * `activeCategoryId`, que fica null enquanto esta lista estiver ativa. */
  activeTreatmentIds: string[] | null;
  /** Seleciona uma categoria (ou `null` para "Todos os tratamentos") e
   * sempre limpa o filtro especial por ids -- é assim que os chips normais e
   * o botão "Ver todos os tratamentos" encerram o modo vindo do card. */
  selectCategory: (categoryId: string | null) => void;
  highlightTreatmentId: string | null;
  /** Filtra a grade pelos ids relacionados a um cuidado da pele e marca o
   * tratamento principal para ser localizado e destacado. Ids que não
   * existem mais no catálogo são descartados; se nenhum sobrar, não altera
   * nada e retorna null (o card cai no salto padrão para `#tratamentos`, sem
   * deixar a seção presa em um estado vazio). */
  requestTreatmentsHighlight: (treatmentIds: string[], primaryTreatmentId: string) => string | null;
  clearHighlight: () => void;
}

const TreatmentsFilterContext = createContext<TreatmentsFilterContextValue | undefined>(
  undefined,
);

export function TreatmentsFilterProvider({ children }: { children: ReactNode }) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeTreatmentIds, setActiveTreatmentIds] = useState<string[] | null>(null);
  const [highlightTreatmentId, setHighlightTreatmentId] = useState<string | null>(null);

  const selectCategory = useCallback((categoryId: string | null) => {
    setActiveCategoryId(categoryId);
    setActiveTreatmentIds(null);
  }, []);

  const requestTreatmentsHighlight = useCallback((treatmentIds: string[], primaryTreatmentId: string) => {
    const validIds = treatmentIds.filter((id) => siteContent.treatments.some((t) => t.id === id));
    if (validIds.length === 0) return null;
    const resolvedPrimary = validIds.includes(primaryTreatmentId) ? primaryTreatmentId : validIds[0];
    setActiveCategoryId(null);
    setActiveTreatmentIds(validIds);
    setHighlightTreatmentId(resolvedPrimary);
    return resolvedPrimary;
  }, []);

  const clearHighlight = useCallback(() => {
    setHighlightTreatmentId(null);
  }, []);

  const value = useMemo(
    () => ({
      activeCategoryId,
      activeTreatmentIds,
      selectCategory,
      highlightTreatmentId,
      requestTreatmentsHighlight,
      clearHighlight,
    }),
    [
      activeCategoryId,
      activeTreatmentIds,
      selectCategory,
      highlightTreatmentId,
      requestTreatmentsHighlight,
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
