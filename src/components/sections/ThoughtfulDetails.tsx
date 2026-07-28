import { useRef } from 'react';
import { motion } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { PhotoFrame } from '../ui/PhotoFrame';
import { Reveal } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMobileViewportActive } from '../../hooks/useMobileViewportActive';
import { mobileCardTransition, mobileCardVariants } from '../motion/mobileActive';
import { useRepeatableInView } from '../../hooks/useRepeatableInView';
import { useReplayKey } from '../../hooks/useReplayKey';
import mimoImage from '../../assets/leh-estetic/cuidado-detalhes-leh-estetic.webp';

/**
 * Seção pequena e delicada — uma "lembrancinha", não um bloco de conteúdo
 * principal. Foto, título e texto formam um único conjunto de interação
 * (mesmo mecanismo hover/toque já validado em Experience.tsx): `group-hover`
 * do Tailwind só dispara com hover real (`@media (hover:hover)`, padrão do
 * Tailwind v4), `group-active` cobre toque e clique, e o `whileTap`/
 * `whileHover` do Motion são neutralizados automaticamente sob
 * `prefers-reduced-motion` pelo `MotionConfig reducedMotion="user"` global.
 * O brilho de entrada é removido por completo (não só neutralizado) quando
 * o SO pede menos movimento.
 *
 * Abaixo de 768px, um wrapper externo com `useMobileViewportActive` (ref
 * próprio, distinto do `ref`/`isInView` de entrada acima) recua o conjunto
 * fora da região central da tela e devolve presença total ao cruzá-la;
 * `data-mobile-active` reaproveita as mesmas classes `group-hover:`/
 * `group-active:` via `group-data-[mobile-active=true]:`.
 */
export function ThoughtfulDetails() {
  const { thoughtfulDetails, brand } = siteContent;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useRepeatableInView(ref, { amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const shimmerReplayKey = useReplayKey(isInView);
  const { ref: mobileRef, active: mobileActive, isMobileViewport } = useMobileViewportActive<HTMLDivElement>();

  return (
    <section className="py-16 sm:py-20">
      <Container className="flex justify-center">
        <motion.div
          ref={mobileRef}
          variants={mobileCardVariants}
          initial={false}
          animate={isMobileViewport ? (mobileActive ? 'active' : 'rest') : undefined}
          transition={mobileCardTransition}
        >
        <motion.div
          ref={ref}
          data-mobile-active={isMobileViewport ? mobileActive : undefined}
          className="group relative mx-auto flex w-full max-w-xs flex-col items-center gap-3 text-center sm:max-w-sm"
          whileHover={{ y: -2.5, scale: 1.01, rotate: 0.4 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          <Reveal active={isInView} delay={0}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 -rotate-2 rounded-[1.75rem] bg-beige/45"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 rounded-[2.25rem] bg-gold/10 opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 group-data-[mobile-active=true]:opacity-100"
              />
              <div
                aria-hidden="true"
                className="absolute -top-1.5 left-1/2 h-4 w-10 -translate-x-1/2 -rotate-3 rounded-[2px] bg-gold/25 shadow-sm"
              />

              <motion.div
                className="relative"
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                <PhotoFrame
                  src={mimoImage}
                  alt={`Biscoitos personalizados oferecidos como mimo pela ${brand.name}`}
                  className="relative w-full max-w-[14rem] transition-shadow duration-300 group-hover:border-gold/70 group-hover:shadow-warm group-active:border-gold/70 group-active:shadow-warm group-data-[mobile-active=true]:border-gold/70 group-data-[mobile-active=true]:shadow-warm sm:max-w-[16rem]"
                />

                {!prefersReducedMotion && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]"
                  >
                    <motion.div
                      key={shimmerReplayKey}
                      aria-hidden="true"
                      className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-cream/60 to-transparent mix-blend-screen"
                      initial={{ x: '-40%', opacity: 0 }}
                      animate={isInView ? { x: '340%', opacity: [0, 1, 0] } : {}}
                      transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.6 }}
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </Reveal>

          <Reveal active={isInView} delay={0.18}>
            <h2 className="text-2xl text-brown-dark transition-colors duration-300 group-hover:text-gold group-active:text-gold group-data-[mobile-active=true]:text-gold sm:text-3xl">
              {thoughtfulDetails.title}
            </h2>
          </Reveal>

          <Reveal active={isInView} delay={0.28}>
            <p className="max-w-xs text-base leading-relaxed text-brown/75 sm:max-w-sm">
              {thoughtfulDetails.text}
            </p>
          </Reveal>
        </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
