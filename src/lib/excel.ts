import * as XLSX from "xlsx";
import { pad2 } from "@/lib/jalali";
import type { ServiceRow } from "@/lib/types";

const MONTH_MAP: Record<string, string> = {
  فروردین: "01",
  اردیبهشت: "02",
  خرداد: "03",
  تیر: "04",
  مرداد: "05",
  شهریور: "06",
  مهر: "07",
  آبان: "08",
  آذر: "09",
  دی: "10",
  بهمن: "11",
  اسفند: "12",
};

const ALIASES: Record<string, string[]> = {
  ticket: ["شماره پذیرش", "پذیرش", "ticket"],
  monthName: ["ماه", "month"],
  product: ["نوع محصول", "نوع دستگاه", "محصول"],
  model: ["مدل محصول", "مدل"],
  serial: ["شماره سریال", "سریال"],
  complaint: ["اظهار مشتری", "اظهار"],
  failure: ["شرح خرابی", "شرح"],
  acceptDate: ["تاریخ پذیرش"],
  produceDate: ["تاریخ تولید"],
  installDate: ["تاریخ نصب"],
  ageMonths: ["مدت زمان مصرف", "عمر", "ماه تا خرابی"],
  cause: ["دسته علت خرابی", "علت خرابی", "علت"],
  part: ["قطعه تعویضی", "قطعه"],
  travelPayer: ["مشئول ایاب ذهاب", "مسئول ایاب ذهاب", "ایاب و ذهاب"],
  partCost: ["هزینه قطعه (تومان)", "هزینه قطعه"],
  laborCost: ["هزینه اجرت+ایاب‌وذهاب (تومان)", "هزینه اجرت+ایاب‌وذهاب", "اجرت"],
  totalCost: ["هزینه کل ردیف (تومان)", "هزینه کل"],
  repeat: ["مراجعه تکراری؟ (سریال)", "مراجعه تکراری"],
  repeatCost: ["هزینه ضرر تکرار (تومان)", "ضرر تکرار"],
};

function fa(s: unknown): string {
  return String(s ?? "")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\*+/g, " — ")
    .replace(/\s+/g, " ")
    .trim();
}

