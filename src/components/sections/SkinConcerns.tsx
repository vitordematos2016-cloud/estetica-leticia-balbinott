import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { siteContent } from '../../data/siteContent';
import { treatmentsByGoal } from '../../data/treatmentsByGoal';
import type { SkinConcern, SkinGoal } from '../../types/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useTreatmentsFilter } from '../../context/TreatmentsFilterContext';
import { Reveal, RevealGroup, RevealItem } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';
import { useGoldRipple } from '../../hooks/useGoldRipple';
import { useMobileViewportActive } from '../../hooks/useMobileViewportActive';
import { mobileCardTransition, mobileCardVariants } from '../motion/mobileActive';

const GOAL_ICONS: Record<SkinGoal, ReactNode> = {
  manchas: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="6.3" cy="6.8" r="1.7" fill="currentColor" opacity="0.55" />
    </svg>
  ),
  'linhas-sinais': (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 6c1.3-1.4 2.7-1.4 4 0s2.7 1.4 4 0 2.7-1.4 4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M2 10c1.3-1.4 2.7-1.4 4 0s2.7 1.4 4 0 2.7-1.4 4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  'oleosidade-acne': (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 2c2.2 3 4 5.6 4 7.8a4 4 0 1 1-8 0C4 7.6 5.8 5 8 2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'textura-vico': (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5c.4 2.7 1.4 3.7 4.1 4.1-2.7.4-3.7 1.4-4.1 4.1-.4-2.7-1.4-3.7-4.1-4.1 2.7-.4 3.7-1.4 4.1-4.1Z"
        fill="currentColor"
      />
    </svg>
  ),
  'saude-pele': (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.8 13 3.6v4c0 3.4-2.1 5.9-5 6.6-2.9-.7-5-3.2-5-6.6v-4L8 1.8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  flacidez: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 11 8 5l5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 5v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  'prevencao-envelhecimento': (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5.2v3.5l2.4 1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 1.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
};

/**
 * Cada card continua sendo o mesmo `<a href="#tratamentos" onClick={...}>`
 * de sempre — só a apresentação visual mudou. Hover/toque seguem o mesmo
 * mecanismo já validado em Experience/ThoughtfulDetails: `group-hover` do
 * Tailwind só dispara com hover real (`@media (hover:hover)`, Tailwind v4),
 * `group-active` cobre toque e clique sem nunca ficar "preso", e o
 * `whileHover`/`whileTap` do Motion são neutralizados automaticamente sob
 * `prefers-reduced-motion` pelo `MotionConfig reducedMotion="user"` global.
 *
 * Abaixo de 768px, `data-mobile-active` espelha o mesmo destaque que o
 * `group-hover`/`group-active` já davam no desktop, mas acionado por
 * `useMobileViewportActive` (o card cruzando a região central da tela) em
 * vez de um ponteiro real -- as variantes `group-data-[mobile-active=true]:`
 * reaproveitam exatamente as mesmas classes-alvo do hover, então o visual é
 * idêntico, só a origem do gatilho muda.
 *
 * A lista de tratamentos relacionados vem de `treatmentsByGoal[concern.id]`
 * (configuração centralizada, `src/data/treatmentsByGoal.ts`) -- o card não
 * guarda mais essa lista duplicada.
 */
function ConcernCard({ concern }: { concern: SkinConcern }) {
  const { requestTreatmentsFilterByGoal } = useTreatmentsFilter();
  const { ref, active, isMobileViewport } = useMobileViewportActive<HTMLAnchorElement>();
  const { onPointerDown, rippleLayer } = useGoldRipple();

  return (
    <RevealItem>
      <motion.div
        variants={mobileCardVariants}
        initial={false}
        animate={isMobileViewport ? (active ? 'active' : 'rest') : undefined}
        transition={mobileCardTransition}
      >
        <motion.a
          ref={ref}
          href="#tratamentos"
          data-mobile-active={isMobileViewport ? active : undefined}
          onPointerDown={onPointerDown}
          onClick={(event) => {
            // Filtra a grade de Tratamentos pelos ids relacionados a este
            // objetivo e rola/destaca o primeiro deles, em vez do salto
            // genérico do link. Se nenhum id relacionado existir mais no
            // catálogo, `matchedId` vem null e o link segue seu comportamento
            // padrão (salto simples para #tratamentos, mostrando tudo).
            const matchedId = requestTreatmentsFilterByGoal(concern.label, treatmentsByGoal[concern.id]);
            if (matchedId) event.preventDefault();
          }}
          whileHover={{ y: -2.5 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="group relative flex h-full flex-col gap-2 overflow-hidden rounded-[1.75rem_1.75rem_1.75rem_0.75rem] border border-gold/25 bg-gradient-to-br from-cream via-cream to-beige/30 p-6 text-left shadow-warm-sm transition-all duration-300 hover:border-gold hover:shadow-warm active:border-gold active:shadow-warm data-[mobile-active=true]:border-gold data-[mobile-active=true]:shadow-warm"
        >
          {rippleLayer}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/10 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 group-data-[mobile-active=true]:opacity-100"
          />

          <div className="relative flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-cream/60 text-gold-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-active:-translate-y-0.5 group-active:scale-105 group-data-[mobile-active=true]:-translate-y-0.5 group-data-[mobile-active=true]:scale-105"
            >
              {GOAL_ICONS[concern.id]}
            </span>
            <span className="text-lg font-medium text-brown-dark transition-colors duration-300 group-hover:text-gold group-active:text-gold group-data-[mobile-active=true]:text-gold">
              {concern.label}
            </span>
          </div>
          <span className="relative text-sm leading-relaxed text-brown/65">{concern.description}</span>

          <span className="relative mt-auto flex items-center gap-2 pt-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
            Ver tratamentos
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1 group-data-[mobile-active=true]:translate-x-1"
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent transition-all duration-300 group-hover:from-gold/80 group-active:from-gold/80 group-data-[mobile-active=true]:from-gold/80"
            />
          </span>
        </motion.a>
      </motion.div>
    </RevealItem>
  );
}

export function SkinConcerns() {
  const { skinConcerns } = siteContent;

  return (
    <section className="bg-cream-light/40 py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading title={skinConcerns.title} text={skinConcerns.text} />
        </Reveal>

        <RevealGroup stagger={0.08} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skinConcerns.items.map((concern) => (
            <ConcernCard key={concern.id} concern={concern} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
