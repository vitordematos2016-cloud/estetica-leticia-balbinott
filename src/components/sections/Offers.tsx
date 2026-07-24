import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useSelection } from '../../context/SelectionContext';

export function Offers() {
  const { offers, offersNotice } = siteContent;
  const { addItem, removeItem, isSelected } = useSelection();

  return (
    <section className="py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Ofertas" title="Condições especiais" />

        {offers.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-gold/40 bg-cream-light/40 px-8 py-14 text-center">
            <p className="text-base text-brown-dark">{offersNotice}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => {
              const alreadySelected = isSelected(offer.id);
              return (
                <div
                  key={offer.id}
                  className="flex flex-col gap-4 rounded-[1.75rem] border border-gold/25 bg-cream p-7 shadow-warm-sm"
                >
                  <h3 className="text-xl text-brown-dark">{offer.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-brown/70">
                    {offer.description}
                  </p>
                  {offer.validUntil && (
                    <p className="text-xs uppercase tracking-wide text-gold">
                      Válido até {offer.validUntil}
                    </p>
                  )}
                  <div className="mt-1 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addItem({ id: offer.id, type: 'offer', name: offer.title })}
                      className={`w-fit rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                        alreadySelected
                          ? 'bg-gold/20 text-brown-dark'
                          : 'border border-gold/50 text-brown-dark hover:bg-gold/10'
                      }`}
                    >
                      {alreadySelected ? 'Adicionado ✓' : 'Adicionar à seleção'}
                    </button>
                    {alreadySelected && (
                      <button
                        type="button"
                        onClick={() => removeItem(offer.id)}
                        className="text-xs font-medium text-brown/50 underline decoration-gold/40 underline-offset-2 hover:text-gold"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
