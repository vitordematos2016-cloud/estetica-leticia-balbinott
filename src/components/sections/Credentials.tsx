import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const typeLabels: Record<string, string> = {
  formacao: 'Formação',
  especializacao: 'Especialização',
  curso: 'Curso',
  certificado: 'Certificado',
  tecnologia: 'Tecnologia',
  evento: 'Evento',
};

export function Credentials() {
  const { credentials } = siteContent;

  return (
    <section className="py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Autoridade" title={credentials.title} text={credentials.text} />

        {credentials.items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-gold/40 bg-cream-light/40 px-8 py-14 text-center">
            <p className="text-base text-brown-dark">{credentials.notice}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 rounded-[1.75rem] border border-gold/25 bg-cream p-6 shadow-warm-sm"
              >
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  {typeLabels[item.type] ?? item.type}
                  {item.year ? ` · ${item.year}` : ''}
                </span>
                <h3 className="text-lg text-brown-dark">{item.title}</h3>
                {item.description && (
                  <p className="text-sm leading-relaxed text-brown/70">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
