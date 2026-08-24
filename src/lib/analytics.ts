import { ALL_MONTHS, type GlobalFilters, type ServiceRow } from "@/lib/types";
import { uniqueSortedMonths } from "@/lib/jalali";

export function applyFilters(rows: ServiceRow[], filters: GlobalFilters): ServiceRow[] {
  return rows.filter((r) => {
    if (filters.product && r.product !== filters.product) return false;
    if (filters.cause && r.cause !== filters.cause) return false;
    if (filters.model && r.model !== filters.model) return false;
    return true;
  });
}

export function inMonth(rows: ServiceRow[], month: string): ServiceRow[] {
  if (month === ALL_MONTHS) return rows;
  return rows.filter((r) => r.month === month);
}

export function monthsOf(rows: ServiceRow[]): string[] {
  return uniqueSortedMonths(rows.map((r) => r.month));
}

export function uniqueValues(rows: ServiceRow[], key: keyof ServiceRow): string[] {
  return Array.from(new Set(rows.map((r) => String(r[key] || "").trim()).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "fa"),
  );
}

export function sumBy<T>(rows: T[], fn: (r: T) => number): number {
  let s = 0;
  for (const r of rows) s += fn(r);
  return s;
}

export type NamedStat = {
  name: string;
  count: number;
  cost: number;
  share: number;
  avgAge: number;
  avgCost: number;
};

