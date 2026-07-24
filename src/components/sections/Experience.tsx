import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';
import { PhotoFrame } from '../ui/PhotoFrame';
import corredorImage from '../../assets/leh-estetic/corredor-leh-estetic.webp';

export function Experience() {
  const { experience, brand } = siteContent;

  return (
    <section id="experiencia" className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading title={experience.title} />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <PhotoFrame
            src={corredorImage}
            alt={`Corredor de espera da ${brand.name}, com poltronas, iluminação acolhedora e a frase "Cuide-se" na parede.`}
            className="mx-auto w-full max-w-sm lg:max-w-none"
          />
          <p className="text-base leading-relaxed text-brown/75 sm:text-lg">{experience.text}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
