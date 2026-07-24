import { useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { CredentialsModal } from '../credentials/CredentialsModal';

export function Credentials() {
  const { credentials } = siteContent;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-8 text-center">
        <SectionHeading eyebrow="Autoridade" title={credentials.title} text={credentials.text} />

        <div className="flex w-full max-w-xl flex-col items-center gap-3 rounded-[1.75rem] border border-gold/30 bg-cream-light/40 px-8 py-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <circle cx="11" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
              <path
                d="M7.5 12.8L6 20l5-2.6 5 2.6-1.5-7.2"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3 className="text-lg text-brown-dark">{credentials.moduleTitle}</h3>
          <p className="max-w-sm text-sm leading-relaxed text-brown/70">{credentials.moduleTeaser}</p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-1 rounded-full border border-gold/50 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-brown-dark transition-colors hover:bg-gold/10"
          >
            {credentials.moduleCta}
          </button>
        </div>
      </Container>

      <CredentialsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
