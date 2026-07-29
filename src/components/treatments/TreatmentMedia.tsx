import type { TreatmentMedia as TreatmentMediaData } from '../../types/siteContent';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';

interface TreatmentMediaProps {
  media?: TreatmentMediaData;
  name: string;
}

const FRAME_CLASSES =
  'relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] border border-gold/30 bg-gradient-to-br from-cream-light via-cream to-beige/50 shadow-warm-sm sm:aspect-video';

/**
 * Área de mídia do modal de detalhes -- imagem, vídeo ou, na ausência de
 * ambos, o mesmo placeholder elegante já usado nos cards (identidade
 * bege/dourada, sem caminho de arquivo nem espaço em branco vazio). Vídeo
 * nunca inicia sozinho nem com som (sem `autoPlay`, `muted` como reforço) e
 * usa os próprios controles nativos; imagem usa `object-cover` preenchendo
 * o quadro por completo, como pedido para a mídia futura.
 */
export function TreatmentMedia({ media, name }: TreatmentMediaProps) {
  if (!media) {
    return (
      <PlaceholderMedia label={name} description="Conteúdo visual em preparação" ratio="media" />
    );
  }

  if (media.type === 'video') {
    return (
      <div className={FRAME_CLASSES}>
        <video
          src={media.src}
          poster={media.poster}
          controls
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }

  return (
    <div className={FRAME_CLASSES}>
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
