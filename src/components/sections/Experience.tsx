import { motion } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PhotoFrame } from '../ui/PhotoFrame';
import { Reveal, RevealGroup, RevealItem } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';
import corredorImage from '../../assets/leh-estetic/corredor-leh-estetic.webp';
import salaImage from '../../assets/leh-estetic/sala-principal-leh-estetic.webp';
import salaSecundariaImage from '../../assets/leh-estetic/sala-secundaria-leh-estetic.webp';

/**
 * Um "conjunto" completo (foto + título opcional + descrição), tratado como
 * uma única unidade de interação: passar o mouse ou tocar em qualquer parte
 * dele (foto ou texto) reage no conjunto inteiro, de forma coordenada.
 *  - `group-hover:`/`motion-safe:group-hover:` (Tailwind) só disparam em
 *    ponteiros com hover real — Tailwind v4 já compila `hover`/`group-hover`
 *    dentro de `@media (hover: hover)`, então nunca ficam presos em toque.
 *  - `group-active:` cobre toque e clique nos dois, sempre solta ao soltar.
 *  - `whileTap` do Motion comprime o conjunto inteiro; é neutralizado
 *    automaticamente pelo MotionConfig reducedMotion="user" global (só
 *    afeta valores de transform, por isso o deslocamento do título usa
 *    `motion-safe:` em paralelo — cor, sombra e borda continuam podendo
 *    mudar, só que instantâneas, via a regra global de reduced-motion já
 *    existente em index.css).
 */
function ExperienceSet({
  image,
  alt,
  title,
  text,
}: {
  image: string;
  alt: string;
  title?: string;
  text: string;
}) {
  return (
    <motion.div
      className="group relative flex flex-col items-center gap-6 text-center"
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15, ease: EASE_OUT }}
    >
      <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
        <div
          aria-hidden="true"
          className="absolute inset-0 -translate-x-2 translate-y-2 rounded-[2rem] bg-beige/40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-[2.5rem] bg-gold/10 opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
        />
        <PhotoFrame
          src={image}
          alt={alt}
          className="relative w-full transition-shadow duration-300 group-hover:border-gold/70 group-hover:shadow-warm group-active:border-gold/70 group-active:shadow-warm"
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        {title && (
          <div className="flex flex-col items-center gap-1.5 transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5">
            <h3 className="text-2xl text-brown-dark transition-colors duration-300 group-hover:text-gold group-active:text-gold sm:text-3xl">
              {title}
            </h3>
            <span
              aria-hidden="true"
              className="h-px w-10 bg-gold/50 transition-all duration-300 group-hover:w-16 group-active:w-16"
            />
          </div>
        )}
        <p className="max-w-sm text-base leading-relaxed text-brown/75 transition-colors duration-300 group-hover:text-brown-dark group-active:text-brown-dark sm:text-lg">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { experience, brand } = siteContent;
  const [salaBlock, salaSecundariaBlock] = experience.additionalBlocks;

  const additionalPhotos = [
    salaSecundariaBlock && {
      block: salaSecundariaBlock,
      image: salaSecundariaImage,
      alt: `Sala de atendimento da ${brand.name}, com maca profissional e parede em mármore com iluminação decorativa.`,
    },
    salaBlock && {
      block: salaBlock,
      image: salaImage,
      alt: `Sala de atendimento da ${brand.name}, com maca profissional, iluminação aconchegante e decoração em tons de bege e dourado.`,
    },
  ].filter((entry): entry is { block: (typeof experience.additionalBlocks)[number]; image: string; alt: string } => !!entry);

  return (
    <section id="experiencia" className="relative overflow-hidden bg-cream-light/40 py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(177,138,85,0.08),transparent_60%)]"
      />

      <Container className="relative flex flex-col gap-16">
        <Reveal>
          <SectionHeading eyebrow="Experiência" title={experience.title} />
        </Reveal>

        <RevealGroup
          stagger={0.12}
          className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12"
        >
          <RevealItem>
            <ExperienceSet
              image={corredorImage}
              alt={`Corredor de espera da ${brand.name}, com poltronas, iluminação acolhedora e a frase "Cuide-se" na parede.`}
              title="Ambiente acolhedor"
              text={experience.text}
            />
          </RevealItem>

          {additionalPhotos.map(({ block, image, alt }) => (
            <RevealItem key={block.title}>
              <ExperienceSet image={image} alt={alt} title={block.title} text={block.text} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
