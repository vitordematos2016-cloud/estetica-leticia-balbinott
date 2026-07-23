import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';

export function Aftercare() {
  const { aftercare } = siteContent;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-[2rem] border border-gold/25 bg-cream-light/40 px-8 py-12 text-center">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2c3 3 6 6.5 6 10a6 6 0 1 1-12 0c0-3.5 3-7 6-10Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className="text-2xl text-brown-dark sm:text-3xl">{aftercare.title}</h2>
          <p className="text-base leading-relaxed text-brown/75">{aftercare.text}</p>
        </div>
      </Container>
    </section>
  );
}
