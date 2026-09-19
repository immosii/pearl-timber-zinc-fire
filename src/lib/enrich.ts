import { isLeapJalali, MONTH_NAMES } from "@/lib/jalali";
import type { ServiceRow } from "@/lib/types";

const LABOR = 800_000 + 300_000;

const DEVICE_PRICE: Record<string, number> = {
  "ماشین ظرفشویی": 95_000_000,
  "ماشین لباسشویی": 110_000_000,
  "یخچال ساید‌بای‌ساید": 80_000_000,
  "یخچال مینی": 60_000_000,
  تلویزیون: 120_000_000,
};

const PART_PRICE: Record<string, number> = {
  "نشتی - پمپ تخلیه (تعمیر/آب‌بندی)": 500_000,
  "خرابی - پمپ تخلیه (تعویض)": 3_000_000,
  "تراز/لرزش - نصب (رگلاژ پایه)": 500_000,
  "مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)": 2_500_000,
  "مکانیزم درب - زبانه (تعویض)": 1_500_000,
  "مکانیزم درب - لولا (تعویض)": 2_500_000,
  "خرابی - برد الکترونیک (تعویض)": 14_000_000,
  "یخساز - خرابی موتور/سنسور/برد (تعویض)": 5_000_000,
  "یخساز - تنظیم/عایق (تعمیر)": 1_500_000,
  "نشتی - شیلنگ (تعمیر/آب‌بندی)": 300_000,
  "شیلنگ یخساز - یخ‌زدگی (بازبینی)": 900_000,
  "شیلنگ - برخورد/لهیدگی (بازبینی)": 800_000,
  "لاستیک درزگیر - دفرمگی/پارگی (تعویض)": 500_000,
  "نشتی - درب مخزن نمک (تعمیر/آب‌بندی)": 800_000,
  "نشتی - براکت ریل (تعمیر/آب‌بندی)": 800_000,
  "نشتی - جاپودری (تعمیر/آب‌بندی)": 1_500_000,
  "نشتی - مقسم آب (تعمیر/آب‌بندی)": 1_800_000,
  "نشتی آب - محل نامشخص (نیازمند بازدید)": 1_000_000,
  "خرابی - کمپرسور (تعویض)": 20_000_000,
  "خرابی - کمک فنر (تعویض)": 2_500_000,
  "خرابی - ترموستات (تعویض)": 2_000_000,
  "خرابی - هیدروستات (تعویض)": 1_700_000,
  "خرابی - بلبرینگ (تعویض)": 4_000_000,
  "خرابی - شیربرقی (تعویض)": 1_800_000,
  "خرابی - واترجت (تعویض)": 4_000_000,
  "سیم‌کشی/اتصالات (تعویض/بازبینی)": 1_400_000,
  "برد نمایش تلویزیون (تعویض)": 4_000_000,
  "خرابی - لامپ/LED داخلی (تعویض)": 1_500_000,
  "خرابی - تاب برداشتن درام (تعویض)": 20_000_000,
  "تنظیم - پیچ ولوم/دکمه (تعمیر)": 700_000,
  "قطعات تزئینی - شکستگی/کسری (تعویض)": 0,
  "تنظیم - گسکت/درام (تعمیر)": 1_800_000,
  "خرابی - تسمه (تعویض)": 2_000_000,
  "خرابی - موتور (تعویض)": 4_500_000,
  "بدنه/کابین - ضربه (بازبینی/تعویض پنل)": 4_000_000,
  "ریموت کنترل (تعویض/تعمیر)": 3_000_000,
  "زنگ‌زدگی بدنه/قطعه (تعویض)": 3_500_000,
  "سبد ظرفشویی - شکستگی (تعویض)": 1_000_000,
  "پرچ/بدنه کابین (تعمیر)": 1_500_000,
  "پرچ/بدنه کابین(تعمیر)": 1_500_000,
  "سایر اجزای درب (بازبینی)": 1_000_000,
  "ریست نرم‌افزاری (بدون قطعه)": 700_000,
  "غیرگارانتی/بدون قطعه": 800_000,
  "تعویض کامل دستگاه (Replacement)": 0,
  "سایر (نیازمند بررسی دستی)": 1_200_000,
  "تنظیم - تنظیمات دستگاه/دیسپلی (تعمیر)": 800_000,
  "خرابی - سایر ایراد درام (تعویض)": 1_200_000,
  "کسری قطعات تزئینی (تعویض)": 0,
};

