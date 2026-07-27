import { useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PhotoFrame } from '../ui/PhotoFrame';
import { copyToClipboard } from '../../utils/clipboard';
import { Reveal } from '../motion/reveal';
import fachadaImage from '../../assets/leh-estetic/fachada-leh-estetic.webp';

export function Location() {
  const { address } = siteContent;
  const [copied, setCopied] = useState(false);

  async function handleCopyAddress() {
    const fullAddress = `${address.street} — ${siteContent.brand.name}`;
    const success = await copyToClipboard(fullAddress);
    if (success) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  }

  const facadeAlt = `Fachada do prédio espelhado onde fica a ${siteContent.brand.name}, na ${address.street}`;

  return (
    <section id="localizacao" className="bg-cream-light/40 py-24 sm:py-28">
      {/* Mobile (<768px): "Venha nos visitar" -> imagem -> "Localização" ->
          endereço -> referência -> botões. Bloco independente do desktop
          para não reaproveitar estilos fora do breakpoint. */}
      <Container className="flex flex-col gap-6 md:hidden">
        <Reveal as="h2" className="text-3xl leading-[1.15] text-brown-dark">
          Venha nos visitar
        </Reveal>

        <Reveal delay={0.1}>
          <PhotoFrame src={fachadaImage} alt={facadeAlt} className="w-full" />
        </Reveal>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Localização
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-lg text-brown-dark">{address.street}</p>
            <p className="text-sm text-brown/60">{address.reference}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={address.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full bg-brown-dark px-6 py-3 text-center text-sm font-medium text-cream transition-colors hover:bg-brown"
          >
            Abrir no Google Maps
          </a>
          <a
            href={address.wazeUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full border border-gold/50 px-6 py-3 text-center text-sm font-medium text-brown-dark transition-colors hover:bg-gold/10"
          >
            Abrir no Waze
          </a>
          <button
            type="button"
            onClick={handleCopyAddress}
            className="w-full rounded-full border border-gold/50 px-6 py-3 text-center text-sm font-medium text-brown-dark transition-colors hover:bg-gold/10"
          >
            {copied ? 'Endereço copiado!' : 'Copiar endereço'}
          </button>
        </div>
      </Container>

      {/* Tablet/notebook/desktop (>=768px): composição já aprovada, intacta. */}
      <Container className="hidden md:grid md:gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <Reveal direction="left">
            <SectionHeading
              align="left"
              eyebrow="Localização"
              title="Venha nos visitar"
            />
          </Reveal>
          <div className="flex flex-col gap-1">
            <p className="text-lg text-brown-dark">{address.street}</p>
            <p className="text-sm text-brown/60">{address.reference}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={address.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brown-dark px-6 py-3 text-center text-sm font-medium text-cream transition-colors hover:bg-brown"
            >
              Abrir no Google Maps
            </a>
            <a
              href={address.wazeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold/50 px-6 py-3 text-center text-sm font-medium text-brown-dark transition-colors hover:bg-gold/10"
            >
              Abrir no Waze
            </a>
            <button
              type="button"
              onClick={handleCopyAddress}
              className="rounded-full border border-gold/50 px-6 py-3 text-sm font-medium text-brown-dark transition-colors hover:bg-gold/10"
            >
              {copied ? 'Endereço copiado!' : 'Copiar endereço'}
            </button>
          </div>
        </div>

        <Reveal direction="right" delay={0.1} className="flex flex-col gap-3">
          <PhotoFrame
            src={fachadaImage}
            alt={facadeAlt}
            className="w-full max-w-sm mx-auto lg:max-w-none"
          />
          <p className="text-center text-sm text-brown/60">
            {siteContent.brand.name} — {address.street}
          </p>
          <p className="text-center text-sm text-brown/60">
            Mapa interativo disponível pelo link do Google Maps acima
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
