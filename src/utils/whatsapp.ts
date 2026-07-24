export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}

export interface SchedulingMessageFields {
  name?: string;
  phone?: string;
  treatments?: string[];
  professional?: string;
  date?: string;
  time?: string;
  notes?: string;
}

function isFilled(value: string | undefined | null): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function buildSchedulingMessage(fields: SchedulingMessageFields): string {
  const lines: string[] = ['Olá! Gostaria de agendar uma avaliação na Estética Letícia Balbinott.'];

  if (isFilled(fields.name)) lines.push(`Nome: ${fields.name}`);
  if (isFilled(fields.phone)) lines.push(`Telefone: ${fields.phone}`);
  if (fields.treatments && fields.treatments.length > 0) {
    lines.push(`Tratamentos: ${fields.treatments.join(', ')}`);
  }
  if (isFilled(fields.professional)) lines.push(`Profissional: ${fields.professional}`);
  if (isFilled(fields.date)) lines.push(`Data: ${fields.date}`);
  if (isFilled(fields.time)) lines.push(`Horário: ${fields.time}`);
  if (isFilled(fields.notes)) lines.push(`Observações: ${fields.notes}`);

  return lines.join('\n');
}

export function buildSelectionWhatsAppMessage(itemNames: string[]): string {
  const lines = ['Olá, gostaria de agendar um horário na Estética Letícia Balbinott.', '', 'Serviços selecionados:'];
  itemNames.forEach((name) => lines.push(`• ${name}`));
  lines.push('', 'Gostaria de verificar os horários disponíveis.');
  return lines.join('\n');
}