function has(text: string, needle: string): boolean {
  return text.toLowerCase().includes(needle.toLowerCase());
}

/** Matches the nested SEARCH chain on ستون «شرح خرابی» in the Arta workbook. */
export function classifyCause(failure: string): string {
  const g = failure;
  if (!g) return "سایر (نیازمند بررسی دستی)";
  if (["بدون مورد", "غير گارانتي", "غیر گارانتی", "بدون اجرت", "فيلتر", "فیلتر"].some((k) => has(g, k)))
    return "غیرگارانتی/بدون قطعه";
  if (has(g, "ريست") || has(g, "ریست")) return "ریست نرم‌افزاری (بدون قطعه)";
  if (has(g, "تعویض محصول") || has(g, "تعویض دستگاه")) return "تعویض کامل دستگاه (Replacement)";
  if (has(g, "پمپ")) {
    return has(g, "نشت") ? "نشتی - پمپ تخلیه (تعمیر/آب‌بندی)" : "خرابی - پمپ تخلیه (تعویض)";
  }
  if (has(g, "کمپرسور")) return "خرابی - کمپرسور (تعویض)";
  if (has(g, "کمک فنر")) return "خرابی - کمک فنر (تعویض)";
  if (has(g, "لولا")) return "مکانیزم درب - لولا (تعویض)";
  if (has(g, "قلاب") || has(g, "ميکروسوئيچ") || has(g, "میکروسوئیچ"))
    return "مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)";
  if (has(g, "زبانه")) return "مکانیزم درب - زبانه (تعویض)";
  if (has(g, "شيلنگ") || has(g, "شیلنگ")) {
    if (has(g, "نشتی") || has(g, "نشتي")) return "نشتی - شیلنگ (تعمیر/آب‌بندی)";
    if (has(g, "يخ") || has(g, "یخ")) return "شیلنگ یخساز - یخ‌زدگی (بازبینی)";
    return "شیلنگ - برخورد/لهیدگی (بازبینی)";
  }
  if (
    has(g, "تنظيم ديسپل") ||
    has(g, "تنظیم دیسپل") ||
    has(g, "تنظيم صفحه نمايش") ||
    has(g, "تنظیم صفحه نمایش")
  )
    return "تنظیم - تنظیمات دستگاه/دیسپلی (تعمیر)";
  if (has(g, "برد") || has(g, "سوکت") || has(g, "ديسپل") || has(g, "دیسپل"))
    return "خرابی - برد الکترونیک (تعویض)";
  if (has(g, "يخساز") || has(g, "یخساز") || has(g, "دمپر")) {
    if (has(g, "خرابی") || has(g, "خراب") || has(g, "عدم کارکرد") || has(g, "عدم عملکرد"))
      return "یخساز - خرابی موتور/سنسور/برد (تعویض)";
    return "یخساز - تنظیم/عایق (تعمیر)";
  }
  if (has(g, "لاستيک") || has(g, "لاستیک") || has(g, "گسکت") || has(g, "گسگت"))
    return "لاستیک درزگیر - دفرمگی/پارگی (تعویض)";
  if (has(g, "مخزن نمک")) return "نشتی - درب مخزن نمک (تعمیر/آب‌بندی)";
  if (has(g, "براکت")) return "نشتی - براکت ریل (تعمیر/آب‌بندی)";
  if (has(g, "جاپودر")) return "نشتی - جاپودری (تعمیر/آب‌بندی)";
  if (has(g, "مقسم")) return "نشتی - مقسم آب (تعمیر/آب‌بندی)";
  if (has(g, "سنسور دما") || has(g, "ترموستات")) return "خرابی - ترموستات (تعویض)";
  if (has(g, "هيدروستات") || has(g, "هیدروستات")) return "خرابی - هیدروستات (تعویض)";
  if (has(g, "بلبرينگ") || has(g, "بلبرینگ")) return "خرابی - بلبرینگ (تعویض)";
  if (has(g, "شيربرق") || has(g, "شیربرق")) return "خرابی - شیربرقی (تعویض)";
  if (has(g, "واتر جت") || has(g, "واترجت")) return "خرابی - واترجت (تعویض)";
  if (has(g, "سيم") || has(g, "سیم") || has(g, "اتصال")) return "سیم‌کشی/اتصالات (تعویض/بازبینی)";
  if (has(g, "تصوير") || has(g, "تصویر")) return "برد نمایش تلویزیون (تعویض)";
  if (has(g, "ريموت") || has(g, "ریموت")) return "ریموت کنترل (تعویض/تعمیر)";
  if (has(g, "ال اي دي") || has(g, "ال ای دی") || has(g, "LED")) return "خرابی - لامپ/LED داخلی (تعویض)";
  if (has(g, "زنگ زدگ")) return "زنگ‌زدگی بدنه/قطعه (تعویض)";
  if (has(g, "قطعات تزئين") || has(g, "قطعات تزئین")) return "قطعات تزئینی - شکستگی/کسری (تعویض)";
  if (has(g, "سبد")) return "سبد ظرفشویی - شکستگی (تعویض)";
  if (has(g, "تاب درام")) return "خرابی - تاب برداشتن درام (تعویض)";
  if (has(g, "درام")) return "خرابی - سایر ایراد درام (تعویض)";
  if (has(g, "موتور")) return "خرابی - موتور (تعویض)";
  if (has(g, "تسمه")) return "خرابی - تسمه (تعویض)";
  if (has(g, "پيچ ولوم") || has(g, "پیچ ولوم")) return "تنظیم - پیچ ولوم/دکمه (تعمیر)";
  if (has(g, "کسري قطعات") || has(g, "کسری قطعات")) return "کسری قطعات تزئینی (تعویض)";
  if (has(g, "پرچ")) return "پرچ/بدنه کابین (تعمیر)";
  if (has(g, "نشت") || has(g, "آبريزش") || has(g, "آبریزش"))
    return "نشتی آب - محل نامشخص (نیازمند بازدید)";
  if (has(g, "درب")) return "سایر اجزای درب (بازبینی)";
  if (has(g, "ضربه")) return "بدنه/کابین - ضربه (بازبینی/تعویض پنل)";
  if (has(g, "تراز")) return "تراز/لرزش - نصب (رگلاژ پایه)";
  if (has(g, "تعویض") || has(g, "تعويض")) return "تعویض کامل دستگاه (Replacement)";
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
  if (has(complaint, "عهده شرکت")) return "شرکت";
  if (has(complaint, "عهده مشتري") || has(complaint, "عهده مشتری")) return "مشتری";
  return "نامشخص";
}

