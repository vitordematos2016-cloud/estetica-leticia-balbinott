import type { Treatment } from '../../types/siteContent';
import { Modal } from '../ui/Modal';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';
import { BeforeAfterGallery } from './BeforeAfterGallery';
import { useSelection } from '../../context/SelectionContext';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { getTreatmentCategoryName } from '../../utils/treatments';
import { siteContent } from '../../data/siteContent';

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
}

export function TreatmentModal({ treatment, onClose }: TreatmentModalProps) {
  const { addItem, removeItem, isSelected } = useSelection();

  if (!treatment) return null;

  const alreadySelected = isSelected(treatment.id);
  const categoryName = getTreatmentCategoryName(treatment.categoryId);
  const specialOffer = treatment.specialOffer?.active ? treatment.specialOffer : undefined;
  const whatsappUrl = buildWhatsAppUrl(
    siteContent.contact.whatsappNumber,
    treatment.whatsappMessage || siteContent.whatsappDefaultMessage,
  );

  return (
    <Modal isOpen={!!treatment} onClose={onClose} title={treatment.name}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          {categoryName && (
            <span className="w-fit text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {categoryName}
            </span>
          )}
          {specialOffer && (
            <span className="rounded-full border border-gold/50 bg-beige/40 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-brown-dark">
              Condição especial
            </span>
          )}
        </div>

        {treatment.image ? (
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold/30">
            <img
              src={treatment.image}
              alt={treatment.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <PlaceholderMedia label={treatment.name} description="Imagem em preparação" ratio="landscape" />
        )}

        <p className="text-sm leading-relaxed text-brown/80">
          {treatment.description ?? 'Descrição completa em atualização.'}
        </p>

        {specialOffer && (
          <div className="rounded-2xl border border-gold/30 bg-beige/25 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {specialOffer.title || 'Condição especial'}
            </p>
            {specialOffer.description && (
              <p className="mt-1.5 text-sm leading-relaxed text-brown-dark">
                {specialOffer.description}
              </p>
            )}
            <p className="mt-1.5 text-xs font-medium text-gold">
              {specialOffer.validUntil
                ? `Válida até ${specialOffer.validUntil}`
                : 'Condição disponível por tempo limitado'}
            </p>
            {specialOffer.promoPrice && (
              <p className="mt-1.5 text-sm text-brown-dark">
                {specialOffer.originalPrice && (
                  <span className="mr-2 text-brown/50 line-through">{specialOffer.originalPrice}</span>
                )}
                <span className="font-medium">{specialOffer.promoPrice}</span>
              </p>
            )}
          </div>
        )}

        {treatment.benefits && treatment.benefits.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
              Benefícios
            </p>
            <ul className="flex flex-col gap-1.5">
              {treatment.benefits.map((benefit) => (
                <li key={benefit} className="text-sm text-brown/75">
                  • {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {treatment.indication && (
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
              Para quem é indicado
            </p>
            <p className="text-sm leading-relaxed text-brown/75">{treatment.indication}</p>
          </div>
        )}

        {treatment.howItWorks && (
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
              Como funciona
            </p>
            <p className="text-sm leading-relaxed text-brown/75">{treatment.howItWorks}</p>
          </div>
        )}

        {(treatment.duration || treatment.sessions || treatment.price || treatment.professional) && (
          <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-cream-light/50 p-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-brown/50">Duração</dt>
              <dd className="text-brown-dark">{treatment.duration || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-brown/50">Sessões</dt>
              <dd className="text-brown-dark">{treatment.sessions || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-brown/50">Investimento</dt>
              <dd className="text-brown-dark">{treatment.price || 'Sob consulta'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-brown/50">Profissional</dt>
              <dd className="text-brown-dark">{treatment.professional || '—'}</dd>
            </div>
          </dl>
        )}

        {((treatment.careBefore?.length ?? 0) > 0 || (treatment.careAfter?.length ?? 0) > 0) && (
          <div className="grid gap-4 sm:grid-cols-2">
            {treatment.careBefore && treatment.careBefore.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
                  Cuidados antes
                </p>
                <ul className="flex flex-col gap-1.5">
                  {treatment.careBefore.map((item) => (
                    <li key={item} className="text-sm text-brown/75">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {treatment.careAfter && treatment.careAfter.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
                  Cuidados depois
                </p>
                <ul className="flex flex-col gap-1.5">
                  {treatment.careAfter.map((item) => (
                    <li key={item} className="text-sm text-brown/75">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {treatment.contraindications && treatment.contraindications.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
              Contraindicações gerais
            </p>
            <ul className="flex flex-col gap-1.5">
              {treatment.contraindications.map((item) => (
                <li key={item} className="text-sm text-brown/75">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {treatment.beforeAfter && <BeforeAfterGallery beforeAfter={treatment.beforeAfter} />}

        <p className="text-xs text-brown/50">Cada atendimento é avaliado individualmente.</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() =>
              addItem({
                id: treatment.id,
                type: 'treatment',
                name: treatment.name,
                category: categoryName,
              })
            }
            className={`flex-1 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
              alreadySelected
                ? 'bg-gold/20 text-brown-dark'
                : 'border border-gold/50 text-brown-dark hover:bg-gold/10'
            }`}
          >
            {alreadySelected ? 'Adicionado ✓' : 'Adicionar à seleção'}
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full bg-brown-dark px-6 py-3 text-center text-sm font-medium text-cream transition-colors hover:bg-brown"
          >
            Perguntar no WhatsApp
          </a>
        </div>
        {alreadySelected && (
          <button
            type="button"
            onClick={() => removeItem(treatment.id)}
            className="self-center text-xs font-medium text-brown/50 underline decoration-gold/40 underline-offset-2 hover:text-gold"
          >
            Remover da seleção
          </button>
        )}
      </div>
    </Modal>
  );
}
