import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function AuthorizedResults() {
  const { authorizedResults } = siteContent;

  return (
    <section className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col items-center gap-10 text-center">
        <SectionHeading title={authorizedResults.title} text={authorizedResults.text} />

        <div className="w-full max-w-2xl rounded-[2rem] border border-dashed border-gold/40 bg-cream px-8 py-14">
          <p className="text-base text-brown-dark">{authorizedResults.placeholder}</p>
          <p className="mt-2 text-sm text-brown/60">
            Todos os resultados publicados aqui contarão com autorização expressa da cliente.
          </p>
        </div>
      </Container>
    </section>
  );
}
