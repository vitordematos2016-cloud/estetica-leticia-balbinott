import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';

export function Manifesto() {
  const { manifesto } = siteContent;

  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col items-center gap-8 text-center">
        <span aria-hidden="true" className="h-px w-16 bg-gold" />
        <h2 className="max-w-3xl text-3xl leading-[1.25] text-brown-dark sm:text-4xl md:text-[2.6rem]">
          {manifesto.title}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-brown/75 sm:text-lg">
          {manifesto.text}
        </p>
      </Container>
    </section>
  );
}
