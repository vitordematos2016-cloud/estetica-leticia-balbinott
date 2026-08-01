interface PhotoFrameProps {
  src: string;
  alt: string;
  rounded?: string;
  className?: string;
  priority?: boolean;
  aspectClassName?: string;
  imgClassName?: string;
}

/**
 * aspect-[941/1672] é a proporção nativa exata das fotos reais fornecidas
 * pela cliente — usar essa razão garante que object-cover nunca precise
 * cortar a imagem, em nenhuma largura de tela. `aspectClassName` permite
 * substituir essa razão quando o container pai já define sua própria
 * largura/altura. `imgClassName` permite trocar `object-cover` por
 * `object-contain` quando a exigência é mostrar a foto inteira, sem corte
 * nenhum (ex.: bloco de mídia da Localização).
 */
export function PhotoFrame({
  src,
  alt,
  rounded = 'rounded-[2rem]',
  className = '',
  priority = false,
  aspectClassName = 'aspect-[941/1672]',
  imgClassName = 'h-full w-full object-cover object-center',
}: PhotoFrameProps) {
  return (
    <div
      className={`${aspectClassName} overflow-hidden border border-gold/45 shadow-warm-sm ${rounded} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={941}
        height={1672}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={imgClassName}
      />
    </div>
  );
}
