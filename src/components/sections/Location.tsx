import { useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PhotoFrame } from '../ui/PhotoFrame';
import { copyToClipboard } from '../../utils/clipboard';
import { Reveal } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import fachadaImage from '../../assets/leh-estetic/fachada-leh-estetic.webp';

/**
 * O tilt da fachada usa MotionValues atualizadas via `.set()` no
 * `onPointerMove` (nunca `setState`), restritas a `pointerType === 'mouse'`
 * e a `!prefersReducedMotion` -- em toque ou com movimento reduzido, os
 * valores nunca saem do repouso. `whileHover`/`whileTap` declarativos já são
 * neutralizados sob `prefers-reduced-motion` pelo `MotionConfig
 * reducedMotion="user"` global. As mesmas MotionValues são reaproveitadas
 * pelos blocos mobile e desktop -- só um está visível por vez (`md:hidden` /
 * `hidden md:grid`), então não há disputa entre eles.
 */
export function Location() {
  const { address } = siteContent;
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // O raio observa o próprio wrapper da foto (não a viewport da seção
  // inteira) para só disparar quando a imagem realmente estiver visível --
  // um `useInView` por árvore (mobile/desktop), já que as duas existem no
  // DOM ao mesmo tempo e só uma fica visível via CSS por vez.
  const beamFrameMobileRef = useRef<HTMLDivElement>(null);
  const beamFrameDesktopRef = useRef<HTMLDivElement>(null);
  const beamInViewMobile = useInView(beamFrameMobileRef, { once: true, amount: 0.4 });
  const beamInViewDesktop = useInView(beamFrameDesktopRef, { once: true, amount: 0.4 });

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 160, damping: 18, mass: 0.4 });
  const tiltY = useSpring(rawTiltY, { stiffness: 160, damping: 18, mass: 0.4 });
  const glowShiftX = useTransform(tiltY, [-1, 1], [3, -3]);
  const glowShiftY = useTransform(tiltX, [-1, 1], [-3, 3]);

  function handleFramePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    rawTiltY.set(relX * 2);
    rawTiltX.set(relY * -2);
  }

  function handleFramePointerLeave() {
    rawTiltX.set(0);
    rawTiltY.set(0);
  }

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
          <div className="relative [perspective:1000px]">
            <motion.div
              aria-hidden="true"
              style={{ x: glowShiftX, y: glowShiftY }}
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gold/10 blur-2xl"
            />
            <motion.div
              onPointerMove={handleFramePointerMove}
              onPointerLeave={handleFramePointerLeave}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              style={{ rotateX: tiltX, rotateY: tiltY }}
              className="group"
            >
              <div
                ref={beamFrameMobileRef}
                className="relative w-full overflow-hidden rounded-[2rem]"
              >
                <PhotoFrame
                  src={fachadaImage}
                  alt={facadeAlt}
                  className="w-full transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none group-hover:border-gold group-hover:shadow-warm group-active:border-gold group-active:shadow-warm"
                />
                {!prefersReducedMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(201,160,109,0.45)_30%,rgba(255,238,204,0.75)_50%,rgba(201,160,109,0.45)_70%,transparent)] blur-sm"
                    initial={{ x: '-200%', opacity: 0 }}
                    animate={beamInViewMobile ? { x: '500%', opacity: [0, 1, 1, 0] } : {}}
                    transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.7 }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal
          delay={0.18}
          className="flex flex-col gap-3 rounded-[1.5rem] border border-gold/20 bg-cream/40 p-5 transition-colors duration-300 hover:border-gold/40"
        >
          <span aria-hidden="true" className="h-px w-10 bg-gold/50" />
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold-deep">
            Localização
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-lg text-brown-dark">{address.street}</p>
            <p className="text-sm text-brown/60">{address.reference}</p>
          </div>
        </Reveal>

        <Reveal delay={0.26} className="flex flex-col gap-3">
          <motion.a
            href={address.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="w-full rounded-full bg-brown-dark px-6 py-3 text-center text-sm font-medium text-cream shadow-warm-sm transition-shadow duration-300 hover:shadow-warm active:shadow-warm"
          >
            Abrir no Google Maps
          </motion.a>
          <motion.a
            href={address.wazeUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.975 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="w-full rounded-full border border-gold/50 px-6 py-3 text-center text-sm font-medium text-brown-dark transition-colors hover:bg-gold/10"
          >
            Abrir no Waze
          </motion.a>
          <motion.button
            type="button"
            onClick={handleCopyAddress}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.975 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="w-full rounded-full border border-gold/50 px-6 py-3 text-center text-sm font-medium text-brown-dark transition-colors hover:bg-gold/10"
          >
            {copied ? 'Endereço copiado!' : 'Copiar endereço'}
          </motion.button>
        </Reveal>
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

          <Reveal
            as="div"
            direction="left"
            delay={0.15}
            className="flex flex-col gap-2 rounded-[1.5rem] border border-gold/20 bg-cream/40 p-5 transition-colors duration-300 hover:border-gold/40"
          >
            <span aria-hidden="true" className="h-px w-10 bg-gold/50" />
            <p className="text-lg text-brown-dark">{address.street}</p>
            <p className="text-sm text-brown/60">{address.reference}</p>
          </Reveal>

          <Reveal
            as="div"
            direction="left"
            delay={0.25}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <motion.a
              href={address.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="rounded-full bg-brown-dark px-6 py-3 text-center text-sm font-medium text-cream shadow-warm-sm transition-shadow duration-300 hover:shadow-warm active:shadow-warm"
            >
              Abrir no Google Maps
            </motion.a>
            <motion.a
              href={address.wazeUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.975 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="rounded-full border border-gold/50 px-6 py-3 text-center text-sm font-medium text-brown-dark transition-colors hover:bg-gold/10"
            >
              Abrir no Waze
            </motion.a>
            <motion.button
              type="button"
              onClick={handleCopyAddress}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.975 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="rounded-full border border-gold/50 px-6 py-3 text-sm font-medium text-brown-dark transition-colors hover:bg-gold/10"
            >
              {copied ? 'Endereço copiado!' : 'Copiar endereço'}
            </motion.button>
          </Reveal>
        </div>

        <Reveal direction="right" delay={0.1} className="flex flex-col gap-3">
          <div className="relative [perspective:1000px]">
            <motion.div
              aria-hidden="true"
              style={{ x: glowShiftX, y: glowShiftY }}
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gold/10 blur-2xl"
            />
            <motion.div
              onPointerMove={handleFramePointerMove}
              onPointerLeave={handleFramePointerLeave}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              style={{ rotateX: tiltX, rotateY: tiltY }}
              className="group"
            >
              <div
                ref={beamFrameDesktopRef}
                className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] lg:max-w-none"
              >
                <PhotoFrame
                  src={fachadaImage}
                  alt={facadeAlt}
                  className="w-full transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none group-hover:border-gold group-hover:shadow-warm group-active:border-gold group-active:shadow-warm"
                />
                {!prefersReducedMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(201,160,109,0.45)_30%,rgba(255,238,204,0.75)_50%,rgba(201,160,109,0.45)_70%,transparent)] blur-sm"
                    initial={{ x: '-200%', opacity: 0 }}
                    animate={beamInViewDesktop ? { x: '500%', opacity: [0, 1, 1, 0] } : {}}
                    transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.7 }}
                  />
                )}
              </div>
            </motion.div>
          </div>
          <p className="text-center text-sm text-brown/60">
            {siteContent.brand.name} — {address.street}
          </p>
          <p className="text-center text-sm text-brown/60 lg:hidden">
            Mapa interativo disponível pelo link do Google Maps acima
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
