import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const icons = [
  <path key="ethics" d="M14 3v22M6 9l8-4 8 4M6 9l-4 10h8L6 9Zm16 0l-4 10h8l-4-10Z" />,
  <path key="care" d="M14 25s-9-5.6-9-13a5.5 5.5 0 0 1 9-4.2A5.5 5.5 0 0 1 23 12c0 7.4-9 13-9 13Z" />,
  <path key="natural" d="M14 25V13M14 13C8 13 5 9 5 4c5 0 9 3 9 9Zm0 0c0-6 4-9 9-9 0 5-3 9-9 9Z" />,
  <path key="safety" d="M14 3l10 4v7c0 6.5-4.3 10.9-10 13-5.7-2.1-10-6.5-10-13V7l10-4Z" />,
  <path key="innovation" d="M14 3v4M14 21v4M4 14H2M26 14h-2M6.5 6.5 5 5M23 23l-1.5-1.5M6.5 21.5 5 23M23 5l-1.5 1.5M20 14a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />,
  <path key="excellence" d="m14 3 3 6.5 7 1-5 5 1.3 7L14 19l-6.3 3.5L9 15.5l-5-5 7-1L14 3Z" />,
];

export function Differentials() {
  const { differential, values } = siteContent;

  return (
    <section className="bg-brown-dark py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            align="left"
            tone="light"
            eyebrow="Diferencial"
            title={differential.text}
          />
          <p className="max-w-xl text-sm leading-relaxed text-cream-light/70 lg:justify-self-end lg:text-right">
            Seis valores que guiam cada decisão e cada indicação dentro da Leh Estetic.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {values.map((value, index) => {
            const spans = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-3'];
            const isFeatured = index === 0 || index === 3;

            return (
              <div
                key={value.title}
                className={`flex flex-col gap-4 rounded-[1.75rem] border p-7 transition-colors ${spans[index]} ${
                  isFeatured
                    ? 'border-gold/50 bg-gold/10'
                    : 'border-cream-light/15 bg-cream-light/5'
                }`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold">
                  <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      {icons[index]}
                    </g>
                  </svg>
                </span>
                <h3 className="text-xl text-cream">{value.title}</h3>
                <p className="text-sm leading-relaxed text-cream-light/70">{value.text}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
