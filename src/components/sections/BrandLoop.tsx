import { siteContent } from '../../data/siteContent';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function BrandLoop() {
  const { brandLoop } = siteContent;
  const prefersReducedMotion = useReducedMotion();

  const track = (keyPrefix: string) => (
    <div className="flex shrink-0 items-center" aria-hidden={keyPrefix === 'b'}>
      {brandLoop.items.map((item, index) => (
        <span key={`${keyPrefix}-${item}`} className="flex items-center">
          <span className="whitespace-nowrap px-5 text-[0.7rem] uppercase tracking-[0.3em] text-brown/75 sm:text-xs">
            {item}
          </span>
          {index < brandLoop.items.length - 1 && (
            <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-gold/40" />
          )}
        </span>
      ))}
      <span aria-hidden="true" className="mx-5 h-1 w-1 shrink-0 rounded-full bg-gold/40" />
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
          {track('a')}
          {track('b')}
        </div>
      )}
    </section>
  );
}
