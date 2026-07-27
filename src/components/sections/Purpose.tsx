import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Ornament } from '../ui/Ornament';
import { Reveal } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';

const GOLD_RGB = '177,138,85';
const restColor = `rgba(${GOLD_RGB},0.4)`;
const activeColor = `rgba(${GOLD_RGB},0.75)`;

/**
 * `purposeActive`/`objectiveActive` só mudam em `onHoverStart`/`onHoverEnd`
 * (evento discreto do Framer Motion, já filtrado para mouse real — não
 * dispara em toque), nunca em movimento contínuo, então não há
 * re-renderização por pixel. Cada card usa dois elementos empilhados: o
 * `Reveal` externo cuida só da entrada (opacity/x/y, inalterado); um
 * `motion.div` interno cuida só da interação (hover/tap), evitando duas
 * transformações concorrentes no mesmo elemento.
 */
export function Purpose() {
  const { purpose } = siteContent;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [purposeActive, setPurposeActive] = useState(false);
  const [objectiveActive, setObjectiveActive] = useState(false);

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div ref={ref} className="flex flex-col gap-14 lg:gap-16">
          <Reveal
            as="div"
            active={isInView}
            direction="up"
            delay={0}
            className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
          >
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold-deep">
              {purpose.eyebrow}
            </span>
            <h2 className="text-3xl leading-[1.2] text-brown-dark sm:text-4xl">{purpose.heading}</h2>
            <p className="text-base leading-relaxed text-brown/75 sm:text-lg">{purpose.subheading}</p>
          </Reveal>

          <div className="relative grid gap-12 pl-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-14 lg:pl-0">
            <motion.div
              aria-hidden="true"
              className="absolute left-4 top-2 bottom-2 w-px origin-top lg:hidden"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE_OUT }}
            >
              <motion.div
                className="h-1/2 w-full"
                initial={{ backgroundColor: restColor }}
                animate={{ backgroundColor: purposeActive ? activeColor : restColor }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
              <motion.div
                className="h-1/2 w-full"
                initial={{ backgroundColor: restColor }}
                animate={{ backgroundColor: objectiveActive ? activeColor : restColor }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-0 bottom-0 hidden w-px origin-top -translate-x-1/2 lg:block"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
            >
              <motion.div
                className="h-1/2 w-full"
                initial={{ backgroundColor: restColor }}
                animate={{ backgroundColor: purposeActive ? activeColor : restColor }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
              <motion.div
                className="h-1/2 w-full"
                initial={{ backgroundColor: restColor }}
                animate={{ backgroundColor: objectiveActive ? activeColor : restColor }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </motion.div>

            <div className="relative lg:col-start-1 lg:row-start-1">
              <Reveal
                as="span"
                active={isInView}
                direction="left"
                delay={0.15}
                aria-hidden={true}
                className="absolute -left-10 top-8 flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-cream text-xs font-medium text-gold-deep lg:hidden"
              >
                01
              </Reveal>
              <Reveal as="div" active={isInView} direction="left" delay={0.15}>
                <motion.div
                  onHoverStart={() => setPurposeActive(true)}
                  onHoverEnd={() => setPurposeActive(false)}
                  whileHover={{ y: -2, scale: 1.012 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-gold/25 bg-cream-light/40 p-8 shadow-warm-sm transition-shadow duration-300 hover:shadow-warm active:shadow-warm sm:p-9"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 rounded-[1.75rem] bg-[radial-gradient(circle_at_30%_20%,rgba(177,138,85,0.10),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 hidden w-1 bg-gold/60 transition-colors duration-300 group-hover:bg-gold/90 group-active:bg-gold/90 lg:block"
                  />
                  <span
                    aria-hidden="true"
                    className="mb-4 hidden h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-sm font-medium text-gold-deep transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-gold/70 group-active:translate-x-0.5 group-active:border-gold/70 lg:flex"
                  >
                    01
                  </span>
                  <h3 className="text-xl text-brown-dark sm:text-2xl">{purpose.purposeTitle}</h3>
                  <p className="mt-3 text-base leading-relaxed text-brown/80">{purpose.purposeText}</p>
                </motion.div>
              </Reveal>
            </div>

            <Reveal
              as="div"
              active={isInView}
              direction="right"
              delay={0.35}
              className="hidden items-center justify-center lg:col-start-2 lg:row-start-1 lg:flex"
            >
              <motion.div
                animate={{ rotate: purposeActive ? -1.5 : 0, x: purposeActive ? 2 : 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <Ornament />
              </motion.div>
            </Reveal>

            <Reveal
              as="div"
              active={isInView}
              direction="left"
              delay={0.45}
              className="hidden items-center justify-center lg:col-start-1 lg:row-start-2 lg:flex"
            >
              <motion.div
                animate={{ rotate: objectiveActive ? 1.5 : 0, x: objectiveActive ? -2 : 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <Ornament mirror />
              </motion.div>
            </Reveal>

            <div className="relative lg:col-start-2 lg:row-start-2">
              <Reveal
                as="span"
                active={isInView}
                direction="right"
                delay={0.55}
                aria-hidden={true}
                className="absolute -left-10 top-8 flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-cream text-xs font-medium text-gold-deep lg:hidden"
              >
                02
              </Reveal>
              <Reveal as="div" active={isInView} direction="right" delay={0.55}>
                <motion.div
                  onHoverStart={() => setObjectiveActive(true)}
                  onHoverEnd={() => setObjectiveActive(false)}
                  whileHover={{ y: -2, scale: 1.012 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-gold/25 bg-cream p-8 shadow-warm-sm transition-shadow duration-300 hover:shadow-warm active:shadow-warm sm:p-9"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 rounded-[1.75rem] bg-[radial-gradient(circle_at_70%_20%,rgba(177,138,85,0.10),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 right-0 hidden w-1 bg-gold/60 transition-colors duration-300 group-hover:bg-gold/90 group-active:bg-gold/90 lg:block"
                  />
                  <span
                    aria-hidden="true"
                    className="mb-4 hidden h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-sm font-medium text-gold-deep transition-all duration-300 group-hover:-translate-x-0.5 group-hover:border-gold/70 group-active:-translate-x-0.5 group-active:border-gold/70 lg:flex"
                  >
                    02
                  </span>
                  <h3 className="text-xl text-brown-dark sm:text-2xl">{purpose.objectiveTitle}</h3>
                  <p className="mt-3 text-base leading-relaxed text-brown/80">{purpose.objectiveText}</p>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
