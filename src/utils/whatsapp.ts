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

export function buildSchedulingMessage(fields: SchedulingMessageFields): string {
  const lines: string[] = ['Olá! Gostaria de solicitar um agendamento na Estética Letícia Balbinott.', ''];

  if (isFilled(fields.name)) lines.push(`Nome: ${fields.name}`);
  if (isFilled(fields.phone)) lines.push(`Telefone: ${fields.phone}`);

  if (fields.treatments && fields.treatments.length > 0) {
    lines.push('', 'Tratamento(s) de interesse:');
    fields.treatments.forEach((name) => lines.push(`• ${name}`));
  }

  const preferenceLines: string[] = [];
  if (isFilled(fields.date)) preferenceLines.push(`Data de preferência: ${fields.date}`);
  if (isFilled(fields.period)) preferenceLines.push(`Período de preferência: ${fields.period}`);
  if (preferenceLines.length > 0) lines.push('', ...preferenceLines);

  if (isFilled(fields.notes)) lines.push('', `Observações: ${fields.notes}`);

  lines.push(
    '',
    'Estou ciente de que a data e o período representam uma preferência e que o agendamento será confirmado após o retorno da equipe.',
  );

  return lines.join('\n');
}

export function buildSelectionWhatsAppMessage(itemNames: string[]): string {
  const lines = ['Olá, gostaria de agendar um horário na Estética Letícia Balbinott.', '', 'Serviços selecionados:'];
  itemNames.forEach((name) => lines.push(`• ${name}`));
  lines.push('', 'Gostaria de verificar os horários disponíveis.');
  return lines.join('\n');
}
