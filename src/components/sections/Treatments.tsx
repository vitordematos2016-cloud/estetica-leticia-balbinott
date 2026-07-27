import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Treatment } from '../../types/siteContent';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { TreatmentCard } from '../treatments/TreatmentCard';
import { TreatmentModal } from '../treatments/TreatmentModal';
import { useTreatmentsFilter } from '../../context/TreatmentsFilterContext';
import { Reveal } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';

const SPECIAL_OFFERS_FILTER_ID = 'condicoes-especiais';

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className={className}>
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

/** Estilo compartilhado dos chips de categoria: selecionado usa o mesmo
 * tratamento sólido (fundo brown-dark) já aprovado no chip "Condições
 * especiais", para que o filtro ativo se destaque com uma única cor de
 * ênfase em vez de tons de dourado empilhados. */
function chipClass(active: boolean) {
  return `shrink-0 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-all duration-300 ${
    active
      ? 'border-gold bg-brown-dark text-cream-light shadow-warm-sm'
      : 'border-gold/25 bg-cream text-brown/60 hover:border-gold/60 hover:text-brown-dark'
  }`;
}

export function Treatments() {
  const { treatments, treatmentCategories } = siteContent;
  const hasActiveSpecialOffers = treatments.some((treatment) => treatment.specialOffer?.active);
  const availableCategories = treatmentCategories.filter((category) =>
    treatments.some((treatment) => treatment.categoryId === category.id),
  );
  const { activeCategoryId, selectCategory, highlightTreatmentId, clearHighlight } =
    useTreatmentsFilter();
  const [search, setSearch] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  useEffect(() => {
    if (activeCategoryId) setSearch('');
  }, [activeCategoryId]);

  // Cards que direcionam por treatmentId (ex.: Skin Class) zeram a categoria
  // mas não têm categoria para acionar o efeito acima -- limpamos a busca
  // aqui para que uma busca antiga incompatível não continue escondendo o
  // tratamento indicado. Não interfere no caminho por categoryId, que
  // sempre chega aqui com activeCategoryId preenchido.
  useEffect(() => {
    if (!activeCategoryId && highlightTreatmentId && search.trim().length > 0) {
      setSearch('');
    }
  }, [activeCategoryId, highlightTreatmentId, search]);

  // Rola até o tratamento pedido pelos cards de "Qual cuidado sua pele
  // precisa?" e o destaca por ~2s. Se o id não existir mais no DOM (ex.:
  // catálogo mudou), apenas limpa o estado sem quebrar nada. Quando o
  // destaque veio por treatmentId, a busca antiga pode ainda não ter sido
  // limpa nesta mesma renderização -- aguardamos o efeito acima antes de
  // desistir, em vez de cancelar o destaque prematuramente.
  useEffect(() => {
    if (!highlightTreatmentId) return;

    const node = document.getElementById(`servico-${highlightTreatmentId}`);
    if (!node) {
      if (!activeCategoryId && search.trim().length > 0) return;
      clearHighlight();
      return;
    }

    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const timeout = window.setTimeout(clearHighlight, 2000);
    return () => window.clearTimeout(timeout);
  }, [highlightTreatmentId, activeCategoryId, search, clearHighlight]);

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
    <section
      id="tratamentos"
      className="relative overflow-hidden bg-gradient-to-b from-cream-light/60 via-cream to-cream py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(177,138,85,0.14),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-beige/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
      />

      <Container className="relative flex flex-col gap-10 sm:gap-14">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <Reveal
            as="span"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-gold-deep shadow-warm-sm"
          >
            <SparkleIcon />
            Tratamentos
          </Reveal>
          <Reveal
            as="h2"
            delay={0.08}
            className="text-3xl leading-[1.12] text-brown-dark sm:text-4xl md:text-[3.1rem]"
          >
            Cuidados pensados para a individualidade da sua pele
          </Reveal>
          <Reveal
            aria-hidden
            delay={0.16}
            className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
          <Reveal as="p" delay={0.2} className="text-base leading-relaxed text-brown/75 sm:text-lg">
            Cada tratamento é indicado a partir de uma avaliação personalizada, com transparência sobre benefícios e cuidados.
          </Reveal>
        </div>

        <div className="flex flex-col gap-5 rounded-[2rem] border border-gold/15 bg-cream p-4 shadow-warm-sm sm:p-6">
          <div className="relative">
            <div className="flex gap-2.5 overflow-x-auto pb-1 lg:flex-wrap lg:justify-center lg:overflow-visible lg:pb-0">
              <button
                type="button"
                onClick={() => selectCategory(null)}
                aria-pressed={activeCategoryId === null}
                className={chipClass(activeCategoryId === null)}
              >
                Todos os tratamentos
              </button>
              {availableCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => selectCategory(category.id)}
                  aria-pressed={activeCategoryId === category.id}
                  title={category.description}
                  className={chipClass(activeCategoryId === category.id)}
                >
                  {category.name}
                </button>
              ))}
              {hasActiveSpecialOffers && (
                <button
                  type="button"
                  onClick={() => selectCategory(SPECIAL_OFFERS_FILTER_ID)}
                  aria-pressed={activeCategoryId === SPECIAL_OFFERS_FILTER_ID}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 font-heading text-xs tracking-wide transition-all duration-300 ${
                    activeCategoryId === SPECIAL_OFFERS_FILTER_ID
                      ? 'border-gold bg-brown-dark text-cream-light shadow-warm-sm'
                      : 'border-gold/60 bg-beige/40 text-brown-dark hover:border-gold'
                  }`}
                >
                  <SparkleIcon />
                  Condições especiais
                </button>
              )}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent lg:hidden"
            />
          </div>

          {treatments.length > 0 && (
            <label className="relative mx-auto w-full sm:w-72">
              <span className="sr-only">Buscar tratamento</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar tratamento..."
                className="w-full rounded-full border border-gold/30 bg-cream-light/40 px-5 py-2.5 text-sm text-brown-dark placeholder:text-brown/40 focus:border-gold focus:bg-cream"
              />
            </label>
          )}
        </div>

        {treatments.length > 0 && filteredTreatments.length === 0 && (
          <p className="text-center text-sm text-brown/60">
            {search.trim().length > 0
              ? 'Nenhum tratamento encontrado para essa busca.'
              : 'Nenhum tratamento disponível nesta categoria no momento.'}
          </p>
        )}

        {filteredTreatments.length > 0 && (
          <motion.div layout className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredTreatments.map((treatment) => (
                <motion.div
                  key={treatment.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <TreatmentCard
                    treatment={treatment}
                    onViewDetails={setSelectedTreatment}
                    isHighlighted={treatment.id === highlightTreatmentId}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
