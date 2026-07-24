import { useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PhotoFrame } from '../ui/PhotoFrame';
import { copyToClipboard } from '../../utils/clipboard';
import fachadaImage from '../../assets/leh-estetic/fachada-leh-estetic.webp';

export function Location() {
  const { address } = siteContent;
  const [copied, setCopied] = useState(false);

  async function handleCopyAddress() {
    const fullAddress = `${address.street} — ${address.reference}`;
    const success = await copyToClipboard(fullAddress);
    if (success) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <section id="localizacao" className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow="Localização"
            title="Venha nos visitar"
          />
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

        <div className="flex flex-col gap-3">
          <PhotoFrame
            src={fachadaImage}
            alt={`Fachada do prédio espelhado onde fica a ${siteContent.brand.name}, na ${address.street}`}
            className="w-full max-w-sm mx-auto lg:max-w-none"
          />
          <p className="text-center text-sm text-brown/60">
            {siteContent.brand.name} — {address.street}
          </p>
          <p className="text-center text-sm text-brown/60">
            Mapa interativo disponível pelo link do Google Maps acima
          </p>
        </div>
      </Container>
    </section>
  );
}
