import { useRef } from 'react';
import { motion } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Ornament } from '../ui/Ornament';
import { Reveal } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { useRepeatableInView } from '../../hooks/useRepeatableInView';

export function FinalCta() {
  const { finalCta, contact, whatsappDefaultMessage } = siteContent;
  const whatsappUrl = buildWhatsAppUrl(contact.whatsappNumber, whatsappDefaultMessage);
  const ref = useRef<HTMLElement>(null);
  const isInView = useRepeatableInView(ref, { amount: 0.4 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-brown-dark py-24 text-center sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(177,138,85,0.2),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[28rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-gold/10 blur-3xl"
      />

      <Container className="relative flex flex-col items-center gap-7">
        <Reveal as="div" active={isInView} direction="up" delay={0}>
          <Ornament size="xs" className="mx-auto" />
        </Reveal>

        <Reveal
          as="h2"
          active={isInView}
          direction="up"
          delay={0.12}
          className="max-w-2xl font-heading text-3xl leading-[1.2] text-cream sm:text-4xl"
        >
          {finalCta.title}
        </Reveal>

        <Reveal
          as="p"
          active={isInView}
          direction="up"
          delay={0.24}
          className="max-w-xl text-base leading-relaxed text-cream-light/80 sm:text-lg"
        >
          {finalCta.text}
        </Reveal>

        <Reveal
          active={isInView}
          direction="up"
          delay={0.36}
          className="mt-2 flex flex-col gap-4 sm:flex-row"
        >
          <Button
            href={finalCta.primaryCta.href}
            variant="primary"
            shine
            className="bg-gold text-brown-dark shadow-[0_10px_30px_-10px_rgba(177,138,85,0.6)] transition-shadow duration-300 hover:bg-gold-soft hover:shadow-[0_14px_40px_-10px_rgba(177,138,85,0.75)]"
          >
            {finalCta.primaryCta.label}
          </Button>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream-light/40 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:border-cream-light hover:bg-cream-light/10 active:border-cream-light active:bg-cream-light/10"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            {finalCta.secondaryCtaLabel}
          </motion.a>
        </Reveal>
      </Container>
    </section>
  );
}
