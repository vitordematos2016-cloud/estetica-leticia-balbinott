export function getLocalTodayISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getLocalNowTime(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function isPastDate(dateISO: string): boolean {
  return dateISO < getLocalTodayISO();
}

export function isTodayISO(dateISO: string): boolean {
  return dateISO === getLocalTodayISO();
}

export function isPastTimeToday(dateISO: string, time: string): boolean {
  if (!isTodayISO(dateISO)) return false;
  return time <= getLocalNowTime();
}

export function formatDateBR(dateISO: string): string {
  const [year, month, day] = dateISO.split('-');
  if (!year || !month || !day) return dateISO;
  return `${day}/${month}/${year}`;
}
