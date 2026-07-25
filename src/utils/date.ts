const CLINIC_TIME_ZONE = 'America/Sao_Paulo';

export interface ClinicNow {
  date: string;
  hour: number;
  minute: number;
}

export function getClinicNow(): ClinicNow {
  const parts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: CLINIC_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());

  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '';

  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    hour: Number(get('hour')),
    minute: Number(get('minute')),
  };
}

export function getClinicTodayISO(): string {
  return getClinicNow().date;
}

export function isPastDate(dateISO: string): boolean {
  return dateISO < getClinicTodayISO();
}

export function formatDateBR(dateISO: string): string {
  const [year, month, day] = dateISO.split('-');
  if (!year || !month || !day) return dateISO;
  return `${day}/${month}/${year}`;
}

export function getWeekday(dateISO: string): number {
  const [year, month, day] = dateISO.split('-').map(Number);
  return new Date(year, month - 1, day).getDay();
}

export function isSunday(dateISO: string): boolean {
  return getWeekday(dateISO) === 0;
}

export function isSaturday(dateISO: string): boolean {
  return getWeekday(dateISO) === 6;
}
