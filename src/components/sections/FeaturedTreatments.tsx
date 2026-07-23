import { useState } from 'react';
import type { Treatment } from '../../types/siteContent';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TreatmentCard } from '../treatments/TreatmentCard';
import { TreatmentModal } from '../treatments/TreatmentModal';

export function FeaturedTreatments() {
  const featured = siteContent.treatments.filter((treatment) => treatment.featured);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  return (
    <section className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Destaques"
          title="Tratamentos em destaque"
          text="Uma seleção especial, atualizada conforme os cuidados mais procurados na Leh Estetic."
        />

        {featured.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-gold/40 bg-cream px-8 py-14 text-center">
            <p className="text-base text-brown-dark">
              Os destaques serão publicados assim que o catálogo oficial estiver disponível.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((treatment) => (
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
