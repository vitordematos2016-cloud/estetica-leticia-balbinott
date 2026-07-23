import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function Technologies() {
  const { technologies } = siteContent;

  return (
    <section className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading title={technologies.title} text={technologies.text} />

        {technologies.items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-gold/40 bg-cream px-8 py-14 text-center">
            <p className="text-base text-brown-dark">{technologies.notice}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 rounded-[1.75rem] border border-gold/25 bg-cream p-6 shadow-warm-sm"
              >
                <h3 className="text-lg text-brown-dark">{item.name}</h3>
                <p className="text-sm leading-relaxed text-brown/70">{item.purpose}</p>
                {item.benefit && (
                  <p className="text-xs font-medium uppercase tracking-wide text-gold">
                    {item.benefit}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
