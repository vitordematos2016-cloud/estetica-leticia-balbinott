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

const EMOJI_BRILHO = '\u2728';
const EMOJI_FOLHA = '\u{1F33F}';
const EMOJI_CALENDARIO = '\u{1F4C5}';
const EMOJI_RELOGIO = '\u{1F550}';
const EMOJI_TELEFONE = '\u{1F4F1}';
const EMOJI_ANOTACAO = '\u{1F4DD}';
const EMOJI_CORACAO_MARROM = '\u{1F90E}';

export function buildSchedulingMessage(fields: SchedulingMessageFields): string {
  const treatmentsFormatted =
    fields.treatments && fields.treatments.length > 0
      ? fields.treatments.map((name) => `• ${name}`).join('\n')
      : '';

  const notesBlock = isFilled(fields.notes)
    ? `\n${EMOJI_ANOTACAO} *Observações:*\n${fields.notes.trim()}\n`
    : '';

  const phoneFormatted = isFilled(fields.phone) ? formatPhoneDisplay(fields.phone.trim()) : '';

  return `${EMOJI_BRILHO} *SOLICITAÇÃO DE AGENDAMENTO* ${EMOJI_BRILHO}
_Estética Letícia Balbinott_

Olá! Meu nome é *${(fields.name ?? '').trim()}* e gostaria de solicitar um agendamento. ${EMOJI_CORACAO_MARROM}

━━━━━━━━━━━━━━

${EMOJI_FOLHA} *Tratamento(s) de interesse:*
${treatmentsFormatted}

${EMOJI_CALENDARIO} *Data de preferência:*
${fields.date ?? ''}

${EMOJI_RELOGIO} *Período de preferência:*
${fields.period ?? ''}

${EMOJI_TELEFONE} *Telefone para contato:*
${phoneFormatted}
${notesBlock}
━━━━━━━━━━━━━━

Estou ciente de que a data e o período informados representam apenas uma preferência. A confirmação do agendamento dependerá do retorno da equipe e da disponibilidade da agenda.

Fico no aguardo do retorno da equipe. ${EMOJI_BRILHO}`;
}

export function buildSelectionWhatsAppMessage(itemNames: string[]): string {
  const lines = ['Olá, gostaria de agendar um horário na Estética Letícia Balbinott.', '', 'Serviços selecionados:'];
  itemNames.forEach((name) => lines.push(`• ${name}`));
  lines.push('', 'Gostaria de verificar os horários disponíveis.');
  return lines.join('\n');
}
