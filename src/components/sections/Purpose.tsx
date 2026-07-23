import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';

function highlightWords(text: string, words: string[]) {
  const pattern = new RegExp(`(${words.join('|')})`, 'gi');
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    words.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
      <strong key={index} className="font-medium text-gold">
        {part}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function Purpose() {
  const { purpose } = siteContent;

  return (
    <section className="py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            {purpose.title}
          </span>
          <p className="text-2xl leading-relaxed text-brown-dark sm:text-[1.7rem]">
            {highlightWords(purpose.text, purpose.emphasis)}
          </p>
        </div>

        <div className="flex flex-col gap-5 rounded-[2rem] border border-gold/25 bg-cream-light/50 p-8 sm:p-10">
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            {purpose.objectiveTitle}
          </span>
          <p className="text-lg leading-relaxed text-brown/85">{purpose.objectiveText}</p>
        </div>
      </Container>
    </section>
  );
}
