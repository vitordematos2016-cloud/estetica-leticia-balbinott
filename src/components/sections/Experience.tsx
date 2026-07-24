import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PhotoFrame } from '../ui/PhotoFrame';
import corredorImage from '../../assets/leh-estetic/corredor-leh-estetic.webp';
import salaImage from '../../assets/leh-estetic/sala-principal-leh-estetic.webp';

export function Experience() {
  const { experience, brand } = siteContent;
  const [salaBlock] = experience.additionalBlocks;

  return (
    <section id="experiencia" className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col gap-16">
        <SectionHeading title={experience.title} />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <PhotoFrame
            src={corredorImage}
            alt={`Corredor de espera da ${brand.name}, com poltronas, iluminação acolhedora e a frase "Cuide-se" na parede.`}
            className="mx-auto w-full max-w-sm lg:max-w-none"
          />
          <p className="text-base leading-relaxed text-brown/75 sm:text-lg">{experience.text}</p>
        </div>

        {salaBlock && (
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <PhotoFrame
              src={salaImage}
              alt={`Sala de atendimento da ${brand.name}, com maca profissional, iluminação aconchegante e decoração em tons de bege e dourado.`}
              className="mx-auto w-full max-w-sm lg:order-2 lg:max-w-none"
            />
            <div className="flex flex-col gap-3 lg:order-1">
              <h3 className="text-2xl text-brown-dark sm:text-3xl">{salaBlock.title}</h3>
              <p className="text-base leading-relaxed text-brown/75 sm:text-lg">{salaBlock.text}</p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
