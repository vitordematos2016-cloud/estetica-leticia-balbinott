import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function Reviews() {
  const { reviews, reviewsNotice } = siteContent;

  return (
    <section id="avaliacoes" className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Avaliações" title="O que dizem sobre a Leh Estetic" />

        {reviews.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-[2rem] border border-dashed border-gold/40 bg-cream px-8 py-14 text-center">
            <p className="text-base text-brown-dark">{reviewsNotice}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.id}
                className="flex flex-col gap-4 rounded-[1.75rem] border border-gold/25 bg-cream p-7 shadow-warm-sm"
              >
                <div className="flex gap-1 text-gold" aria-label={`${review.rating} de 5 estrelas`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill={index < review.rating ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 1l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.8l-4.2 2.2.8-4.7L1.2 6l4.7-.7L8 1Z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-brown/75">
                  “{review.text}”
                </blockquote>
                <figcaption className="text-sm font-medium text-brown-dark">
                  {review.author}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
