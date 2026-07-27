import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Ornament } from '../ui/Ornament';
import { Reveal, RevealGroup, RevealItem } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';

export function HowItWorks() {
  const { howItWorks } = siteContent;
  const pathRef = useRef<HTMLDivElement>(null);
  const isPathInView = useInView(pathRef, { once: true, amount: 0.25 });

  return (
    <section className="py-24 sm:py-28">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <SectionHeading eyebrow="Jornada" title={howItWorks.title} text={howItWorks.text} />
        </Reveal>

        <div ref={pathRef} className="relative">
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-6 bottom-6 w-px origin-top -translate-x-1/2 bg-gold/35 sm:hidden"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isPathInView ? 1 : 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-6 top-8 hidden h-px origin-left bg-gradient-to-r from-transparent via-gold/45 to-transparent lg:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isPathInView ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE_OUT }}
          />

          <RevealGroup
            as="ol"
            active={isPathInView}
            stagger={0.1}
            className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6"
          >
            {howItWorks.steps.map((step, index) => (
              <RevealItem
                as="li"
                key={step.title}
                className="flex flex-col items-center gap-4 text-center"
              >
                <Ornament size="sm">
                  <span className="font-heading text-lg text-gold sm:text-xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </Ornament>
                <h3 className="text-lg text-brown-dark">{step.title}</h3>
                <p className="max-w-[16rem] text-sm leading-relaxed text-brown/70">{step.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
