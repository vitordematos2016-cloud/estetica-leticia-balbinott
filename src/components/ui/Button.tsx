import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-offset-4 min-h-11';

const variantClasses = {
  primary: 'bg-brown-dark text-cream hover:bg-brown shadow-warm-sm hover:shadow-warm',
  secondary:
    'border border-gold/60 text-brown-dark hover:border-gold hover:bg-gold/10 bg-transparent',
  ghost: 'text-brown-dark hover:text-gold',
} as const;

type Variant = keyof typeof variantClasses;

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ variant = 'primary', children, className = '', ...rest }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