export function partCostFor(cause: string, product: string): number {
  if (cause === "تعویض کامل دستگاه (Replacement)") {
    return DEVICE_PRICE[product] ?? 0;
  }
  return PART_PRICE[cause] ?? 1_200_000;
}

const EMPTY_CAUSE = new Set(["", "سایر", "—", "-"]);

export function enrichRow(row: ServiceRow): ServiceRow {
  const monthName =
    row.monthName && MONTH_NAMES.includes(row.monthName as (typeof MONTH_NAMES)[number])
      ? row.monthName
      : MONTH_NAMES[Number(row.month.slice(5, 7)) - 1] ?? row.monthName;
  const cause = EMPTY_CAUSE.has(row.cause) ? classifyCause(row.failure) : row.cause;
  const ageMonths = row.ageMonths > 0 ? row.ageMonths : ageFromDates(row.acceptDate, row.installDate);
  const travelPayer = row.travelPayer || travelFromComplaint(row.complaint);
  const part = row.part === "*" || row.part === "—" ? "" : row.part;
  const laborCost = row.laborCost > 0 ? row.laborCost : LABOR;
  const partCost = row.partCost > 0 ? row.partCost : partCostFor(cause, row.product);
  const totalCost = row.totalCost > 0 ? row.totalCost : partCost + laborCost;
  return {
    ...row,
    monthName,
    cause,
    ageMonths,
    travelPayer,
    part,
    laborCost,
    partCost,
    totalCost,
  };
}

export function markRepeats(rows: ServiceRow[]): ServiceRow[] {
  const seen = new Map<string, number>();
  return rows.map((r, i) => {
    const key = r.serial || `row-${i}`;
    const n = (seen.get(key) ?? 0) + 1;
    seen.set(key, n);
    const repeat = n > 1;
    return {
      ...r,
      repeat,
      repeatCost: repeat ? r.laborCost : 0,
    };
  });
}
