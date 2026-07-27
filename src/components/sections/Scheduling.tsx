import { useEffect, useRef, useState } from 'react';
import type { FormEvent, RefObject } from 'react';
import { motion, useInView } from 'motion/react';
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
import { Reveal } from '../motion/reveal';
import { EASE_OUT } from '../motion/variants';

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: 'manha', label: 'Manhã' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'noite', label: 'Noite' },
];

/** Selo numerado discreto que abre cada agrupamento visual do formulário —
 * alternativa ao Ornament (evitar repetir o medalhão nesta seção). */
function StepLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 font-heading text-xs text-gold-deep"
      >
        {number}
      </span>
      <span className="text-xs font-medium uppercase tracking-[0.24em] text-gold-deep">{label}</span>
    </div>
  );
}

function GroupDivider() {
  return (
    <span
      aria-hidden="true"
      className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
    />
  );
}

function fieldClassName(hasError: boolean) {
  return `rounded-xl border bg-cream px-4 py-3 text-sm text-brown-dark shadow-[inset_0_1px_2px_rgba(91,64,51,0.05)] transition-all duration-200 focus:ring-2 ${
    hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
      : 'border-gold/30 focus:border-gold focus:ring-gold/15'
  }`;
}

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
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
    <section id="agendamento" ref={sectionRef} className="relative overflow-hidden py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(177,138,85,0.06),transparent_55%)]"
      />

      <Container className="relative flex flex-col gap-10 lg:items-center lg:gap-12">
        <Reveal active={isInView} direction="up" delay={0} className="w-full lg:max-w-3xl">
          <SectionHeading
            align="left"
            eyebrow="Agendamento"
            title="Vamos agendar sua avaliação"
            text="Preencha seus dados abaixo. Ao confirmar, você será direcionada ao WhatsApp com sua solicitação já organizada."
          />
        </Reveal>

        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-5 rounded-[2rem_2rem_2rem_0.75rem] border border-gold/25 bg-cream-light/30 p-7 shadow-warm-sm sm:p-9 lg:max-w-3xl"
        >
          <Reveal active={isInView} direction="up" delay={0.08} className="flex flex-col gap-5">
            <StepLabel number="01" label="Seus dados" />

            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="flex flex-1 flex-col gap-1.5">
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
                  className={fieldClassName(!!errors.name)}
                />
                {errors.name && (
                  <p id="scheduling-name-error" className="text-xs text-red-700">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-1.5">
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
                  className={fieldClassName(!!errors.phone)}
                />
                {errors.phone && (
                  <p id="scheduling-phone-error" className="text-xs text-red-700">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          <GroupDivider />

          <Reveal active={isInView} direction="up" delay={0.14} className="flex flex-col gap-4">
            <StepLabel number="02" label="Tratamentos escolhidos" />
            <TreatmentPicker triggerRef={treatmentsTriggerRef} error={errors.treatments} />
          </Reveal>

          <GroupDivider />

          <Reveal active={isInView} direction="up" delay={0.2} className="flex flex-col gap-5">
            <StepLabel number="03" label="Preferência de agendamento" />

            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-1 flex-col gap-1.5">
                <label htmlFor="scheduling-professional" className="text-sm font-medium text-brown-dark">
                  Profissional
                </label>
                <select
                  id="scheduling-professional"
                  value={form.professional}
                  onChange={(event) => updateField('professional', event.target.value)}
                  className={fieldClassName(false)}
                >
                  <option value={siteContent.brand.professional}>{siteContent.brand.professional}</option>
                </select>
              </div>

              <div className="flex flex-1 flex-col gap-1.5">
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
                  className={fieldClassName(!!errors.date)}
                />
                {errors.date && (
                  <p id="scheduling-date-error" className="text-xs text-red-700">
                    {errors.date}
                  </p>
                )}
              </div>
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
                      className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-full border px-3 py-2.5 text-xs font-medium uppercase tracking-wide transition-all duration-200 ${
                        !available
                          ? 'cursor-not-allowed border-gold/15 bg-cream-light/40 text-brown/30 opacity-60'
                          : form.period === option.value
                            ? 'border-brown-dark bg-brown-dark text-cream shadow-warm-sm'
                            : 'border-gold/30 bg-cream text-brown-dark hover:border-gold hover:bg-gold/5'
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
                className={fieldClassName(false)}
              />
            </div>
          </Reveal>

          <GroupDivider />

          <Reveal active={isInView} direction="up" delay={0.26} className="flex flex-col gap-4">
            <StepLabel number="04" label="Confirmação" />

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
          </Reveal>

          <Reveal active={isInView} direction="up" delay={0.32} className="flex flex-col gap-3 lg:items-start">
            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="w-full rounded-full bg-brown-dark px-7 py-3.5 text-sm font-medium text-cream shadow-warm-sm transition-shadow duration-300 hover:bg-brown hover:shadow-warm lg:w-auto lg:min-w-[16rem]"
            >
              Confirmar e enviar pelo WhatsApp
            </motion.button>

            {submitted && (
              <p role="status" className="text-sm text-brown/70">
                Sua solicitação foi aberta no WhatsApp. Se a janela não abriu, verifique o bloqueador
                de pop-ups do navegador.
              </p>
            )}
          </Reveal>
        </form>
      </Container>

      <LegalPolicyModal
        policy={showPrivacyPolicy ? siteContent.legal.privacyPolicy : null}
        onClose={() => setShowPrivacyPolicy(false)}
      />
    </section>
  );
}
