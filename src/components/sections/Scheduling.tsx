import { useEffect, useRef, useState } from 'react';
import type { FormEvent, RefObject } from 'react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { LegalPolicyModal } from '../ui/LegalPolicyModal';
import { TreatmentPicker } from '../scheduling/TreatmentPicker';
import { useSelection } from '../../context/SelectionContext';
import { buildSchedulingMessage, buildWhatsAppUrl } from '../../utils/whatsapp';
import { getClinicNow, getClinicTodayISO, isPastDate, isSunday, formatDateBR } from '../../utils/date';
import type { ClinicNow } from '../../utils/date';
import { isDaySchedulable, isPeriodAvailable, getPeriodUnavailableReason } from '../../utils/period';
import type { Period } from '../../utils/period';

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: 'manha', label: 'Manhã' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'noite', label: 'Noite' },
];

interface FormState {
  name: string;
  phone: string;
  professional: string;
  date: string;
  period: Period | '';
  notes: string;
  consent: boolean;
}

type FieldErrors = Partial<Record<keyof FormState | 'treatments', string>>;

const initialState: FormState = {
  name: '',
  phone: '',
  professional: siteContent.brand.professional,
  date: '',
  period: '',
  notes: '',
  consent: false,
};

export function Scheduling() {
  const { items } = useSelection();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [clinicNow, setClinicNow] = useState<ClinicNow>(() => getClinicNow());
  const [autoAdjustedNotice, setAutoAdjustedNotice] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const treatmentsTriggerRef = useRef<HTMLButtonElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLButtonElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const fieldRefs: Record<string, RefObject<HTMLElement | null>> = {
    name: nameRef,
    phone: phoneRef,
    treatments: treatmentsTriggerRef,
    date: dateRef,
    period: periodRef,
    consent: consentRef,
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClinicNow(getClinicNow());
    }, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!form.date || !form.period) return;
    if (!isPeriodAvailable(form.period, form.date, clinicNow)) {
      setForm((current) => (current.period ? { ...current, period: '' } : current));
      setAutoAdjustedNotice(
        'O período anteriormente selecionado já não está disponível para hoje. Escolha outro período ou uma nova data.',
      );
    }
  }, [clinicNow, form.date, form.period]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (field === 'period' || field === 'date') {
      setAutoAdjustedNotice(null);
    }
  }

  function validate(): FieldErrors {
    const nextErrors: FieldErrors = {};
    const freshClinicNow = getClinicNow();

    if (!form.name.trim()) nextErrors.name = 'Informe seu nome.';
    if (!form.phone.trim()) nextErrors.phone = 'Informe seu telefone.';

    if (items.length === 0) {
      nextErrors.treatments = 'Selecione pelo menos um tratamento.';
    }

    if (!form.date) {
      nextErrors.date = 'Selecione uma data.';
    } else if (isPastDate(form.date)) {
      nextErrors.date = 'A data não pode ser anterior a hoje.';
    } else if (isSunday(form.date)) {
      nextErrors.date = 'Não atendemos aos domingos. Selecione outra data.';
    }

    if (!nextErrors.date) {
      if (!form.period) {
        nextErrors.period = 'Selecione um período de preferência.';
      } else if (!isPeriodAvailable(form.period, form.date, freshClinicNow)) {
        nextErrors.period =
          'Esse período já foi encerrado para a data de hoje. Selecione outro período ou escolha uma nova data.';
      }
    }

    if (!form.consent) nextErrors.consent = siteContent.schedulingConsent.error;

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    const firstErrorField = (Object.keys(nextErrors) as (keyof typeof fieldRefs)[])[0];
    if (firstErrorField) {
      fieldRefs[firstErrorField]?.current?.focus();
      return;
    }

    const periodLabel = PERIOD_OPTIONS.find((option) => option.value === form.period)?.label;

    const message = buildSchedulingMessage({
      name: form.name,
      phone: form.phone,
      treatments: items.map((item) => item.name),
      date: formatDateBR(form.date),
      period: periodLabel?.toUpperCase(),
      notes: form.notes,
    });

    const whatsappUrl = buildWhatsAppUrl(siteContent.contact.whatsappNumber, message);
    window.open(whatsappUrl, '_blank', 'noreferrer');
    setSubmitted(true);
  }

  const showDayClosedNotice =
    !!form.date && !isSunday(form.date) && form.date === clinicNow.date && !isDaySchedulable(form.date, clinicNow);

  return (
    <section id="agendamento" className="py-24 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow="Agendamento"
          title="Vamos agendar sua avaliação"
          text="Preencha seus dados abaixo. Ao confirmar, você será direcionada ao WhatsApp com sua solicitação já organizada."
        />

        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-[2rem] border border-gold/25 bg-cream-light/30 p-7 sm:p-9"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="scheduling-name" className="text-sm font-medium text-brown-dark">
              Nome *
            </label>
            <input
              id="scheduling-name"
              ref={nameRef}
              type="text"
              autoComplete="off"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'scheduling-name-error' : undefined}
              className="rounded-xl border border-gold/30 bg-cream px-4 py-3 text-sm text-brown-dark focus:border-gold"
            />
            {errors.name && (
              <p id="scheduling-name-error" className="text-xs text-red-700">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="scheduling-phone" className="text-sm font-medium text-brown-dark">
              Telefone *
            </label>
            <input
              id="scheduling-phone"
              ref={phoneRef}
              type="tel"
              autoComplete="off"
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              placeholder="(45) 90000-0000"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'scheduling-phone-error' : undefined}
              className="rounded-xl border border-gold/30 bg-cream px-4 py-3 text-sm text-brown-dark focus:border-gold"
            />
            {errors.phone && (
              <p id="scheduling-phone-error" className="text-xs text-red-700">
                {errors.phone}
              </p>
            )}
          </div>

          <TreatmentPicker triggerRef={treatmentsTriggerRef} error={errors.treatments} />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="scheduling-professional" className="text-sm font-medium text-brown-dark">
              Profissional
            </label>
            <select
              id="scheduling-professional"
              value={form.professional}
              onChange={(event) => updateField('professional', event.target.value)}
              className="rounded-xl border border-gold/30 bg-cream px-4 py-3 text-sm text-brown-dark focus:border-gold"
            >
              <option value={siteContent.brand.professional}>{siteContent.brand.professional}</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="scheduling-date" className="text-sm font-medium text-brown-dark">
              Data *
            </label>
            <input
              id="scheduling-date"
              ref={dateRef}
              type="date"
              autoComplete="off"
              min={getClinicTodayISO()}
              value={form.date}
              onChange={(event) => updateField('date', event.target.value)}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? 'scheduling-date-error' : undefined}
              className="rounded-xl border border-gold/30 bg-cream px-4 py-3 text-sm text-brown-dark focus:border-gold"
            />
            {errors.date && (
              <p id="scheduling-date-error" className="text-xs text-red-700">
                {errors.date}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-brown-dark">Período de preferência *</span>
            <div className="grid grid-cols-3 gap-2.5" role="group" aria-label="Período de preferência">
              {PERIOD_OPTIONS.map((option, index) => {
                const available = form.date ? isPeriodAvailable(option.value, form.date, clinicNow) : true;
                const reason = form.date ? getPeriodUnavailableReason(option.value, form.date, clinicNow) : undefined;

                return (
                  <button
                    key={option.value}
                    ref={index === 0 ? periodRef : undefined}
                    type="button"
                    disabled={!available}
                    aria-disabled={!available}
                    onClick={() => updateField('period', option.value)}
                    aria-pressed={form.period === option.value}
                    className={`flex flex-col items-center gap-0.5 rounded-full border px-3 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                      !available
                        ? 'cursor-not-allowed border-gold/15 bg-cream-light/40 text-brown/30'
                        : form.period === option.value
                          ? 'border-gold bg-gold/15 text-brown-dark'
                          : 'border-gold/30 text-brown/60 hover:border-gold'
                    }`}
                  >
                    <span>{option.label}</span>
                    {reason && (
                      <span className="text-center text-[10px] font-normal normal-case tracking-normal text-brown/40">
                        {reason}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {errors.period && <p className="text-xs text-red-700">{errors.period}</p>}
            {autoAdjustedNotice && !errors.period && (
              <p className="text-xs text-amber-700">{autoAdjustedNotice}</p>
            )}

            {showDayClosedNotice && (
              <p className="rounded-xl bg-cream-light/60 px-3.5 py-3 text-xs font-medium text-brown-dark">
                O horário de atendimento de hoje já foi encerrado. Selecione outra data para solicitar seu
                agendamento.
              </p>
            )}

            <div className="mt-1 flex items-start gap-2 rounded-xl bg-cream-light/50 px-3.5 py-3 text-xs leading-relaxed text-brown/70">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-gold"
              >
                <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7.5 6.8v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="7.5" cy="4.6" r="0.9" fill="currentColor" />
              </svg>
              <div className="flex flex-col gap-1">
                <p>
                  A data e o período representam uma preferência. O agendamento será confirmado pela equipe
                  conforme a disponibilidade da agenda.
                </p>
                <p>Para agendamentos no mesmo dia, períodos que já passaram ficam automaticamente indisponíveis.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="scheduling-notes" className="text-sm font-medium text-brown-dark">
              Observações
            </label>
            <textarea
              id="scheduling-notes"
              autoComplete="off"
              value={form.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              rows={3}
              className="rounded-xl border border-gold/30 bg-cream px-4 py-3 text-sm text-brown-dark focus:border-gold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="flex items-start gap-3 text-sm text-brown-dark">
              <input
                id="scheduling-consent"
                ref={consentRef}
                type="checkbox"
                checked={form.consent}
                onChange={(event) => updateField('consent', event.target.checked)}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? 'scheduling-consent-error' : undefined}
                className="mt-0.5 h-4 w-4 shrink-0 accent-brown-dark"
              />
              <span>
                {siteContent.schedulingConsent.label}{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="underline decoration-gold/50 underline-offset-2 hover:text-gold"
                >
                  Ver Política de Privacidade
                </button>
              </span>
            </label>
            {errors.consent && (
              <p id="scheduling-consent-error" className="text-xs text-red-700">
                {errors.consent}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 rounded-full bg-brown-dark px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-brown"
          >
            Confirmar e enviar pelo WhatsApp
          </button>

          {submitted && (
            <p role="status" className="text-sm text-brown/70">
              Sua solicitação foi aberta no WhatsApp. Se a janela não abriu, verifique o bloqueador
              de pop-ups do navegador.
            </p>
          )}
        </form>
      </Container>

      <LegalPolicyModal
        policy={showPrivacyPolicy ? siteContent.legal.privacyPolicy : null}
        onClose={() => setShowPrivacyPolicy(false)}
      />
    </section>
  );
}
