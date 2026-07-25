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
  const treatmentsFormatted =
    fields.treatments && fields.treatments.length > 0
      ? fields.treatments.map((name) => `• ${name}`).join('\n')
      : '';

  const notesBlock = isFilled(fields.notes) ? `\n📝 *Observações:*\n${fields.notes.trim()}\n` : '';

  return `✨ *SOLICITAÇÃO DE AGENDAMENTO* ✨
_Estética Letícia Balbinott_

Olá! Meu nome é *${(fields.name ?? '').trim()}* e gostaria de solicitar um agendamento. 🤎

━━━━━━━━━━━━━━

🌿 *Tratamento(s) de interesse:*
${treatmentsFormatted}

📅 *Data de preferência:*
${fields.date ?? ''}

🕐 *Período de preferência:*
${fields.period ?? ''}

📱 *Telefone para contato:*
${fields.phone ?? ''}
${notesBlock}
━━━━━━━━━━━━━━

Estou ciente de que a data e o período informados representam apenas uma preferência. A confirmação do agendamento dependerá do retorno da equipe e da disponibilidade da agenda.

Aguardo o retorno. Obrigada! ✨`;
}

export function buildSelectionWhatsAppMessage(itemNames: string[]): string {
  const lines = ['Olá, gostaria de agendar um horário na Estética Letícia Balbinott.', '', 'Serviços selecionados:'];
  itemNames.forEach((name) => lines.push(`• ${name}`));
  lines.push('', 'Gostaria de verificar os horários disponíveis.');
  return lines.join('\n');
}
