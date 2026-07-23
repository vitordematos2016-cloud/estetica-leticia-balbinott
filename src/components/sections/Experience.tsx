import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';

export function Experience() {
  const { experience } = siteContent;

  return (
    <section id="experiencia" className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading title={experience.title} text={experience.text} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experience.placeholders.map((placeholder) => (
            <PlaceholderMedia
              key={placeholder.label}
              label={placeholder.label}
              description={placeholder.description}
              ratio="landscape"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
