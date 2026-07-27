import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Reveal } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';

function Ornament({ mirror = false }: { mirror?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-20 w-20 sm:h-24 sm:w-24 ${mirror ? 'scale-x-[-1]' : ''}`}
    >
      <div className="absolute inset-0 rounded-full border border-gold/25" />
      <div className="absolute inset-3 rounded-full border border-dashed border-gold/30" />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/50" />
    </div>
  );
}

export function Purpose() {
  const { purpose } = siteContent;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
              {purpose.eyebrow}
            </span>
            <h2 className="text-3xl leading-[1.2] text-brown-dark sm:text-4xl">{purpose.heading}</h2>
            <p className="text-base leading-relaxed text-brown/75 sm:text-lg">{purpose.subheading}</p>
          </Reveal>

          <div className="relative grid gap-12 pl-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-14 lg:pl-0">
            <motion.div
              aria-hidden="true"
              className="absolute left-4 top-2 bottom-2 w-px origin-top bg-gold/40 lg:hidden"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE_OUT }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-0 bottom-0 hidden w-px origin-top -translate-x-1/2 bg-gold/40 lg:block"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
            />

            <div className="relative lg:col-start-1 lg:row-start-1">
              <Reveal
                as="span"
                active={isInView}
                direction="left"
                delay={0.15}
                aria-hidden={true}
                className="absolute -left-10 top-8 flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-cream text-xs font-medium text-gold lg:hidden"
              >
                01
              </Reveal>
              <Reveal
                as="div"
                active={isInView}
                direction="left"
                delay={0.15}
                className="relative overflow-hidden rounded-[1.75rem] border border-gold/25 bg-cream-light/40 p-8 shadow-warm-sm sm:p-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 hidden w-1 bg-gold/60 lg:block"
                />
                <span
                  aria-hidden="true"
                  className="mb-4 hidden h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-sm font-medium text-gold lg:flex"
                >
                  01
                </span>
                <h3 className="text-xl text-brown-dark sm:text-2xl">{purpose.purposeTitle}</h3>
                <p className="mt-3 text-base leading-relaxed text-brown/80">{purpose.purposeText}</p>
              </Reveal>
            </div>

            <Reveal
              as="div"
              active={isInView}
              direction="right"
              delay={0.35}
              className="hidden items-center justify-center lg:col-start-2 lg:row-start-1 lg:flex"
            >
              <Ornament />
            </Reveal>

            <Reveal
              as="div"
              active={isInView}
              direction="left"
              delay={0.45}
              className="hidden items-center justify-center lg:col-start-1 lg:row-start-2 lg:flex"
            >
              <Ornament mirror />
            </Reveal>

            <div className="relative lg:col-start-2 lg:row-start-2">
              <Reveal
                as="span"
                active={isInView}
                direction="right"
                delay={0.55}
                aria-hidden={true}
                className="absolute -left-10 top-8 flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-cream text-xs font-medium text-gold lg:hidden"
              >
                02
              </Reveal>
              <Reveal
                as="div"
                active={isInView}
                direction="right"
                delay={0.55}
                className="relative overflow-hidden rounded-[1.75rem] border border-gold/25 bg-cream p-8 shadow-warm-sm sm:p-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 right-0 hidden w-1 bg-gold/60 lg:block"
                />
                <span
                  aria-hidden="true"
                  className="mb-4 hidden h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-sm font-medium text-gold lg:flex"
                >
                  02
                </span>
                <h3 className="text-xl text-brown-dark sm:text-2xl">{purpose.objectiveTitle}</h3>
                <p className="mt-3 text-base leading-relaxed text-brown/80">{purpose.objectiveText}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
