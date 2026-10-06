import rulesRaw from "@/data/cause-rules.json";
import { isLeapJalali, MONTH_NAMES } from "@/lib/jalali";
import type { ServiceRow } from "@/lib/types";

type CauseRule = { keyword: string; cause: string; priority: number };

const RULES: CauseRule[] = [...(rulesRaw as CauseRule[])].sort((a, b) => {
  if (b.priority !== a.priority) return b.priority - a.priority;
  return b.keyword.length - a.keyword.length;
});

function norm(s: string): string {
  return s
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function classifyCause(failure: string, complaint = ""): string {
  const hay = `${norm(failure)} ${norm(complaint)}`;
  if (!hay.trim()) return "سایر (نیازمند بررسی دستی)";
  for (const rule of RULES) {
    const k = norm(rule.keyword);
    if (k && hay.includes(k)) return rule.cause;
  }
  return "سایر (نیازمند بررسی دستی)";
}

function monthDays(year: number, month: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  return isLeapJalali(year) ? 30 : 29;
}

function jalaliOrdinal(iso: string): number | null {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!y || !mo || !d) return null;
  let days = 0;
  for (let yy = 1400; yy < y; yy++) days += isLeapJalali(yy) ? 366 : 365;
  for (let mm = 1; mm < mo; mm++) days += monthDays(y, mm);
  return days + d;
}

export function ageFromDates(accept: string, install: string): number {
  const a = jalaliOrdinal(accept);
  const i = jalaliOrdinal(install);
  if (a == null || i == null) return 0;
  const diff = (a - i) / 30;
  if (diff <= 0) return 0;
  return Math.ceil(diff);
}

export function travelFromComplaint(complaint: string): string {
  if (complaint.includes("عهده شرکت")) return "شرکت";
  if (complaint.includes("عهده مشتری") || complaint.includes("عهده مشتري")) return "مشتری";
  return "";
}

const EMPTY_CAUSE = new Set(["", "سایر", "—", "-"]);

export function enrichRow(row: ServiceRow): ServiceRow {
  const mm = Number(row.month.slice(5, 7));
  const monthName =
    row.monthName && (MONTH_NAMES as readonly string[]).includes(row.monthName)
      ? row.monthName
      : (MONTH_NAMES[mm - 1] ?? row.monthName);
  const cause = EMPTY_CAUSE.has(row.cause) ? classifyCause(row.failure, row.complaint) : row.cause;
  const ageMonths = row.ageMonths > 0 ? row.ageMonths : ageFromDates(row.acceptDate, row.installDate);
  const travelPayer = row.travelPayer || travelFromComplaint(row.complaint);
  const part = row.part === "*" || row.part === "—" || row.part === "---" || row.part === "-" ? "" : row.part;
  const partCost = row.partCost || 0;
  const laborCost = row.laborCost || 0;
  const totalCost = row.totalCost > 0 ? row.totalCost : partCost + laborCost;
  return {
    ...row,
    monthName,
    cause,
    ageMonths,
    travelPayer,
    part,
    partCost,
    laborCost,
    totalCost,
  };
}

export function markRepeats(rows: ServiceRow[]): ServiceRow[] {
  const seen = new Map<string, number>();
  return rows.map((r, i) => {
    const key = r.serial || `row-${i}`;
    const n = (seen.get(key) ?? 0) + 1;
    seen.set(key, n);
    const repeat = r.repeat || n > 1;
    return { ...r, repeat, repeatCost: r.repeatCost || 0 };
  });
}
