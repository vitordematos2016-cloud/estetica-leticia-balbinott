import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';

export function About() {
  const { about } = siteContent;

  return (
    <section id="sobre" className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <PlaceholderMedia
          label={siteContent.brand.professional}
          description="Foto oficial em preparação"
          className="max-w-md mx-auto lg:mx-0"
        />

        <div className="flex flex-col gap-6">
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">Sobre</span>
          <h2 className="text-3xl leading-[1.2] text-brown-dark sm:text-4xl">{about.title}</h2>
          <p className="text-base leading-relaxed text-brown/80 sm:text-lg">{about.text}</p>

          <ul className="mt-2 flex flex-wrap gap-3">
            {about.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-full border border-gold/40 bg-cream px-4 py-2 text-sm text-brown-dark"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
