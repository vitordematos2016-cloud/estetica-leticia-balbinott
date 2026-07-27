import { motion } from 'motion/react';
import type { ElementType, ReactNode } from 'react';
import { EASE_OUT, directionOffset } from './variants';
import type { RevealDirection } from './variants';

const tagMap = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  li: motion.li,
  ol: motion.ol,
  section: motion.section,
} as const;

type Tag = keyof typeof tagMap;

interface RevealProps {
  children?: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  as?: Tag;
  /**
   * Quando informado, o reveal passa a ser controlado por essa flag (ex.: um
   * `useInView` compartilhado por várias peças, para reproduzir uma
   * coreografia única com atrasos individuais) em vez de observar sua própria
   * entrada na viewport.
   */
  active?: boolean;
  'aria-hidden'?: boolean;
}

/**
 * Substitui o padrão manual (CSSProperties + IntersectionObserver) repetido
 * em várias seções por uma única primitiva Motion. Sem `active`, cada
 * instância observa sua própria entrada na viewport; com `active`, ela segue
 * uma visibilidade compartilhada vinda do componente pai.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  amount = 0.2,
  once = true,
  as = 'div',
  active,
  'aria-hidden': ariaHidden,
}: RevealProps) {
  const offset = directionOffset[direction];
  const MotionTag = tagMap[as] as ElementType;
  const hidden = { opacity: 0, x: offset.x ?? 0, y: offset.y ?? 0 };
  const visible = { opacity: 1, x: 0, y: 0 };
  const transition = { duration, delay, ease: EASE_OUT };

  if (active === undefined) {
    return (
      <MotionTag
        className={className}
        aria-hidden={ariaHidden}
        initial={hidden}
        whileInView={visible}
        viewport={{ once, amount }}
        transition={transition}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      aria-hidden={ariaHidden}
      initial={hidden}
      animate={active ? visible : hidden}
      transition={transition}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  once?: boolean;
  as?: Tag;
  /** Quando informado, substitui o gatilho de scroll por um estado controlado (ex.: acordeão aberto/fechado). */
  active?: boolean;
}

/**
 * Container que orquestra a entrada escalonada dos `RevealItem` filhos.
 * Reaproveitado tanto para listas reveladas ao entrar na viewport quanto
 * para grades de cartão que aparecem em sequência ao abrir um acordeão.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  amount = 0.2,
  once = true,
  as = 'div',
  active,
}: RevealGroupProps) {
  const MotionTag = tagMap[as] as ElementType;
  const variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };

  if (active === undefined) {
    return (
      <MotionTag
        className={className}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag className={className} variants={variants} initial="hidden" animate={active ? 'visible' : 'hidden'}>
      {children}
    </MotionTag>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  duration?: number;
  as?: Tag;
}

/** Item individual de um `RevealGroup` — herda a visibilidade do grupo via contexto do Motion. */
export function RevealItem({ children, className, direction = 'up', duration = 0.45, as = 'div' }: RevealItemProps) {
  const offset = directionOffset[direction];
  const MotionTag = tagMap[as] as ElementType;
  const variants = {
    hidden: { opacity: 0, x: offset.x ?? 0, y: offset.y ?? 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration, ease: EASE_OUT } },
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
