export function getLocalTodayISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isPastDate(dateISO: string): boolean {
  return dateISO < getLocalTodayISO();
}

export function formatDateBR(dateISO: string): string {
  const [year, month, day] = dateISO.split('-');
  if (!year || !month || !day) return dateISO;
  return `${day}/${month}/${year}`;
}
