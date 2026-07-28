import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Reveal, RevealGroup, RevealItem } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useRepeatableInView } from '../../hooks/useRepeatableInView';
import { useReplayKey } from '../../hooks/useReplayKey';

interface HeroProps {
  splashFinished: boolean;
}

/**
 * Rastreamento de cursor (tilt da moldura e glow de fundo) usa apenas
 * MotionValues atualizadas via `.set()` dentro dos handlers — nunca
 * `setState` — para não causar re-render a cada pixel. `pointerType !==
 * 'mouse'` descarta toque/caneta antes de mexer em qualquer valor, e sob
 * `prefers-reduced-motion` os handlers retornam cedo (os valores nunca saem
 * do repouso). `whileHover`/`whileTap`/`animate` declarativos já são
 * neutralizados automaticamente pelo `MotionConfig reducedMotion="user"`
 * global.
 */
export function Hero({ splashFinished }: HeroProps) {
  const { hero } = siteContent;
  const professionalFirstName = siteContent.brand.professional.split(' ')[0];
  const prefersReducedMotion = useReducedMotion();

  const frameRef = useRef<HTMLDivElement>(null);
  const isFrameInView = useRepeatableInView(frameRef, { amount: 0.5 });
  const shimmerActive = splashFinished && isFrameInView;
  const shimmerReplayKey = useReplayKey(shimmerActive);

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 150, damping: 18, mass: 0.4 });
  const tiltY = useSpring(rawTiltY, { stiffness: 150, damping: 18, mass: 0.4 });
  const bgShiftX = useTransform(tiltY, [-1.5, 1.5], [4, -4]);
  const bgShiftY = useTransform(tiltX, [-1.5, 1.5], [-4, 4]);

  const rawGlowX = useMotionValue(25);
  const rawGlowY = useMotionValue(15);
  const glowX = useSpring(rawGlowX, { stiffness: 30, damping: 20, mass: 0.7 });
  const glowY = useSpring(rawGlowY, { stiffness: 30, damping: 20, mass: 0.7 });
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(177,138,85,0.12), transparent 55%)`;

  function handleFramePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    rawTiltY.set(relX * 3);
    rawTiltX.set(relY * -3);
  }

  function handleFramePointerLeave() {
    rawTiltX.set(0);
    rawTiltY.set(0);
  }

  function handleSectionPointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawGlowX.set(((event.clientX - rect.left) / rect.width) * 100);
    rawGlowY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  function handleSectionPointerLeave() {
    rawGlowX.set(25);
    rawGlowY.set(15);
  }

  return (
    <section
      id="inicio"
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={handleSectionPointerLeave}
      className="relative overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-28 lg:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-light via-cream to-cream"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: glowBackground }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-beige/40 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-40 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
      />

      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <RevealGroup
          active={splashFinished}
          stagger={0.12}
          className="order-2 flex flex-col items-center gap-6 text-center lg:order-1 lg:items-start lg:text-left"
        >
          <RevealItem>
            <Badge>{hero.eyebrow}</Badge>
          </RevealItem>
          <RevealItem className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <h1 className="text-4xl leading-[1.15] text-brown-dark sm:text-5xl lg:text-[3.4rem]">
              {hero.title}
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-brown/80 sm:text-lg">
              {hero.description}
            </p>
          </RevealItem>
          <RevealItem className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:gap-4">
            <Button
              href={hero.secondaryCta.href}
              variant="primary"
              shine
              className="w-full shadow-[0_20px_45px_-18px_rgba(177,138,85,0.55)] hover:shadow-[0_24px_55px_-16px_rgba(177,138,85,0.65)] sm:w-auto"
            >
              {hero.secondaryCta.label}
            </Button>
            <Button href={hero.primaryCta.href} variant="secondary" className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </Button>
          </RevealItem>
        </RevealGroup>

        <Reveal
          active={splashFinished}
          delay={0.15}
          className="relative order-1 mx-auto aspect-[4/5] w-full max-w-md lg:order-2 lg:max-w-lg [perspective:1200px]"
        >
          <motion.div
            ref={frameRef}
            onPointerMove={handleFramePointerMove}
            onPointerLeave={handleFramePointerLeave}
            initial={{ scale: 0.96 }}
            animate={{ scale: splashFinished ? 1 : 0.96 }}
            whileHover={{ scale: 1.025, transition: { duration: 0.35, ease: EASE_OUT } }}
            whileTap={{ scale: 0.98, transition: { duration: 0.15, ease: EASE_OUT } }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 }}
            style={{ rotateX: tiltX, rotateY: tiltY }}
            className="group relative h-full w-full"
          >
            <motion.div
              aria-hidden="true"
              style={{ x: bgShiftX, y: bgShiftY }}
              className="absolute inset-0 -rotate-3 rounded-[3rem] rounded-tr-[6rem] bg-beige/50"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[3.5rem] bg-gold/10 opacity-80 blur-2xl transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
            />

            <div className="absolute inset-0 rounded-[3rem] rounded-tr-[6rem] bg-gradient-to-br from-beige via-cream-light to-cream shadow-warm ring-1 ring-gold/15 transition-shadow duration-300 group-hover:shadow-[0_28px_65px_-18px_rgba(177,138,85,0.5)] group-hover:ring-gold/35 group-active:shadow-[0_28px_65px_-18px_rgba(177,138,85,0.5)] group-active:ring-gold/35" />
            <div className="absolute inset-4 rounded-[2.5rem] rounded-tr-[5rem] border border-gold/40 transition-colors duration-300 group-hover:border-gold/60 group-active:border-gold/60" />

            <motion.svg
              aria-hidden="true"
              className="absolute -left-6 top-10 h-24 w-24 text-gold/60 sm:h-28 sm:w-28"
              viewBox="0 0 100 100"
              fill="none"
              initial={{ opacity: 0, y: 8 }}
              animate={splashFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.35 }}
            >
              <path
                d="M50 4C50 30 70 30 96 30C70 30 50 60 50 96C50 60 30 30 4 30C30 30 50 30 50 4Z"
                stroke="currentColor"
                strokeWidth="1"
              />
            </motion.svg>

            <motion.div
              role="img"
              aria-label={`Foto profissional da ${professionalFirstName}: em preparação`}
              initial={{ opacity: 0, y: 8 }}
              animate={splashFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.45 }}
              className="absolute inset-x-8 bottom-8 top-8 flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-gold/30 bg-cream/40 text-center backdrop-blur-sm"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 text-gold">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path
                    d="M4 24c1.2-6.5 5-9.5 10-9.5S22.8 17.5 24 24"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <p className="px-6 text-xs font-medium uppercase tracking-[0.2em] text-brown/60">
                Foto profissional da {professionalFirstName}
              </p>
              <p className="px-8 text-[0.7rem] text-brown/45">Em preparação</p>
            </motion.div>

            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, y: 8 }}
              animate={splashFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.55 }}
              className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full border border-gold/35 sm:h-24 sm:w-24"
            />
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={splashFinished ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.6 }}
              className="absolute -bottom-3 -right-3 h-4 w-4 rounded-full bg-gold shadow-[0_0_16px_4px_rgba(177,138,85,0.45)] sm:-bottom-4 sm:-right-4"
            />

            {!prefersReducedMotion && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-[3rem] rounded-tr-[6rem]"
              >
                <motion.div
                  key={shimmerReplayKey}
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-cream/50 to-transparent mix-blend-screen"
                  initial={{ x: '-40%', opacity: 0 }}
                  animate={shimmerActive ? { x: '340%', opacity: [0, 1, 0] } : {}}
                  transition={{ duration: 1, ease: EASE_OUT, delay: 0.9 }}
                />
              </div>
            )}
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}
