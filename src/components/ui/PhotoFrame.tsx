interface PhotoFrameProps {
  src: string;
  alt: string;
  rounded?: string;
  className?: string;
  priority?: boolean;
}

/**
 * aspect-[941/1672] é a proporção nativa exata das fotos reais fornecidas
 * pela cliente — usar essa razão garante que object-cover nunca precise
 * cortar a imagem, em nenhuma largura de tela.
 */
export function PhotoFrame({
  src,
  alt,
  rounded = 'rounded-[2rem]',
  className = '',
  priority = false,
}: PhotoFrameProps) {
  return (
    <div
      className={`aspect-[941/1672] overflow-hidden border border-gold/45 shadow-warm-sm ${rounded} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
}
