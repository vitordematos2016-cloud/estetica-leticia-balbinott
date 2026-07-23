import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';

const emptySlots = Array.from({ length: 6 }, (_, index) => index + 1);

export function Gallery() {
  const { gallery } = siteContent;

  return (
    <section className="py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Galeria" title={gallery.title} text={gallery.text} />

        {gallery.images.length === 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {emptySlots.map((slot) => (
              <PlaceholderMedia
                key={slot}
                label={`Galeria ${slot}`}
                description="Imagem em preparação"
                ratio="square"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.images.map((image) => (
              <PlaceholderMedia key={image.id} label={image.label} ratio="square" />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
