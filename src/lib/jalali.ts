export const MONTH_NAMES = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

export const WEEKDAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"] as const;

export function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function monthKey(year: number, month: number): string {
  return `${year}-${pad2(month)}`;
}

export function parseMonthKey(key: string): { year: number; month: number } {
  const [y, m] = key.split("-").map(Number);
  return { year: y ?? 1404, month: m ?? 1 };
}

export function formatMonth(key: string): string {
  const { year, month } = parseMonthKey(key);
  const name = MONTH_NAMES[month - 1] ?? MONTH_NAMES[0];
  return `${name} ${toFaDigits(year)}`;
}

export function formatMonthShort(key: string): string {
  const { month } = parseMonthKey(key);
  return MONTH_NAMES[month - 1] ?? key;
}

export function toFaDigits(value: string | number): string {
  const map = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(value).replace(/\d/g, (d) => map[Number(d)] ?? d);
}

export function prevMonth(key: string): string {
  const { year, month } = parseMonthKey(key);
  if (month === 1) return monthKey(year - 1, 12);
  return monthKey(year, month - 1);
}

export function nextMonth(key: string): string {
  const { year, month } = parseMonthKey(key);
  if (month === 12) return monthKey(year + 1, 1);
  return monthKey(year, month + 1);
}

export function monthDays(year: number, month: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  return isLeapJalali(year) ? 30 : 29;
}

export function isLeapJalali(year: number): boolean {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
    2192, 2262, 2324, 2394, 2456, 3178,
  ];
  let jp = breaks[0]!;
  let jump = 0;
  for (let i = 1; i < breaks.length; i++) {
    const jm = breaks[i]!;
    jump = jm - jp;
    if (year < jm) break;
    jp = jm;
  }
  let n = year - jp;
  if (jump - n < 6) n = n - jump + ((jump + 4) / 6) * 6;
  const leap = ((((n + 1) % 33) - 1) % 4) === 0;
  return leap;
}

function div(a: number, b: number) {
  return ~~(a / b);
}

export function gregorianToJalali(gy: number, gm: number, gd: number) {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    365 * gy +
    div(gy2 + 3, 4) -
    div(gy2 + 99, 100) +
    div(gy2 + 399, 400) -
    80 +
    gd +
    g_d_m[gm - 1]!;
  jy += 33 * div(days, 12053);
  days %= 12053;
  jy += 4 * div(days, 1461);
  days %= 1461;
  if (days > 365) {
    jy += div(days - 1, 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + div(days, 31) : 7 + div(days - 186, 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return { year: jy, month: jm, day: jd };
}

export function dateToJalali(d: Date) {
  return gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

export function formatJalaliDate(keyDate: string): string {
  const parts = keyDate.split("-").map(Number);
  const y = parts[0] ?? 1404;
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;
  return `${toFaDigits(pad2(d))} ${MONTH_NAMES[m - 1]} ${toFaDigits(y)}`;
}

export function jalaliDateKey(year: number, month: number, day: number): string {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

export function compareMonthKeys(a: string, b: string): number {
  return a.localeCompare(b);
}

export function uniqueSortedMonths(keys: string[]): string[] {
  return Array.from(new Set(keys)).sort(compareMonthKeys);
}