export function groupBy(rows: ServiceRow[], key: (r: ServiceRow) => string): NamedStat[] {
  const map = new Map<string, { count: number; cost: number; age: number }>();
  for (const r of rows) {
    const k = key(r) || "نامشخص";
    const cur = map.get(k) ?? { count: 0, cost: 0, age: 0 };
    cur.count += 1;
    cur.cost += r.totalCost;
    cur.age += r.ageMonths;
    map.set(k, cur);
  }
  const total = rows.length || 1;
  return Array.from(map.entries())
    .map(([name, v]) => ({
      name,
      count: v.count,
      cost: v.cost,
      share: (v.count / total) * 100,
      avgAge: v.count ? v.age / v.count : 0,
      avgCost: v.count ? v.cost / v.count : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

export type Kpis = {
  visits: number;
  prevVisits: number;
  visitDelta: number;
  cost: number;
  prevCost: number;
  costDelta: number;
  avgCost: number;
  avgAge: number;
  repeats: number;
  repeatShare: number;
  repeatCost: number;
  partCost: number;
  laborCost: number;
  products: number;
  models: number;
};

function pctDelta(cur: number, prev: number): number {
  if (!prev) return cur ? 100 : 0;
  return ((cur - prev) / Math.abs(prev)) * 100;
}

export function computeKpis(rows: ServiceRow[], month: string, prevMonth: string): Kpis {
  const cur = inMonth(rows, month);
  const prev = month === ALL_MONTHS ? [] : inMonth(rows, prevMonth);
  const visits = cur.length;
  const prevVisits = prev.length;
  const cost = sumBy(cur, (r) => r.totalCost);
  const prevCost = sumBy(prev, (r) => r.totalCost);
  const repeats = cur.filter((r) => r.repeat).length;
  return {
    visits,
    prevVisits,
    visitDelta: month === ALL_MONTHS ? 0 : pctDelta(visits, prevVisits),
    cost,
    prevCost,
    costDelta: month === ALL_MONTHS ? 0 : pctDelta(cost, prevCost),
    avgCost: visits ? cost / visits : 0,
    avgAge: visits ? sumBy(cur, (r) => r.ageMonths) / visits : 0,
    repeats,
    repeatShare: visits ? (repeats / visits) * 100 : 0,
    repeatCost: sumBy(cur, (r) => r.repeatCost),
    partCost: sumBy(cur, (r) => r.partCost),
    laborCost: sumBy(cur, (r) => r.laborCost),
    products: new Set(cur.map((r) => r.product)).size,
    models: new Set(cur.map((r) => r.model)).size,
  };
}

export function monthlySeries(rows: ServiceRow[]) {
  return monthsOf(rows).map((month) => {
    const cur = inMonth(rows, month);
    return {
      month,
      visits: cur.length,
      cost: sumBy(cur, (r) => r.totalCost),
      repeats: cur.filter((r) => r.repeat).length,
      avgAge: cur.length ? sumBy(cur, (r) => r.ageMonths) / cur.length : 0,
    };
  });
}

export function ageBuckets(rows: ServiceRow[]) {
  const bins = [
    { name: "۰–۳ زودهنگام", min: -99, max: 3 },
    { name: "۴–۶", min: 4, max: 6 },
    { name: "۷–۹", min: 7, max: 9 },
    { name: "۱۰–۱۲", min: 10, max: 12 },
    { name: "۱۳+ دیرهنگام", min: 13, max: 999 },
  ];
  return bins.map((b) => ({
    name: b.name,
    count: rows.filter((r) => r.ageMonths >= b.min && r.ageMonths <= b.max).length,
  }));
}

export type Priority = {
  label: string;
  tone: "bad" | "warn" | "muted" | "good";
  note: string;
};

export function causePriority(stat: NamedStat, total: number): Priority {
  if (stat.count >= 10 && stat.avgAge <= 5) {
    return {
      label: "بحرانی",
      tone: "bad",
      note: "حجم بالا و خرابی زودهنگام — اولویت بازبینی تأمین‌کننده",
    };
  }
  if (stat.count >= 15) {
    return {
      label: "حجم بالا",
      tone: "warn",
      note: "احتمالاً فرآیندی (نصب/تنظیم) یا قطعه پرمصرف",
    };
  }
  if (stat.avgAge <= 3 && stat.count >= 2 && stat.count < 8) {
    return {
      label: "پایش ویژه",
      tone: "warn",
      note: "خرابی زودهنگام با حجم کم — جمع‌آوری داده بیشتر",
    };
  }
  if (stat.count >= 8) {
    return {
      label: "پایش دوره‌ای",
      tone: "muted",
      note: "حجم متوسط، عمر نسبتاً طبیعی",
    };
  }
  void total;
  return { label: "عادی", tone: "muted", note: "حجم کم و عمر طبیعی" };
}

export function heatmap(rows: ServiceRow[], causes: string[]) {
  const products = uniqueValues(rows, "product");
  const map = new Map<string, number>();
  for (const r of rows) {
    const k = `${r.product}||${r.cause}`;
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  let max = 1;
  const cells = products.map((product) => {
    const vals = causes.map((cause) => map.get(`${product}||${cause}`) ?? 0);
    max = Math.max(max, ...vals);
    return { product, vals };
  });
  return { products, causes, cells, max };
}

export function repeatSerials(rows: ServiceRow[]) {
  const map = new Map<string, { count: number; cost: number; product: string; model: string }>();
  for (const r of rows) {
    const cur = map.get(r.serial) ?? { count: 0, cost: 0, product: r.product, model: r.model };
    cur.count += 1;
    cur.cost += r.repeatCost || (r.repeat ? r.laborCost : 0);
    map.set(r.serial, cur);
  }
  return Array.from(map.entries())
    .filter(([, v]) => v.count > 1)
    .map(([serial, v]) => ({ serial, ...v }))
    .sort((a, b) => b.count - a.count || b.cost - a.cost);
}

export type Insight = { tone: "info" | "good" | "warn" | "bad"; title: string; body: string };

export function buildInsights(rows: ServiceRow[]): Insight[] {
  if (rows.length === 0) return [];
  const out: Insight[] = [];
  const products = groupBy(rows, (r) => r.product);
  const causes = groupBy(rows, (r) => r.cause);
  const parts = groupBy(
    rows.filter((r) => r.part),
    (r) => r.part,
  );
  const topP = products[0];
  const topC = causes[0];
  if (topP) {
    out.push({
      tone: "info",
      title: "قطب مراجعات",
      body: `${topP.name} با ${fa(topP.count)} مراجعه (${fa(topP.share)}٪) پرتکرارترین دستگاه دوره است.`,
    });
  }
  const earlyPart = [...parts].filter((p) => p.count >= 4).sort((a, b) => a.avgAge - b.avgAge)[0];
  if (earlyPart && earlyPart.avgAge <= 5) {
    out.push({
      tone: "bad",
      title: "خرابی زودهنگام قطعه",
      body: `«${earlyPart.name}» با میانگین ${fa(earlyPart.avgAge)} ماه تا خرابی و ${fa(earlyPart.count)} مورد، زودتر از عمر طبیعی از کار می‌افتد.`,
    });
  }
  const boards = rows.filter((r) => r.cause.includes("برد"));
  const boardCost = sumBy(boards, (r) => r.partCost);
  if (boards.length >= 8) {
    out.push({
      tone: "warn",
      title: "بار مالی برد الکترونیک",
      body: `${fa(boards.length)} مورد تعویض برد با حدود ${money(boardCost)} تومان هزینه قطعه — بازبینی تأمین‌کننده برد اولویت هزینه است.`,
    });
  }
  const level = rows.filter((r) => r.cause.includes("تراز") || r.cause.includes("رگلاژ"));
  if (level.length >= 10) {
    out.push({
      tone: "warn",
      title: "نصب ناقص، نه قطعه",
      body: `${fa(level.length)} مراجعه فقط با رگلاژ پایه بسته شده. آموزش نصب یا الزام تراز مستند این اعزام‌ها را حذف می‌کند.`,
    });
  }
  const repeats = rows.filter((r) => r.repeat);
  if (repeats.length) {
    out.push({
      tone: repeats.length / rows.length >= 0.12 ? "warn" : "info",
      title: "مراجعه تکراری",
      body: `${fa(repeats.length)} ردیف روی سریال تکراری ثبت شده؛ هزینه ضرر تکرار ${money(sumBy(rows, (r) => r.repeatCost))} تومان است.`,
    });
  }
  if (topC && out.length < 5) {
    out.push({
      tone: "info",
      title: "علت غالب",
      body: `«${topC.name}» با ${fa(topC.count)} مورد (${fa(topC.share)}٪) و میانگین ${fa(topC.avgAge)} ماه تا خرابی، الگوی اصلی دوره است.`,
    });
  }
  return out.slice(0, 5);
}

function fa(n: number) {
  return n.toLocaleString("fa-IR", { maximumFractionDigits: 1 });
}
function money(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) {
    return `${(abs / 1_000_000_000).toLocaleString("fa-IR", { maximumFractionDigits: 1 })} میلیارد`;
  }
  return `${(abs / 1_000_000).toLocaleString("fa-IR", { maximumFractionDigits: 1 })} میلیون`;
}
