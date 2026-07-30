import { useRef } from 'react';
import { motion } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Reveal, RevealGroup, RevealItem } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';
import { useRepeatableInView } from '../../hooks/useRepeatableInView';
import { AboutOrganicPhoto } from './AboutOrganicPhoto';

/**
 * Destaques são puramente informativos (sem onClick/href/role) — a
 * microinteração é só decorativa. `hover:`/`group-hover:` só disparam com
 * hover real (Tailwind v4 compila dentro de `@media (hover:hover)`),
 * `active:`/`group-active:` cobrem toque sem nunca ficar "presos", e o
 * Motion é neutralizado automaticamente sob `prefers-reduced-motion` pelo
 * `MotionConfig reducedMotion="user"` global. O reflexo dourado da imagem é
 * removido por completo (não só neutralizado) sob redução de movimento.
 */
export function About() {
  const { about } = siteContent;
  const ref = useRef<HTMLElement>(null);
  const isInView = useRepeatableInView(ref, { amount: 0.3 });

  return (
    <section id="sobre" ref={ref} className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal active={isInView} direction="left">
          <motion.div
            className="group relative"
            whileHover={{ y: -2.5, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <AboutOrganicPhoto
              src="/images/about/leticia-balbinott-sobre-invertida.webp"
              alt={`${siteContent.brand.professional}, especialista em estética facial e regenerativa`}
              isInView={isInView}
            />
          </motion.div>
        </Reveal>

        <div className="group/content relative flex flex-col gap-6">
          <Reveal active={isInView} direction="right" delay={0.1}>
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-gold-deep">
              <motion.span
                aria-hidden="true"
                className="h-px w-5 origin-left bg-gold/60 transition-all duration-300 group-hover/content:w-7 group-active/content:w-7"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
              />
              Sobre
            </span>
          </Reveal>

          <Reveal active={isInView} direction="right" delay={0.22}>
            <h2 className="text-3xl leading-[1.2] text-brown-dark transition-colors duration-300 group-hover/content:text-gold group-active/content:text-gold sm:text-4xl">
              {about.title}
            </h2>
          </Reveal>

          <Reveal active={isInView} direction="right" delay={0.34}>
            <p className="text-base leading-relaxed text-brown/80 sm:text-lg">{about.text}</p>
          </Reveal>

          <RevealGroup active={isInView} delayChildren={0.46} stagger={0.06} className="mt-2">
            <ul className="flex flex-wrap gap-3">
              {about.highlights.map((highlight) => (
                <RevealItem as="li" key={highlight} direction="up" duration={0.4}>
                  <motion.div
                    className="group relative flex items-center gap-2 rounded-[0.85rem_0.85rem_0.85rem_0.3rem] border border-gold/25 bg-gradient-to-br from-cream-light/70 to-beige/30 px-3.5 py-2 transition-all duration-300 hover:border-gold/60 active:border-gold/60"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70 transition-transform duration-300 group-hover:scale-125 group-active:scale-125"
                    />
                    <span className="text-sm text-brown-dark/85 transition-colors duration-300 group-hover:text-brown-dark group-active:text-brown-dark">
                      {highlight}
                    </span>
                  </motion.div>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
