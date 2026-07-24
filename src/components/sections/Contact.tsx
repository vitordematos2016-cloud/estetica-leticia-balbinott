import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

export function Contact() {
  const { contact, address } = siteContent;
  const whatsappUrl = buildWhatsAppUrl(contact.whatsappNumber, siteContent.whatsappDefaultMessage);

  const items = [
    {
      label: 'WhatsApp',
      value: contact.whatsappDisplay,
      href: whatsappUrl,
      external: true,
    },
    {
      label: 'E-mail',
      value: contact.email,
      href: `mailto:${contact.email}`,
      external: false,
    },
    {
      label: 'Instagram',
      value: contact.instagramHandle,
      href: contact.instagramUrl,
      external: true,
    },
    {
      label: 'Endereço',
      value: address.street,
      href: address.googleMapsUrl,
      external: true,
    },
  ];

  return (
    <section id="contato" className="py-24 sm:py-28">
      <Container className="flex flex-col items-center gap-12 text-center">
        <SectionHeading eyebrow="Contato" title="Fale com a Estética Letícia Balbinott" />

        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              className="flex flex-col items-center gap-2 rounded-[1.5rem] border border-gold/25 bg-cream-light/30 px-5 py-8 text-center transition-colors hover:border-gold"
            >
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                {item.label}
              </span>
              <span className="text-sm text-brown-dark">{item.value}</span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
