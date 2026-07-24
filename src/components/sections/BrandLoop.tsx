import { siteContent } from '../../data/siteContent';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function BrandLoop() {
  const { brandLoop } = siteContent;
  const prefersReducedMotion = useReducedMotion();

  const track = (keyPrefix: string, ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {brandLoop.items.map((item) => (
        <span key={`${keyPrefix}-${item}`} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap px-5 text-[0.7rem] uppercase tracking-[0.3em] text-brown/75 sm:text-xs">
            {item}
          </span>
          <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-gold/45" />
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label={brandLoop.ariaLabel}
      className="overflow-hidden border-y border-gold/15 bg-beige/30 py-4"
    >
      {prefersReducedMotion ? (
        <p className="px-6 text-center text-xs uppercase tracking-[0.3em] text-brown/75">
          {brandLoop.items.join('   •   ')}
        </p>
      ) : (
        <div className="flex w-max marquee-track">
          {track('a', false)}
          {track('b', true)}
        </div>
      )}
    </section>
  );
}
