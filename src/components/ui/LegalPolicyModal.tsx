import type { LegalPolicyContent } from '../../types/siteContent';
import { Modal } from './Modal';

interface LegalPolicyModalProps {
  policy: LegalPolicyContent | null;
  onClose: () => void;
}

export function LegalPolicyModal({ policy, onClose }: LegalPolicyModalProps) {
  if (!policy) return null;

  return (
    <Modal isOpen={!!policy} onClose={onClose} title={policy.title}>
      <div className="flex flex-col gap-5">
        {policy.reviewNotice && (
          <p className="rounded-xl border border-dashed border-gold/40 bg-cream-light/40 px-4 py-3 text-xs text-brown/60">
            {policy.reviewNotice}
          </p>
        )}

        {policy.sections.map((section) => (
          <div key={section.heading}>
            <h4 className="mb-1.5 text-sm font-medium text-brown-dark">{section.heading}</h4>
            <p className="text-sm leading-relaxed text-brown/75">{section.text}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}
