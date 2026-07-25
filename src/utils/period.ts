import type { ClinicNow } from './date';
import { isSaturday, isSunday } from './date';

export type Period = 'manha' | 'tarde' | 'noite';

const PERIOD_CLOSING_MINUTE: Record<Period, (saturday: boolean) => number> = {
  manha: () => 12 * 60,
  tarde: () => 18 * 60,
  noite: (saturday) => (saturday ? 18 * 60 : 19 * 60),
};

export function isPeriodAvailable(period: Period, dateISO: string, clinicNow: ClinicNow): boolean {
  if (!dateISO) return false;
  if (isSunday(dateISO)) return false;

  const saturday = isSaturday(dateISO);
  if (saturday && period === 'noite') return false;

  if (dateISO !== clinicNow.date) return true;

  const currentMinutes = clinicNow.hour * 60 + clinicNow.minute;
  return currentMinutes < PERIOD_CLOSING_MINUTE[period](saturday);
}

export function isDaySchedulable(dateISO: string, clinicNow: ClinicNow): boolean {
  const periods: Period[] = ['manha', 'tarde', 'noite'];
  return periods.some((period) => isPeriodAvailable(period, dateISO, clinicNow));
}

export function getPeriodUnavailableReason(
  period: Period,
  dateISO: string,
  clinicNow: ClinicNow,
): string | undefined {
  if (!dateISO) return undefined;
  if (isSunday(dateISO)) return 'fechado aos domingos';
  if (isSaturday(dateISO) && period === 'noite') return 'indisponível aos sábados';

  if (dateISO === clinicNow.date && !isPeriodAvailable(period, dateISO, clinicNow)) {
    return 'horário encerrado';
  }

  return undefined;
}
