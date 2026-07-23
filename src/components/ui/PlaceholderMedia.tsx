interface PlaceholderMediaProps {
  label: string;
  description?: string;
  className?: string;
  ratio?: 'square' | 'portrait' | 'landscape';
}

const ratioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
};

export function PlaceholderMedia({
  label,
  description = 'Imagem oficial em preparação',
  className = '',
  ratio = 'portrait',
}: PlaceholderMediaProps) {
  return (
    <div
      role="img"
      aria-label={`${label}: ${description}`}
      className={`relative flex ${ratioClasses[ratio]} w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[2.5rem] border border-gold/30 bg-gradient-to-br from-cream-light via-cream to-beige/50 text-center shadow-warm-sm ${className}`}
    >
      <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-6 h-40 w-40 rounded-full bg-brown/10 blur-2xl" />
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="text-gold/70"
      >
        <circle cx="20" cy="14" r="7" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M6 34c1.5-8 7-12 14-12s12.5 4 14 12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <p className="px-6 text-sm font-medium uppercase tracking-[0.18em] text-brown/70">{label}</p>
      <p className="px-8 text-xs text-brown/50">{description}</p>
    </div>
  );
}
