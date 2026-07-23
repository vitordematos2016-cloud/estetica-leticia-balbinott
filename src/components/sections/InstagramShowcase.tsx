import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';

export function InstagramShowcase() {
  const { instagramShowcase, contact } = siteContent;
  const slots = Array.from({ length: instagramShowcase.postsPlaceholderCount }, (_, index) => index + 1);

  return (
    <section className="py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Instagram" title={instagramShowcase.title} text={instagramShowcase.text} />

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {slots.map((slot) => (
            <PlaceholderMedia
              key={slot}
              label={`Publicação ${slot}`}
              description="Em preparação"
              ratio="square"
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-brown/60">{instagramShowcase.notice}</p>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-brown-dark underline decoration-gold/50 underline-offset-4 hover:text-gold"
          >
            Seguir {contact.instagramHandle} no Instagram
          </a>
        </div>
      </Container>
    </section>
  );
}
