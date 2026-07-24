import { useEffect, useMemo, useState } from 'react';
import type { Treatment } from '../../types/siteContent';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TreatmentCard } from '../treatments/TreatmentCard';
import { TreatmentModal } from '../treatments/TreatmentModal';
import { useTreatmentsFilter } from '../../context/TreatmentsFilterContext';

const SPECIAL_OFFERS_FILTER_ID = 'condicoes-especiais';

function SparkleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M6.5 0.5c.3 2.1 1.1 2.9 3.2 3.2-2.1.3-2.9 1.1-3.2 3.2-.3-2.1-1.1-2.9-3.2-3.2 2.1-.3 2.9-1.1 3.2-3.2Z"
        fill="currentColor"
      />
      <path
        d="M10.8 7.3c.16 1.05.55 1.44 1.6 1.6-1.05.16-1.44.55-1.6 1.6-.16-1.05-.55-1.44-1.6-1.6 1.05-.16 1.44-.55 1.6-1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Treatments() {
  const { treatments, treatmentCategories } = siteContent;
  const hasActiveSpecialOffers = treatments.some((treatment) => treatment.specialOffer?.active);
  const { activeCategoryId, selectCategory, highlightTreatmentId, clearHighlight } =
    useTreatmentsFilter();
  const [search, setSearch] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  useEffect(() => {
    if (activeCategoryId) setSearch('');
  }, [activeCategoryId]);

  // Rola até o tratamento pedido pelos cards de "Qual cuidado sua pele
  // precisa?" e o destaca por ~2s. Se o id não existir mais no DOM (ex.:
  // catálogo mudou), apenas limpa o estado sem quebrar nada.
  useEffect(() => {
    if (!highlightTreatmentId) return;

    const node = document.getElementById(`servico-${highlightTreatmentId}`);
    if (!node) {
      clearHighlight();
      return;
    }

    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const timeout = window.setTimeout(clearHighlight, 2000);
    return () => window.clearTimeout(timeout);
  }, [highlightTreatmentId, clearHighlight]);

  const filteredTreatments = useMemo(() => {
    return treatments.filter((treatment) => {
      const matchesCategory =
        !activeCategoryId ||
        (activeCategoryId === SPECIAL_OFFERS_FILTER_ID
          ? treatment.specialOffer?.active === true
          : treatment.categoryId === activeCategoryId);
      const matchesSearch =
        search.trim().length === 0 ||
        treatment.name.toLowerCase().includes(search.toLowerCase()) ||
        (treatment.summary ?? '').toLowerCase().includes(search.toLowerCase());
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

        <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0 lg:pb-0">
          <button
            type="button"
            onClick={() => selectCategory(null)}
            aria-pressed={activeCategoryId === null}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
              activeCategoryId === null
                ? 'border-gold bg-gold/15 text-brown-dark'
                : 'border-gold/30 text-brown/60 hover:border-gold'
            }`}
          >
            Todos os tratamentos
          </button>
          {treatmentCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => selectCategory(category.id)}
              aria-pressed={activeCategoryId === category.id}
              title={category.description}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                activeCategoryId === category.id
                  ? 'border-gold bg-gold/15 text-brown-dark'
                  : 'border-gold/30 text-brown/60 hover:border-gold'
              }`}
            >
              {category.name}
            </button>
          ))}
          {hasActiveSpecialOffers && (
            <button
              type="button"
              onClick={() => selectCategory(SPECIAL_OFFERS_FILTER_ID)}
              aria-pressed={activeCategoryId === SPECIAL_OFFERS_FILTER_ID}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 font-heading text-xs tracking-wide transition-colors ${
                activeCategoryId === SPECIAL_OFFERS_FILTER_ID
                  ? 'border-gold bg-brown-dark text-cream-light'
                  : 'border-gold/60 bg-beige/40 text-brown-dark hover:border-gold'
              }`}
            >
              <SparkleIcon />
              Condições especiais
            </button>
          )}
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

        {treatments.length > 0 && filteredTreatments.length === 0 && (
          <p className="text-center text-sm text-brown/60">
            {search.trim().length > 0
              ? 'Nenhum tratamento encontrado para essa busca.'
              : 'Nenhum tratamento disponível nesta categoria no momento.'}
          </p>
        )}

        {filteredTreatments.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTreatments.map((treatment) => (
              <div key={`${activeCategoryId ?? 'all'}-${treatment.id}`} className="fade-up">
                <TreatmentCard
                  treatment={treatment}
                  onViewDetails={setSelectedTreatment}
                  isHighlighted={treatment.id === highlightTreatmentId}
                />
              </div>
            ))}
          </div>
        )}

        {activeCategoryId !== null && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => selectCategory(null)}
              className="rounded-full border border-gold/40 bg-cream-light/60 px-6 py-3 text-sm font-medium text-brown-dark shadow-warm-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:shadow-warm"
            >
              Ver todos os tratamentos
            </button>
          </div>
        )}
      </Container>

      <TreatmentModal treatment={selectedTreatment} onClose={() => setSelectedTreatment(null)} />
    </section>
  );
}
