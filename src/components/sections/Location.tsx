import { useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { copyToClipboard } from '../../utils/clipboard';

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

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-cream via-cream-light to-beige/40 shadow-warm-sm">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="text-gold">
              <path
                d="M20 4c-7 0-12.5 5.5-12.5 12.4C7.5 25 20 36 20 36s12.5-11 12.5-19.6C32.5 9.5 27 4 20 4Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle cx="20" cy="16.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <p className="max-w-[16rem] text-sm text-brown/60">
              Mapa interativo disponível pelo link do Google Maps acima
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
