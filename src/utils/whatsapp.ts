export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}

export interface SchedulingMessageFields {
  name?: string;
  phone?: string;
  treatments?: string[];
  date?: string;
  period?: string;
  notes?: string;
}

function isFilled(value: string | undefined | null): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function formatPhoneDisplay(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, '');

  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return rawPhone.trim();
}

export function buildSchedulingMessage(fields: SchedulingMessageFields): string {
  const treatmentsFormatted =
    fields.treatments && fields.treatments.length > 0
      ? fields.treatments.map((name) => `- ${name}`).join('\n')
      : '';

  const notesBlock = isFilled(fields.notes) ? `\n*Observacoes:*\n${fields.notes.trim()}\n` : '';

  const phoneFormatted = isFilled(fields.phone) ? formatPhoneDisplay(fields.phone.trim()) : '';

  return `*SOLICITACAO DE AGENDAMENTO*
Estetica Leticia Balbinott

Ola, meu nome e *${(fields.name ?? '').trim()}*.

Gostaria de verificar a disponibilidade para o seguinte agendamento:

*Tratamentos selecionados:*
${treatmentsFormatted}

*Data de preferencia:*
${fields.date ?? ''}

*Periodo de preferencia:*
${fields.period ?? ''}

*Telefone para contato:*
${phoneFormatted}
${notesBlock}
A data e o periodo informados representam apenas uma preferencia. Ficarei no aguardo do retorno da equipe para confirmar a disponibilidade e o agendamento.`;
}

export function buildTreatmentInquiryMessage(treatmentName: string): string {
  return `Olá! Tudo bem?\n\nEstou vendo o tratamento “${treatmentName}” no site da Estética Letícia Balbinott e gostaria de tirar algumas dúvidas antes de agendar.`;
}

export function buildSelectionWhatsAppMessage(itemNames: string[]): string {
  const lines = ['Olá, gostaria de agendar um horário na Estética Letícia Balbinott.', '', 'Serviços selecionados:'];
  itemNames.forEach((name) => lines.push(`- ${name}`));
  lines.push('', 'Gostaria de verificar os horários disponíveis.');
  return lines.join('\n');
}
