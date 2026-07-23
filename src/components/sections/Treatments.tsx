import { useMemo, useState } from 'react';
import type { Treatment } from '../../types/siteContent';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TreatmentCard } from '../treatments/TreatmentCard';
import { TreatmentModal } from '../treatments/TreatmentModal';

export function Treatments() {
  const { treatments, treatmentsCatalogNotice } = siteContent;
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(treatments.map((t) => t.category)));
    return ['Todos', ...unique];
  }, [treatments]);

  const filteredTreatments = useMemo(() => {
    return treatments.filter((treatment) => {
      const matchesCategory = activeCategory === 'Todos' || treatment.category === activeCategory;
      const matchesSearch =
        search.trim().length === 0 ||
        treatment.name.toLowerCase().includes(search.toLowerCase()) ||
        treatment.summary.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [treatments, activeCategory, search]);

  return (
    <section id="tratamentos" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Tratamentos"
          title="Cuidados pensados para a individualidade da sua pele"
          text="Cada tratamento é indicado a partir de uma avaliação personalizada, com transparência sobre benefícios e cuidados."
        />

        {treatments.length > 0 && (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                    activeCategory === category
                      ? 'border-gold bg-gold/15 text-brown-dark'
                      : 'border-gold/30 text-brown/60 hover:border-gold'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="relative">
              <span className="sr-only">Buscar tratamento</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar tratamento..."
                className="w-full rounded-full border border-gold/30 bg-cream px-5 py-2.5 text-sm text-brown-dark placeholder:text-brown/40 focus:border-gold sm:w-64"
              />
            </label>
          </div>
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
      </Container>

      <TreatmentModal treatment={selectedTreatment} onClose={() => setSelectedTreatment(null)} />
    </section>
  );
}
