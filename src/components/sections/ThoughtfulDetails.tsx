import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { PhotoFrame } from '../ui/PhotoFrame';
import mimoImage from '../../assets/leh-estetic/cuidado-detalhes-leh-estetic.webp';

export function ThoughtfulDetails() {
  const { thoughtfulDetails, brand } = siteContent;

  return (
    <section className="py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
        <PhotoFrame
          src={mimoImage}
          alt={`Biscoitos personalizados oferecidos como mimo pela ${brand.name}`}
          className="mx-auto w-full max-w-[14rem] sm:max-w-[16rem] lg:mx-0"
        />
        <div className="flex flex-col gap-3 text-center lg:text-left">
          <h2 className="text-2xl text-brown-dark sm:text-3xl">{thoughtfulDetails.title}</h2>
          <p className="max-w-md text-base leading-relaxed text-brown/75 lg:max-w-none">
            {thoughtfulDetails.text}
          </p>
        </div>
      </Container>
    </section>
  );
}
