import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface TreatmentsFilterContextValue {
  activeCategoryId: string | null;
  selectCategory: (categoryId: string | null) => void;
}

const TreatmentsFilterContext = createContext<TreatmentsFilterContextValue | undefined>(
  undefined,
);

export function TreatmentsFilterProvider({ children }: { children: ReactNode }) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const value = useMemo(
    () => ({ activeCategoryId, selectCategory: setActiveCategoryId }),
    [activeCategoryId],
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
