import { useRef, useState } from 'react';
import type { FormEvent, RefObject } from 'react';
import { siteContent } from '../../data/siteContent';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useSelection } from '../../context/SelectionContext';
import { buildSchedulingMessage, buildWhatsAppUrl } from '../../utils/whatsapp';
import { getLocalTodayISO, getLocalNowTime, isPastDate, isPastTimeToday } from '../../utils/date';

interface FormState {
  name: string;
  phone: string;
  professional: string;
  date: string;
  time: string;
  notes: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: '',
  phone: '',
  professional: siteContent.brand.professional,
  date: '',
  time: '',
  notes: '',
};

export function Scheduling() {
  const { items } = useSelection();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const fieldRefs: Record<string, RefObject<HTMLInputElement | null>> = {
    name: nameRef,
    phone: phoneRef,
    date: dateRef,
    time: timeRef,
  };

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate(): FieldErrors {
    const nextErrors: FieldErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Informe seu nome.';
    if (!form.phone.trim()) nextErrors.phone = 'Informe seu telefone.';

    if (!form.date) {
      nextErrors.date = 'Selecione uma data.';
    } else if (isPastDate(form.date)) {
      nextErrors.date = 'A data não pode ser anterior a hoje.';
    }

    if (!form.time) {
      nextErrors.time = 'Selecione um horário.';
    } else if (form.date && isPastTimeToday(form.date, form.time)) {
      nextErrors.time = 'O horário selecionado já passou para hoje.';
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    const firstErrorField = (Object.keys(nextErrors) as (keyof FormState)[])[0];
    if (firstErrorField) {
      fieldRefs[firstErrorField]?.current?.focus();
      return;
    }

    const message = buildSchedulingMessage({
      name: form.name,
      phone: form.phone,
      treatments: items.map((item) => item.name),
      professional: form.professional,
      date: form.date,
      time: form.time,
      notes: form.notes,
    });

    const whatsappUrl = buildWhatsAppUrl(siteContent.contact.whatsappNumber, message);
    window.open(whatsappUrl, '_blank', 'noreferrer');
    setSubmitted(true);
  }

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

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-brown-dark">Tratamentos selecionados</span>
            <p className="rounded-xl border border-gold/20 bg-cream px-4 py-3 text-sm text-brown/70">
              {items.length === 0
                ? 'Nenhum tratamento selecionado até o momento.'
                : items.map((item) => item.name).join(', ')}
            </p>
          </div>

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

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="scheduling-date" className="text-sm font-medium text-brown-dark">
                Data *
              </label>
              <input
                id="scheduling-date"
                ref={dateRef}
                type="date"
                min={getLocalTodayISO()}
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
              <label htmlFor="scheduling-time" className="text-sm font-medium text-brown-dark">
                Horário *
              </label>
              <input
                id="scheduling-time"
                ref={timeRef}
                type="time"
                min={form.date === getLocalTodayISO() ? getLocalNowTime() : undefined}
                value={form.time}
                onChange={(event) => updateField('time', event.target.value)}
                aria-invalid={!!errors.time}
                aria-describedby={errors.time ? 'scheduling-time-error' : undefined}
                className="rounded-xl border border-gold/30 bg-cream px-4 py-3 text-sm text-brown-dark focus:border-gold"
              />
              {errors.time && (
                <p id="scheduling-time-error" className="text-xs text-red-700">
                  {errors.time}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="scheduling-notes" className="text-sm font-medium text-brown-dark">
              Observações
            </label>
            <textarea
              id="scheduling-notes"
              value={form.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              rows={3}
              className="rounded-xl border border-gold/30 bg-cream px-4 py-3 text-sm text-brown-dark focus:border-gold"
            />
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
    </section>
  );
}
