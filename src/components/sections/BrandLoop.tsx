import { siteContent } from '../../data/siteContent';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function BrandLoop() {
  const { brandLoop } = siteContent;
  const prefersReducedMotion = useReducedMotion();

  const track = (keyPrefix: string) => (
    <div className="flex shrink-0 items-center" aria-hidden={keyPrefix === 'b'}>
      {brandLoop.items.map((item, index) => (
        <span key={`${keyPrefix}-${item}`} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-2xl uppercase tracking-[0.12em] text-cream-light sm:text-3xl">
            {item}
          </span>
          {index < brandLoop.items.length - 1 && (
            <span className="text-gold" aria-hidden="true">
              •
            </span>
          )}
        </span>
      ))}
      <span className="text-gold px-6" aria-hidden="true">
        •
      </span>
    </div>
  );

  return (
    <section
      aria-label={brandLoop.ariaLabel}
      className="overflow-hidden border-y border-gold/20 bg-brown-dark py-6"
    >
      {prefersReducedMotion ? (
        <p className="px-6 text-center text-lg uppercase tracking-[0.12em] text-cream-light">
          {brandLoop.items.join('  •  ')}
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
