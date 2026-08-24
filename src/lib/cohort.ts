import { formatPctPlain } from "@/lib/format";
import { MONTH_NAMES, toFaDigits } from "@/lib/jalali";

export type CohortRow = {
  cohort: string;
  year: number;
  monthName: string;
  product: string;
  volume: number;
  fail1: number;
  rate1: number | null;
  fail3: number;
  rate3: number | null;
  fail6: number;
  rate6: number | null;
  fail12: number;
  rate12: number | null;
};

export type CohortTotal = {
  product: string;
  volume: number;
  fail1: number;
  rate1: number | null;
  fail3: number;
  rate3: number | null;
  fail6: number;
  rate6: number | null;
  fail12: number;
  rate12: number | null;
};

export type CohortPack = {
  title: string;
  basis: string;
  volumeLabel: string;
  rows: CohortRow[];
  totals: CohortTotal[];
  notes: string[];
};

export type CohortTrendRow = {
  cohort: string;
  installVolume: number;
  installFail3: number;
  installRate3: number | null;
  produceVolume: number;
  produceFail3: number;
  produceRate3: number | null;
};

export type CorrectiveAction = {
  part: string;
  avgMonths: number;
  count: number;
  action: string;
  actionDate: string;
  result: string;
};

export function formatRate(rate: number | null, digits = 2): string {
  if (rate == null) return "—";
  if (rate === 0) return "۰٪";
  return formatPctPlain(rate * 100, digits);
}

export function ratePct(rate: number | null): number | undefined {
  if (rate == null) return undefined;
  return Number((rate * 100).toFixed(4));
}

export function slashMonthLabel(key: string): string {
  const [y, m] = key.split("/");
  const name = MONTH_NAMES[Number(m) - 1] ?? key;
  return `${name} ${toFaDigits(String(y ?? "").slice(2))}`;
}

export function productsOf(rows: CohortRow[]): string[] {
  return Array.from(new Set(rows.map((r) => r.product)));
}

export function actionTone(result: string): "warn" | "good" | "muted" {
  if (result.includes("بهبود")) return "good";
  if (result.includes("اقدام")) return "warn";
  return "muted";
}

