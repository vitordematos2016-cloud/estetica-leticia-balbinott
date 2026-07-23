import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useSelection } from '../../context/SelectionContext';

export function MySelectionSection() {
  const { items, openPanel } = useSelection();

  return (
    <section id="minha-selecao" className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col items-center gap-8 text-center">
        <SectionHeading
          eyebrow="Minha Seleção"
          title="Monte sua seleção antes de agendar"
          text="Adicione tratamentos e ofertas de seu interesse enquanto navega pelo site. Você pode revisar, remover ou limpar sua seleção a qualquer momento antes de agendar."
        />

        <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-gold/30 bg-cream px-10 py-8">
          <p className="text-sm text-brown/70">
            {items.length === 0
              ? 'Sua seleção está vazia por enquanto.'
              : `Você tem ${items.length} ${items.length === 1 ? 'item' : 'itens'} na sua seleção.`}
          </p>
          <button
            type="button"
            onClick={openPanel}
            className="rounded-full bg-brown-dark px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-brown"
          >
            {items.length === 0 ? 'Ver Minha Seleção' : 'Revisar seleção'}
          </button>
        </div>
      </Container>
    </section>
  );
}
