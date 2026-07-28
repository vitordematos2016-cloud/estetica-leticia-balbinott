import { motion } from 'motion/react';
import type { Treatment } from '../../types/siteContent';
import { Modal } from '../ui/Modal';
import { PlaceholderMedia } from '../ui/PlaceholderMedia';
import { BeforeAfterGallery } from './BeforeAfterGallery';
import { useSelection } from '../../context/SelectionContext';
import { buildTreatmentInquiryMessage, buildWhatsAppUrl } from '../../utils/whatsapp';
import { getTreatmentCategoryName } from '../../utils/treatments';
import { siteContent } from '../../data/siteContent';
import { useHeldValue } from '../../hooks/useHeldValue';
import { EASE_OUT } from '../motion/variants';

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
}

export function TreatmentModal({ treatment, onClose }: TreatmentModalProps) {
  const { addItem, removeItem, isSelected } = useSelection();
  // Mantém os dados do último tratamento durante a animação de saída do
  // Modal — `treatment` já volta a `null` no instante do fechamento.
  const displayTreatment = useHeldValue(treatment);

  if (!displayTreatment) return null;

  const treatmentData = displayTreatment;
  const alreadySelected = isSelected(treatmentData.id);
  const categoryName = getTreatmentCategoryName(treatmentData.categoryId);
  const specialOffer = treatmentData.specialOffer?.active ? treatmentData.specialOffer : undefined;
  const whatsappUrl = buildWhatsAppUrl(
    siteContent.contact.whatsappNumber,
    buildTreatmentInquiryMessage(treatmentData.name),
  );

  function handleGoToScheduling() {
    if (!isSelected(treatmentData.id)) {
      addItem({
        id: treatmentData.id,
        type: 'treatment',
        name: treatmentData.name,
        category: categoryName,
      });
    }
    onClose();
    document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <Modal isOpen={!!treatment} onClose={onClose} title={treatmentData.name}>
      <div className="flex flex-col gap-5">
        {treatmentData.subtitle && (
          <p className="-mt-3 text-sm font-medium text-brown/70">{treatmentData.subtitle}</p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {categoryName && (
            <span className="w-fit text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
              {categoryName}
            </span>
          )}
          {specialOffer && (
            <span className="rounded-full border border-gold/50 bg-beige/40 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-brown-dark">
              Condição especial
            </span>
          )}
        </div>

        {treatmentData.image ? (
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold/30">
            <img
              src={treatmentData.image}
              alt={treatmentData.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <PlaceholderMedia label={treatmentData.name} description="Imagem em preparação" ratio="landscape" />
        )}

        <p className="text-sm leading-relaxed text-brown/80">
          {treatmentData.description ?? 'Descrição completa em atualização.'}
        </p>

        {specialOffer && (
          <div className="rounded-2xl border border-gold/30 bg-beige/25 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-deep">
              {specialOffer.title || 'Condição especial'}
            </p>
            {specialOffer.description && (
              <p className="mt-1.5 text-sm leading-relaxed text-brown-dark">
                {specialOffer.description}
              </p>
            )}
            <p className="mt-1.5 text-xs font-medium text-gold-deep">
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

        {treatmentData.benefits && treatmentData.benefits.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
              Benefícios
            </p>
            <ul className="flex flex-col gap-1.5">
              {treatmentData.benefits.map((benefit) => (
                <li key={benefit} className="text-sm text-brown/75">
                  • {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {treatmentData.indication && (
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
              Para quem é indicado
            </p>
            <p className="text-sm leading-relaxed text-brown/75">{treatmentData.indication}</p>
          </div>
        )}

        {treatmentData.howItWorks && (
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
              Como funciona
            </p>
            <p className="text-sm leading-relaxed text-brown/75">{treatmentData.howItWorks}</p>
          </div>
        )}

        {(treatmentData.duration || treatmentData.sessions || treatmentData.price || treatmentData.professional) && (
          <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-cream-light/50 p-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-brown/50">Duração</dt>
              <dd className="text-brown-dark">{treatmentData.duration || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-brown/50">Sessões</dt>
              <dd className="text-brown-dark">{treatmentData.sessions || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-brown/50">Investimento</dt>
              <dd className="text-brown-dark">{treatmentData.price || 'Sob consulta'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-brown/50">Profissional</dt>
              <dd className="text-brown-dark">{treatmentData.professional || '—'}</dd>
            </div>
          </dl>
        )}

        {((treatmentData.careBefore?.length ?? 0) > 0 || (treatmentData.careAfter?.length ?? 0) > 0) && (
          <div className="grid gap-4 sm:grid-cols-2">
            {treatmentData.careBefore && treatmentData.careBefore.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
                  Cuidados antes
                </p>
                <ul className="flex flex-col gap-1.5">
                  {treatmentData.careBefore.map((item) => (
                    <li key={item} className="text-sm text-brown/75">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {treatmentData.careAfter && treatmentData.careAfter.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
                  Cuidados depois
                </p>
                <ul className="flex flex-col gap-1.5">
                  {treatmentData.careAfter.map((item) => (
                    <li key={item} className="text-sm text-brown/75">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {treatmentData.contraindications && treatmentData.contraindications.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-brown/50">
              Contraindicações gerais
            </p>
            <ul className="flex flex-col gap-1.5">
              {treatmentData.contraindications.map((item) => (
                <li key={item} className="text-sm text-brown/75">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {treatmentData.beforeAfter && <BeforeAfterGallery beforeAfter={treatmentData.beforeAfter} />}

        <p className="text-xs text-brown/50">Cada atendimento é avaliado individualmente.</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <motion.button
            type="button"
            onClick={() =>
              addItem({
                id: treatmentData.id,
                type: 'treatment',
                name: treatmentData.name,
                category: categoryName,
              })
            }
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.975 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className={`flex-1 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
              alreadySelected
                ? 'bg-gold/20 text-brown-dark'
                : 'border border-gold/50 text-brown-dark hover:bg-gold/10 active:bg-gold/15'
            }`}
          >
            {alreadySelected ? 'Adicionado ✓' : 'Adicionar à seleção'}
          </motion.button>
          <motion.button
            type="button"
            onClick={handleGoToScheduling}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.975 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="flex-1 rounded-full bg-brown-dark px-6 py-3 text-center text-sm font-medium text-cream shadow-warm-sm transition-all hover:bg-brown hover:shadow-warm"
          >
            Ir para agendamento
          </motion.button>
        </div>
        {alreadySelected && (
          <button
            type="button"
            onClick={() => removeItem(treatmentData.id)}
            className="self-center text-xs font-medium text-brown/50 underline decoration-gold/40 underline-offset-2 transition-colors hover:text-gold active:text-gold"
          >
            Remover da seleção
          </button>
        )}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="self-center text-xs font-medium text-brown/50 underline decoration-gold/40 underline-offset-2 transition-colors hover:text-gold active:text-gold"
        >
          Ainda tem alguma dúvida? Falar no WhatsApp
        </a>
      </div>
    </Modal>
  );
}
