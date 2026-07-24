import { useEffect, useMemo, useState } from 'react';
import type { Treatment } from '../../types/siteContent';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TreatmentCard } from '../treatments/TreatmentCard';
import { TreatmentModal } from '../treatments/TreatmentModal';
import { PendingTreatmentsList } from '../treatments/PendingTreatmentsList';
import { useTreatmentsFilter } from '../../context/TreatmentsFilterContext';

export function Treatments() {
  const { treatments, treatmentsCatalogNotice, treatmentCategories, pendingTreatments } = siteContent;
  const { activeCategoryId, selectCategory } = useTreatmentsFilter();
  const [search, setSearch] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  useEffect(() => {
    if (activeCategoryId) setSearch('');
  }, [activeCategoryId]);

  const filteredTreatments = useMemo(() => {
    return treatments.filter((treatment) => {
      const matchesCategory = !activeCategoryId || treatment.categoryId === activeCategoryId;
      const matchesSearch =
        search.trim().length === 0 ||
        treatment.name.toLowerCase().includes(search.toLowerCase()) ||
        treatment.summary.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [treatments, activeCategoryId, search]);

  return (
    <section id="tratamentos" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Tratamentos"
          title="Cuidados pensados para a individualidade da sua pele"
          text="Cada tratamento é indicado a partir de uma avaliação personalizada, com transparência sobre benefícios e cuidados."
        />

        <div className="flex flex-wrap justify-center gap-2.5">
          <button
            type="button"
            onClick={() => selectCategory(null)}
            aria-pressed={activeCategoryId === null}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
              activeCategoryId === null
                ? 'border-gold bg-gold/15 text-brown-dark'
                : 'border-gold/30 text-brown/60 hover:border-gold'
            }`}
          >
            Todos
          </button>
          {treatmentCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => selectCategory(category.id)}
              aria-pressed={activeCategoryId === category.id}
              title={category.description}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                activeCategoryId === category.id
                  ? 'border-gold bg-gold/15 text-brown-dark'
                  : 'border-gold/30 text-brown/60 hover:border-gold'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {treatments.length > 0 && (
          <label className="relative mx-auto w-full sm:w-72">
            <span className="sr-only">Buscar tratamento</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar tratamento..."
              className="w-full rounded-full border border-gold/30 bg-cream px-5 py-2.5 text-sm text-brown-dark placeholder:text-brown/40 focus:border-gold"
            />
          </label>
        )}

        {treatments.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-gold/40 bg-cream-light/40 px-8 py-16 text-center">
            <p className="text-lg text-brown-dark">{treatmentsCatalogNotice}</p>
            <p className="mt-2 text-sm text-brown/60">
              Em breve, os tratamentos completos estarão disponíveis aqui, com descrição,
              benefícios, indicações e valores.
            </p>
          </div>
        ) : filteredTreatments.length === 0 ? (
          <p className="text-center text-sm text-brown/60">
            Nenhum tratamento encontrado para essa busca.
          </p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTreatments.map((treatment) => (
              <TreatmentCard
                key={treatment.id}
                treatment={treatment}
                onViewDetails={setSelectedTreatment}
              />
            ))}
          </div>
        )}

        <PendingTreatmentsList items={pendingTreatments} />
      </Container>

      <TreatmentModal treatment={selectedTreatment} onClose={() => setSelectedTreatment(null)} />
    </section>
  );
}
