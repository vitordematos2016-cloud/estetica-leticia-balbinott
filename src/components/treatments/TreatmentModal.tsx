import type { Treatment } from '../../types/siteContent';
import { Modal } from '../ui/Modal';
import { useSelection } from '../../context/SelectionContext';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { getTreatmentCategoryName } from '../../utils/treatments';
import { siteContent } from '../../data/siteContent';

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
}

export function TreatmentModal({ treatment, onClose }: TreatmentModalProps) {
  const { addItem, isSelected } = useSelection();

  if (!treatment) return null;

  const alreadySelected = isSelected(treatment.id);
  const whatsappUrl = buildWhatsAppUrl(
    siteContent.contact.whatsappNumber,
    treatment.whatsappMessage || siteContent.whatsappDefaultMessage,
  );

  return (
    <Modal isOpen={!!treatment} onClose={onClose} title={treatment.name}>
      <div className="flex flex-col gap-5">
        <span className="w-fit text-xs font-medium uppercase tracking-[0.2em] text-gold">
          {getTreatmentCategoryName(treatment.categoryId)}
        </span>
        <p className="text-sm leading-relaxed text-brown/80">{treatment.description}</p>

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

        {treatment.benefits.length > 0 && (
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

        {(treatment.careBefore.length > 0 || treatment.careAfter.length > 0) && (
          <div className="grid gap-4 sm:grid-cols-2">
            {treatment.careBefore.length > 0 && (
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
            {treatment.careAfter.length > 0 && (
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

        {treatment.contraindications.length > 0 && (
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

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={alreadySelected}
            onClick={() => addItem({ id: treatment.id, type: 'treatment', name: treatment.name })}
            className="flex-1 rounded-full border border-gold/50 px-6 py-3 text-sm font-medium text-brown-dark transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {alreadySelected ? 'Já está na sua seleção' : 'Adicionar à Minha Seleção'}
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
      </div>
    </Modal>
  );
}