function num(v: unknown): number {
  if (typeof v === "number") return v;
  const n = Number(String(v ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function jalaliIso(s: unknown): string {
  const t = fa(s);
  const m = t.match(/^(\d{4})[\/.-](\d{1,2})[\/.-](\d{1,2})$/);
  if (!m) return t;
  return `${m[1]}-${pad2(Number(m[2]))}-${pad2(Number(m[3]))}`;
}

function monthKey(name: string, date: string): string {
  const mm = MONTH_MAP[name];
  const y = date.slice(0, 4) || "1405";
  if (mm) return `${y}-${mm}`;
  const m = date.match(/^(\d{4})-(\d{2})/);
  return m ? `${m[1]}-${m[2]}` : date.slice(0, 7);
}

function norm(s: string) {
  return fa(s).toLowerCase();
}

function mapHeaders(headers: string[]): Record<string, number> {
  const idx: Record<string, number> = {};
  const n = headers.map(norm);
  for (const [field, names] of Object.entries(ALIASES)) {
    const found = names.map(norm).find((x) => n.includes(x));
    if (found) idx[field] = n.indexOf(found);
  }
  return idx;
}

export type ParseResult = { rows: ServiceRow[]; warnings: string[]; sheets: string[] };

export function parseWorkbook(buf: ArrayBuffer): ParseResult {
  const wb = XLSX.read(buf, { type: "array", cellDates: true });
  const sheets = wb.SheetNames;
  const name = sheets.find((n) => /خام|داده/.test(n)) ?? sheets[0];
  const warnings: string[] = [];
  if (!name) return { rows: [], warnings: ["برگه‌ای در فایل نیست."], sheets };
  const aoa = XLSX.utils.sheet_to_json<(string | number | Date)[]>(wb.Sheets[name], {
    header: 1,
    defval: "",
    raw: true,
  });
  if (aoa.length < 2) return { rows: [], warnings: ["برگه داده ردیف ندارد."], sheets };
  const headers = (aoa[0] ?? []).map((h) => fa(h));
  const idx = mapHeaders(headers);
  if (idx.product == null && idx.ticket == null) {
    warnings.push("ستون‌های پذیرش/محصول پیدا نشد. از الگوی رصد استفاده کنید.");
  }
  const rows: ServiceRow[] = [];
  aoa.slice(1).forEach((row, i) => {
    if (!row || row.every((c) => fa(c) === "")) return;
    const acceptDate = jalaliIso(idx.acceptDate != null ? row[idx.acceptDate] : "");
    const monthName = fa(idx.monthName != null ? row[idx.monthName] : "");
    const part = fa(idx.part != null ? row[idx.part] : "");
    const repeatRaw = fa(idx.repeat != null ? row[idx.repeat] : "");
    const ticket = fa(idx.ticket != null ? row[idx.ticket] : i + 1);
    const partCost = num(idx.partCost != null ? row[idx.partCost] : 0);
    const laborCost = num(idx.laborCost != null ? row[idx.laborCost] : 0);
    rows.push({
      id: `${ticket}-${i}`,
      ticket,
      monthName,
      month: monthKey(monthName, acceptDate),
      product: fa(idx.product != null ? row[idx.product] : "") || "نامشخص",
      model: fa(idx.model != null ? row[idx.model] : "") || "—",
      serial: fa(idx.serial != null ? row[idx.serial] : ""),
      complaint: fa(idx.complaint != null ? row[idx.complaint] : ""),
      failure: fa(idx.failure != null ? row[idx.failure] : ""),
      acceptDate,
      produceDate: jalaliIso(idx.produceDate != null ? row[idx.produceDate] : ""),
      installDate: jalaliIso(idx.installDate != null ? row[idx.installDate] : ""),
      ageMonths: num(idx.ageMonths != null ? row[idx.ageMonths] : 0),
      cause: fa(idx.cause != null ? row[idx.cause] : "") || "سایر",
      part: part === "*" ? "" : part,
      travelPayer: fa(idx.travelPayer != null ? row[idx.travelPayer] : ""),
      partCost,
      laborCost,
      totalCost: num(idx.totalCost != null ? row[idx.totalCost] : partCost + laborCost),
      repeat: /بله|تکرار/.test(repeatRaw),
      repeatCost: num(idx.repeatCost != null ? row[idx.repeatCost] : 0),
    });
  });
  if (rows.length === 0) warnings.push("هیچ ردیف خدماتی خوانده نشد.");
  return { rows, warnings, sheets };
}

const HEADERS = [
  "شماره پذیرش",
  "ماه",
  "نوع محصول",
  "مدل محصول",
  "شماره سریال",
  "اظهار مشتری",
  "شرح خرابی",
  "تاریخ پذیرش",
  "تاریخ تولید",
  "تاریخ نصب",
  "مدت زمان مصرف",
  "دسته علت خرابی",
  "قطعه تعویضی",
  "مشئول ایاب ذهاب",
  "هزینه قطعه (تومان)",
  "هزینه اجرت+ایاب‌وذهاب (تومان)",
  "هزینه کل ردیف (تومان)",
  "مراجعه تکراری؟ (سریال)",
  "هزینه ضرر تکرار (تومان)",
];

function toAoa(rows: ServiceRow[]) {
  return [
    HEADERS,
    ...rows.map((r) => [
      r.ticket,
      r.monthName,
      r.product,
      r.model,
      r.serial,
      r.complaint,
      r.failure,
      r.acceptDate.replace(/-/g, "/"),
      r.produceDate.replace(/-/g, "/"),
      r.installDate.replace(/-/g, "/"),
      r.ageMonths,
      r.cause,
      r.part || "*",
      r.travelPayer,
      r.partCost,
      r.laborCost,
      r.totalCost,
      r.repeat ? "بله (تکراری)" : "خیر",
      r.repeatCost,
    ]),
  ];
}

export function exportWorkbook(rows: ServiceRow[], filename: string) {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(toAoa(rows)), "داده خام");
  XLSX.writeFile(wb, filename);
}

export function downloadTemplate(rows: ServiceRow[]) {
  const wb = XLSX.utils.book_new();
  const guide = [
    ["سامانه رصد — الگوی خدمات پس از فروش آرتا"],
    ["برگه «داده خام» را برای ماه جدید پر کنید. نام ستون‌ها را تغییر ندهید."],
    ["ماه را با نام شمسی بنویسید: فروردین، اردیبهشت، …"],
    ["تاریخ‌ها به صورت 1405/05/12"],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(guide), "راهنما");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(toAoa(rows.slice(0, 25))), "داده خام");
  XLSX.writeFile(wb, "rasad-arta-template.xlsx");
}
