import { useEffect, useState } from 'react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollLock } from '../../hooks/useScrollLock';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionIds = siteContent.nav.map((link) => link.href.replace('#', ''));
  const activeId = useActiveSection(sectionIds);

  useScrollLock(isMenuOpen);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [activeId]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream/90 shadow-warm-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <a
          href="#inicio"
          className="font-heading text-xl tracking-wide text-brown-dark sm:text-2xl"
        >
          {siteContent.brand.name}
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {siteContent.nav.map((link) => {
            const isActive = activeId === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive ? 'text-gold-deep' : 'text-brown-dark hover:text-gold'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href={siteContent.headerCta.href} variant="primary" className="px-6 py-3 text-xs">
            {siteContent.headerCta.label}
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-brown-dark lg:hidden"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {isMenuOpen ? (
              <path
                d="M2 2l16 16M18 2L2 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 5h16M2 10h16M2 15h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </Container>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gold/20 bg-cream px-5 pb-8 pt-4 shadow-warm lg:hidden"
        >
          <nav aria-label="Navegação mobile" className="flex flex-col gap-1">
            {siteContent.nav.map((link) => {
              const isActive = activeId === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive ? 'bg-gold/10 text-gold-deep' : 'text-brown-dark hover:bg-gold/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <Button href={siteContent.headerCta.href} variant="primary" className="mt-4 w-full">
            {siteContent.headerCta.label}
          </Button>
        </div>
      )}
    </header>
  );
}
