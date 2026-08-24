import { toFaDigits } from "@/lib/jalali";

export function faNum(n: number, digits = 0): string {
  return toFaDigits(
    n.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    }),
  );
}

export function formatMoney(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (abs >= 1_000_000_000) {
    return `${sign}${faNum(abs / 1_000_000_000, 1)} میلیارد`;
  }
  if (abs >= 1_000_000) {
    return `${sign}${faNum(abs / 1_000_000, 1)} میلیون`;
  }
  if (abs >= 1_000) {
    return `${sign}${faNum(abs / 1_000, 0)} هزار`;
  }
  return `${sign}${faNum(abs, 0)}`;
}

export function formatMoneyFull(n: number): string {
  return `${faNum(Math.round(n))} تومان`;
}

export function formatPct(n: number, digits = 1): string {
  const sign = n > 0 ? "+" : n < 0 ? "−" : "";
  return `${sign}${faNum(Math.abs(n), digits)}٪`;
}

export function formatPctPlain(n: number, digits = 1): string {
  return `${faNum(n, digits)}٪`;
}

export function deltaTone(n: number, invert = false): "up" | "down" | "flat" {
  const v = invert ? -n : n;
  if (Math.abs(n) < 0.05) return "flat";
  return v > 0 ? "up" : "down";
}
