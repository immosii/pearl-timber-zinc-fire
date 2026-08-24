import { i as __toESM } from "../_runtime.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as Slot, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ChartLine, a as TriangleAlert, c as Repeat, d as Menu, f as LayoutDashboard, g as ClipboardList, i as Upload, m as FileSpreadsheet, n as Wrench, o as Timer, p as FileText, r as Wallet, t as X, u as Package, v as Activity } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-TrlEDlzE.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var MONTH_NAMES = [
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
	"اسفند"
];
function pad2(n) {
	return n < 10 ? `0${n}` : String(n);
}
function monthKey(year, month) {
	return `${year}-${pad2(month)}`;
}
function parseMonthKey(key) {
	const [y, m] = key.split("-").map(Number);
	return {
		year: y ?? 1404,
		month: m ?? 1
	};
}
function formatMonth(key) {
	const { year, month } = parseMonthKey(key);
	return `${MONTH_NAMES[month - 1] ?? MONTH_NAMES[0]} ${toFaDigits(year)}`;
}
function formatMonthShort(key) {
	const { month } = parseMonthKey(key);
	return MONTH_NAMES[month - 1] ?? key;
}
function toFaDigits(value) {
	const map = [
		"۰",
		"۱",
		"۲",
		"۳",
		"۴",
		"۵",
		"۶",
		"۷",
		"۸",
		"۹"
	];
	return String(value).replace(/\d/g, (d) => map[Number(d)] ?? d);
}
function prevMonth(key) {
	const { year, month } = parseMonthKey(key);
	if (month === 1) return monthKey(year - 1, 12);
	return monthKey(year, month - 1);
}
function formatJalaliDate(keyDate) {
	const parts = keyDate.split("-").map(Number);
	const y = parts[0] ?? 1404;
	const m = parts[1] ?? 1;
	return `${toFaDigits(pad2(parts[2] ?? 1))} ${MONTH_NAMES[m - 1]} ${toFaDigits(y)}`;
}
function compareMonthKeys(a, b) {
	return a.localeCompare(b);
}
function uniqueSortedMonths(keys) {
	return Array.from(new Set(keys)).sort(compareMonthKeys);
}
function applyFilters(rows, filters) {
	return rows.filter((r) => {
		if (filters.product && r.product !== filters.product) return false;
		if (filters.cause && r.cause !== filters.cause) return false;
		if (filters.model && r.model !== filters.model) return false;
		return true;
	});
}
function inMonth(rows, month) {
	if (month === "all") return rows;
	return rows.filter((r) => r.month === month);
}
function monthsOf(rows) {
	return uniqueSortedMonths(rows.map((r) => r.month));
}
function uniqueValues(rows, key) {
	return Array.from(new Set(rows.map((r) => String(r[key] || "").trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b, "fa"));
}
function sumBy(rows, fn) {
	let s = 0;
	for (const r of rows) s += fn(r);
	return s;
}
function groupBy(rows, key) {
	const map = /* @__PURE__ */ new Map();
	for (const r of rows) {
		const k = key(r) || "نامشخص";
		const cur = map.get(k) ?? {
			count: 0,
			cost: 0,
			age: 0
		};
		cur.count += 1;
		cur.cost += r.totalCost;
		cur.age += r.ageMonths;
		map.set(k, cur);
	}
	const total = rows.length || 1;
	return Array.from(map.entries()).map(([name, v]) => ({
		name,
		count: v.count,
		cost: v.cost,
		share: v.count / total * 100,
		avgAge: v.count ? v.age / v.count : 0,
		avgCost: v.count ? v.cost / v.count : 0
	})).sort((a, b) => b.count - a.count);
}
function pctDelta(cur, prev) {
	if (!prev) return cur ? 100 : 0;
	return (cur - prev) / Math.abs(prev) * 100;
}
function computeKpis(rows, month, prevMonth) {
	const cur = inMonth(rows, month);
	const prev = month === "all" ? [] : inMonth(rows, prevMonth);
	const visits = cur.length;
	const prevVisits = prev.length;
	const cost = sumBy(cur, (r) => r.totalCost);
	const prevCost = sumBy(prev, (r) => r.totalCost);
	const repeats = cur.filter((r) => r.repeat).length;
	return {
		visits,
		prevVisits,
		visitDelta: month === "all" ? 0 : pctDelta(visits, prevVisits),
		cost,
		prevCost,
		costDelta: month === "all" ? 0 : pctDelta(cost, prevCost),
		avgCost: visits ? cost / visits : 0,
		avgAge: visits ? sumBy(cur, (r) => r.ageMonths) / visits : 0,
		repeats,
		repeatShare: visits ? repeats / visits * 100 : 0,
		repeatCost: sumBy(cur, (r) => r.repeatCost),
		partCost: sumBy(cur, (r) => r.partCost),
		laborCost: sumBy(cur, (r) => r.laborCost),
		products: new Set(cur.map((r) => r.product)).size,
		models: new Set(cur.map((r) => r.model)).size
	};
}
function monthlySeries(rows) {
	return monthsOf(rows).map((month) => {
		const cur = inMonth(rows, month);
		return {
			month,
			visits: cur.length,
			cost: sumBy(cur, (r) => r.totalCost),
			repeats: cur.filter((r) => r.repeat).length,
			avgAge: cur.length ? sumBy(cur, (r) => r.ageMonths) / cur.length : 0
		};
	});
}
function ageBuckets(rows) {
	return [
		{
			name: "۰–۳ زودهنگام",
			min: -99,
			max: 3
		},
		{
			name: "۴–۶",
			min: 4,
			max: 6
		},
		{
			name: "۷–۹",
			min: 7,
			max: 9
		},
		{
			name: "۱۰–۱۲",
			min: 10,
			max: 12
		},
		{
			name: "۱۳+ دیرهنگام",
			min: 13,
			max: 999
		}
	].map((b) => ({
		name: b.name,
		count: rows.filter((r) => r.ageMonths >= b.min && r.ageMonths <= b.max).length
	}));
}
function causePriority(stat, total) {
	if (stat.count >= 10 && stat.avgAge <= 5) return {
		label: "بحرانی",
		tone: "bad",
		note: "حجم بالا و خرابی زودهنگام — اولویت بازبینی تأمین‌کننده"
	};
	if (stat.count >= 15) return {
		label: "حجم بالا",
		tone: "warn",
		note: "احتمالاً فرآیندی (نصب/تنظیم) یا قطعه پرمصرف"
	};
	if (stat.avgAge <= 3 && stat.count >= 2 && stat.count < 8) return {
		label: "پایش ویژه",
		tone: "warn",
		note: "خرابی زودهنگام با حجم کم — جمع‌آوری داده بیشتر"
	};
	if (stat.count >= 8) return {
		label: "پایش دوره‌ای",
		tone: "muted",
		note: "حجم متوسط، عمر نسبتاً طبیعی"
	};
	return {
		label: "عادی",
		tone: "muted",
		note: "حجم کم و عمر طبیعی"
	};
}
function heatmap(rows, causes) {
	const products = uniqueValues(rows, "product");
	const map = /* @__PURE__ */ new Map();
	for (const r of rows) {
		const k = `${r.product}||${r.cause}`;
		map.set(k, (map.get(k) ?? 0) + 1);
	}
	let max = 1;
	return {
		products,
		causes,
		cells: products.map((product) => {
			const vals = causes.map((cause) => map.get(`${product}||${cause}`) ?? 0);
			max = Math.max(max, ...vals);
			return {
				product,
				vals
			};
		}),
		max
	};
}
function repeatSerials(rows) {
	const map = /* @__PURE__ */ new Map();
	for (const r of rows) {
		const cur = map.get(r.serial) ?? {
			count: 0,
			cost: 0,
			product: r.product,
			model: r.model
		};
		cur.count += 1;
		cur.cost += r.repeatCost || (r.repeat ? r.laborCost : 0);
		map.set(r.serial, cur);
	}
	return Array.from(map.entries()).filter(([, v]) => v.count > 1).map(([serial, v]) => ({
		serial,
		...v
	})).sort((a, b) => b.count - a.count || b.cost - a.cost);
}
function buildInsights(rows) {
	if (rows.length === 0) return [];
	const out = [];
	const products = groupBy(rows, (r) => r.product);
	const causes = groupBy(rows, (r) => r.cause);
	const parts = groupBy(rows.filter((r) => r.part), (r) => r.part);
	const topP = products[0];
	const topC = causes[0];
	if (topP) out.push({
		tone: "info",
		title: "قطب مراجعات",
		body: `${topP.name} با ${fa(topP.count)} مراجعه (${fa(topP.share)}٪) پرتکرارترین دستگاه دوره است.`
	});
	const earlyPart = [...parts].filter((p) => p.count >= 4).sort((a, b) => a.avgAge - b.avgAge)[0];
	if (earlyPart && earlyPart.avgAge <= 5) out.push({
		tone: "bad",
		title: "خرابی زودهنگام قطعه",
		body: `«${earlyPart.name}» با میانگین ${fa(earlyPart.avgAge)} ماه تا خرابی و ${fa(earlyPart.count)} مورد، زودتر از عمر طبیعی از کار می‌افتد.`
	});
	const boards = rows.filter((r) => r.cause.includes("برد"));
	const boardCost = sumBy(boards, (r) => r.partCost);
	if (boards.length >= 8) out.push({
		tone: "warn",
		title: "بار مالی برد الکترونیک",
		body: `${fa(boards.length)} مورد تعویض برد با حدود ${money(boardCost)} تومان هزینه قطعه — بازبینی تأمین‌کننده برد اولویت هزینه است.`
	});
	const level = rows.filter((r) => r.cause.includes("تراز") || r.cause.includes("رگلاژ"));
	if (level.length >= 10) out.push({
		tone: "warn",
		title: "نصب ناقص، نه قطعه",
		body: `${fa(level.length)} مراجعه فقط با رگلاژ پایه بسته شده. آموزش نصب یا الزام تراز مستند این اعزام‌ها را حذف می‌کند.`
	});
	const repeats = rows.filter((r) => r.repeat);
	if (repeats.length) out.push({
		tone: repeats.length / rows.length >= .12 ? "warn" : "info",
		title: "مراجعه تکراری",
		body: `${fa(repeats.length)} ردیف روی سریال تکراری ثبت شده؛ هزینه ضرر تکرار ${money(sumBy(rows, (r) => r.repeatCost))} تومان است.`
	});
	if (topC && out.length < 5) out.push({
		tone: "info",
		title: "علت غالب",
		body: `«${topC.name}» با ${fa(topC.count)} مورد (${fa(topC.share)}٪) و میانگین ${fa(topC.avgAge)} ماه تا خرابی، الگوی اصلی دوره است.`
	});
	return out.slice(0, 5);
}
function fa(n) {
	return n.toLocaleString("fa-IR", { maximumFractionDigits: 1 });
}
function money(n) {
	const abs = Math.abs(n);
	if (abs >= 1e9) return `${(abs / 1e9).toLocaleString("fa-IR", { maximumFractionDigits: 1 })} میلیارد`;
	return `${(abs / 1e6).toLocaleString("fa-IR", { maximumFractionDigits: 1 })} میلیون`;
}
var arta_records_default = /*#__PURE__*/ JSON.parse("[{\"id\":\"760484\",\"ticket\":\"760484\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"210100007N00317\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از جاپودری\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1402-12-26\",\"installDate\":\"1402-12-26\",\"ageMonths\":25,\"cause\":\"نشتی - جاپودری (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"760495\",\"ticket\":\"760495\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01136\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"اصلاح دمپر پلاستیکی\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-04-28\",\"installDate\":\"1404-04-25\",\"ageMonths\":9,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"765741\",\"ticket\":\"765741\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N02021\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی برد\",\"acceptDate\":\"1405-01-26\",\"produceDate\":\"1403-09-13\",\"installDate\":\"1404-12-03\",\"ageMonths\":2,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد ساید بای ساید\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"761565\",\"ticket\":\"761565\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N01428\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"بدون مورد و اجرت\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-11-02\",\"installDate\":\"1404-01-30\",\"ageMonths\":12,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"764237\",\"ticket\":\"764237\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N01662\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"بدون مورد و اجرت\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1403-11-09\",\"installDate\":\"1404-04-21\",\"ageMonths\":10,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"764504\",\"ticket\":\"764504\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال مینی\",\"model\":\"CM-RS5BK1\",\"serial\":\"52240002N00838\",\"complaint\":\"گرم شدن محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی ترموستات\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1403-12-11\",\"installDate\":\"1404-05-31\",\"ageMonths\":8,\"cause\":\"خرابی - ترموستات (تعویض)\",\"part\":\"ترموستات مینی\",\"travelPayer\":\"شرکت\",\"partCost\":2000000,\"laborCost\":1100000,\"totalCost\":3100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"765575\",\"ticket\":\"765575\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N02595\",\"complaint\":\"خطای F54ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی شیلنگ تخلیه\",\"acceptDate\":\"1405-01-25\",\"produceDate\":\"1404-02-05\",\"installDate\":\"1404-06-04\",\"ageMonths\":8,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"761626\",\"ticket\":\"761626\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210007N00625\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-02-11\",\"installDate\":\"1404-04-25\",\"ageMonths\":9,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"762981\",\"ticket\":\"762981\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210008N00610\",\"complaint\":\"صدای غیرعادی هنگام خشک کن\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-17\",\"produceDate\":\"1404-02-13\",\"installDate\":\"1404-07-13\",\"ageMonths\":7,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"نامشخص\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"761052\",\"ticket\":\"761052\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210008N00788\",\"complaint\":\"لرزش و حرکت محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-02-22\",\"installDate\":\"1404-08-11\",\"ageMonths\":6,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"764368\",\"ticket\":\"764368\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N02936\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی پمپ تخلیه\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1404-03-06\",\"installDate\":\"1404-08-01\",\"ageMonths\":6,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"نشتی پمپ ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"760111\",\"ticket\":\"760111\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N02241\",\"complaint\":\"خطای F54  —  ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی درب مخزن نمک\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-04-09\",\"installDate\":\"1404-12-17\",\"ageMonths\":1,\"cause\":\"نشتی - درب مخزن نمک (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"765793\",\"ticket\":\"765793\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210009N01809\",\"complaint\":\"دفرمگی نوار دور درب  —  ایاب و ذهاب به عهده شرکت\",\"failure\":\"دفرمگی نوار گسگت\",\"acceptDate\":\"1405-01-26\",\"produceDate\":\"1404-05-21\",\"installDate\":\"1404-11-12\",\"ageMonths\":3,\"cause\":\"لاستیک درزگیر - دفرمگی/پارگی (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"763201\",\"ticket\":\"763201\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N03892\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی پمپ تخلیه\",\"acceptDate\":\"1405-01-18\",\"produceDate\":\"1404-07-14\",\"installDate\":\"1404-08-11\",\"ageMonths\":6,\"cause\":\"خرابی - پمپ تخلیه (تعویض)\",\"part\":\"پمپ تخلیه ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":3000000,\"laborCost\":1100000,\"totalCost\":4100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"760655\",\"ticket\":\"760655\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210010N01699\",\"complaint\":\"از کار افتادن محصول  —  ایاب و ذهاب به عهده شرکت\",\"failure\":\"تنظیم سوکت برد\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-07-17\",\"installDate\":\"1404-08-07\",\"ageMonths\":6,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130003087\",\"ticket\":\"130003087\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N04234\",\"complaint\":\"خطای F54ایاب و ذهاب به عهده شرکت\",\"failure\":\"بدون مورد و اجرت\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-08-08\",\"installDate\":\"1404-10-10\",\"ageMonths\":4,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"763731\",\"ticket\":\"763731\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N04863\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"بدون مورد و اجرت\",\"acceptDate\":\"1405-01-19\",\"produceDate\":\"1404-08-22\",\"installDate\":\"1404-10-24\",\"ageMonths\":3,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"764016\",\"ticket\":\"764016\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N04894\",\"complaint\":\"عدم تخلیه آب تمیز داخل درام — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی شیلنگ ورودی\",\"acceptDate\":\"1405-01-20\",\"produceDate\":\"1404-08-24\",\"installDate\":\"1405-01-19\",\"ageMonths\":1,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"765427\",\"ticket\":\"765427\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N05131\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی پمپ تخلیه\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1404-08-29\",\"installDate\":\"1404-09-09\",\"ageMonths\":5,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"نشتی پمپ ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810003206\",\"ticket\":\"810003206\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210007N00625\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-02-11\",\"installDate\":\"1404-04-25\",\"ageMonths\":9,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210004815\",\"ticket\":\"210004815\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8V1\",\"serial\":\"52210003N01998\",\"complaint\":\"جمع شدن آب داخل محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی شیربرقی\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1404-04-28\",\"installDate\":\"1404-07-07\",\"ageMonths\":7,\"cause\":\"خرابی - شیربرقی (تعویض)\",\"part\":\"شیر برقی لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":1800000,\"laborCost\":1100000,\"totalCost\":2900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210004823\",\"ticket\":\"210004823\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N02355\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-01-31\",\"produceDate\":\"1404-01-26\",\"installDate\":\"1404-05-14\",\"ageMonths\":9,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 16 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510018164\",\"ticket\":\"510018164\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210007N00839\",\"complaint\":\"پارگی نوار دور درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"پارگی لاستیک\",\"acceptDate\":\"1405-01-29\",\"produceDate\":\"1404-03-04\",\"installDate\":\"1404-04-02\",\"ageMonths\":10,\"cause\":\"لاستیک درزگیر - دفرمگی/پارگی (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210005374\",\"ticket\":\"210005374\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N00523\",\"complaint\":\"عدم کارکرد یخساز — مجدد — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی برد - عدم کارکرد یخساز - ساید بای ساید\",\"acceptDate\":\"1405-01-29\",\"produceDate\":\"1403-03-27\",\"installDate\":\"1403-09-03\",\"ageMonths\":18,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد ساید بای ساید\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004231\",\"ticket\":\"130004231\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210005N01155\",\"complaint\":\"جمع شدن آب داخل محصول — ایاب و ذهاب به عهده مشتری\",\"failure\":\"خرابی شیربرقی\",\"acceptDate\":\"1405-01-29\",\"produceDate\":\"1403-02-17\",\"installDate\":\"1403-08-27\",\"ageMonths\":18,\"cause\":\"خرابی - شیربرقی (تعویض)\",\"part\":\"شیر برقی لباسشویی\",\"travelPayer\":\"مشتری\",\"partCost\":1800000,\"laborCost\":1100000,\"totalCost\":2900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210005449\",\"ticket\":\"210005449\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال مینی\",\"model\":\"CM-RS5BK1\",\"serial\":\"52240002N01230\",\"complaint\":\"ایاب و ذهاب به عهده شرکت خاموش بودن LED کاور / سقفی\",\"failure\":\"خرابی ال ای دی داخل کابین - یخچال مینی\",\"acceptDate\":\"1405-01-29\",\"produceDate\":\"1404-05-22\",\"installDate\":\"1404-08-10\",\"ageMonths\":6,\"cause\":\"خرابی - لامپ/LED داخلی (تعویض)\",\"part\":\"لامپ مینی\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004712\",\"ticket\":\"130004712\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210008N00836\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی پمپ تخلیه\",\"acceptDate\":\"1405-01-26\",\"produceDate\":\"1404-03-04\",\"installDate\":\"1404-05-21\",\"ageMonths\":9,\"cause\":\"خرابی - پمپ تخلیه (تعویض)\",\"part\":\"پمپ تخلیه لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":3000000,\"laborCost\":1100000,\"totalCost\":4100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004239\",\"ticket\":\"130004239\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01972\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی برد - عدم کارکرد یخساز - ساید بای ساید\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1403-09-08\",\"installDate\":\"1404-12-09\",\"ageMonths\":2,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد ساید بای ساید\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210005441\",\"ticket\":\"210005441\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01596\",\"complaint\":\"ایاب و ذهاب به عهده شرکت — جدا شدن قالب یخساز\",\"failure\":\"اصلاح دمپر پلاستیکی پشت کابین - ساید بای ساید\",\"acceptDate\":\"1405-01-29\",\"produceDate\":\"1403-07-22\",\"installDate\":\"1404-04-16\",\"ageMonths\":10,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004236\",\"ticket\":\"130004236\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N00628\",\"complaint\":\"عدم شست و شوی کامل ظروف — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تنظیم دیسپلی ( مایع جلادهنده/ صدای دیسپلی)\",\"acceptDate\":\"1405-01-23\",\"produceDate\":\"1403-08-10\",\"installDate\":\"1404-05-05\",\"ageMonths\":9,\"cause\":\"تنظیم - تنظیمات دستگاه/دیسپلی (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210004811\",\"ticket\":\"210004811\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"210100007N00366\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از شیلنگ تخلیه آب\",\"acceptDate\":\"1405-01-19\",\"produceDate\":\"1403-01-11\",\"installDate\":\"1404-11-02\",\"ageMonths\":3,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"710000446\",\"ticket\":\"710000446\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N02498\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-02-01\",\"installDate\":\"1404-12-23\",\"ageMonths\":1,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 16 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"310000306\",\"ticket\":\"310000306\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N01360\",\"complaint\":\"عدم شست و شوی کامل ظروف — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی شیربرقی\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-11-02\",\"installDate\":\"1404-11-28\",\"ageMonths\":2,\"cause\":\"خرابی - شیربرقی (تعویض)\",\"part\":\"شیر برقی ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":1800000,\"laborCost\":1100000,\"totalCost\":2900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510017937\",\"ticket\":\"510017937\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8V1\",\"serial\":\"52210003N01598\",\"complaint\":\"عدم عملکرد کلیدهای دیسپلی ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی برد - عدم عملکرد کلیدهای دیسپلی\",\"acceptDate\":\"1405-01-15\",\"produceDate\":\"1404-02-25\",\"installDate\":\"1404-07-13\",\"ageMonths\":7,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004876\",\"ticket\":\"130004876\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N02754\",\"complaint\":\"بسته نشدن درب ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-08-14\",\"installDate\":\"1405-01-03\",\"ageMonths\":1,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 15 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210004764\",\"ticket\":\"210004764\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N03644\",\"complaint\":\"از کار افتادن محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"ترک در زیر بدنه و شکستگی حوضچه مخزن نمک\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-06-31\",\"installDate\":\"1404-12-26\",\"ageMonths\":1,\"cause\":\"نشتی - درب مخزن نمک (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810001653\",\"ticket\":\"810001653\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"210100007N00374\",\"complaint\":\"عدم عملکرد کلیدهای دیسپلی — ایاب و ذهاب به عهده مشتری\",\"failure\":\"خرابی برد - عدم عملکرد کلیدهای دیسپلی\",\"acceptDate\":\"1405-01-18\",\"produceDate\":\"1403-01-11\",\"installDate\":\"1405-01-06\",\"ageMonths\":1,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد لباسشویی\",\"travelPayer\":\"مشتری\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210004827\",\"ticket\":\"210004827\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01238\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"شکستگی کاور بالای یخساز - ساید بای ساید\",\"acceptDate\":\"1405-01-19\",\"produceDate\":\"1403-05-17\",\"installDate\":\"1403-05-17\",\"ageMonths\":21,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210006383\",\"ticket\":\"210006383\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"210100005N00006\",\"complaint\":\"ایاب و ذهاب به عهده مشتری بسته نشدن درب\",\"failure\":\"خرابی میکروسوئیچ\",\"acceptDate\":\"1405-01-19\",\"produceDate\":\"1402-08-15\",\"installDate\":\"1405-01-15\",\"ageMonths\":1,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ لباسشویی\",\"travelPayer\":\"مشتری\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"310000300\",\"ticket\":\"310000300\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"210100006N00072\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده مشتری\",\"failure\":\"تاب درام\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1402-09-19\",\"installDate\":\"1404-04-29\",\"ageMonths\":9,\"cause\":\"خرابی - تاب برداشتن درام (تعویض)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":23000000,\"laborCost\":1100000,\"totalCost\":24100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210004819\",\"ticket\":\"210004819\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210010N01829\",\"complaint\":\"لرزش و حرکت محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تاب درام\",\"acceptDate\":\"1405-01-27\",\"produceDate\":\"1404-06-22\",\"installDate\":\"1403-04-18\",\"ageMonths\":22,\"cause\":\"خرابی - تاب برداشتن درام (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":23000000,\"laborCost\":1100000,\"totalCost\":24100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210004817\",\"ticket\":\"210004817\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210010N00366\",\"complaint\":\"لرزش و حرکت محصول — صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-30\",\"produceDate\":\"1403-11-23\",\"installDate\":\"1405-01-20\",\"ageMonths\":1,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810001656\",\"ticket\":\"810001656\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N02458\",\"complaint\":\"عدم شست و شوی کامل ظروف — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی هیدروستات\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-01-26\",\"installDate\":\"1405-01-08\",\"ageMonths\":1,\"cause\":\"خرابی - هیدروستات (تعویض)\",\"part\":\"هیدروستات ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":1700000,\"laborCost\":1100000,\"totalCost\":2800000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"710000247\",\"ticket\":\"710000247\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N01671\",\"complaint\":\"خطای F54ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی پمپ تخلیه\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-11-09\",\"installDate\":\"1403-11-09\",\"ageMonths\":15,\"cause\":\"خرابی - پمپ تخلیه (تعویض)\",\"part\":\"پمپ تخلیه ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":3000000,\"laborCost\":1100000,\"totalCost\":4100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510018481\",\"ticket\":\"510018481\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210008N01227\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"پارگی لاستیک\",\"acceptDate\":\"1405-01-20\",\"produceDate\":\"1404-05-12\",\"installDate\":\"1405-01-05\",\"ageMonths\":1,\"cause\":\"لاستیک درزگیر - دفرمگی/پارگی (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810003180\",\"ticket\":\"810003180\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"210100007N00317\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از جاپودری\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1402-12-26\",\"installDate\":\"1405-01-06\",\"ageMonths\":1,\"cause\":\"نشتی - جاپودری (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"510019851\",\"ticket\":\"510019851\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210009N01186\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت — مجدد\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-04-19\",\"installDate\":\"1405-01-20\",\"ageMonths\":0,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130006212\",\"ticket\":\"130006212\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N01428\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-11-02\",\"installDate\":\"1403-11-02\",\"ageMonths\":15,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 16 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"510018492\",\"ticket\":\"510018492\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N02794\",\"complaint\":\"بسته نشدن درب ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-01-18\",\"produceDate\":\"1404-08-28\",\"installDate\":\"1404-12-09\",\"ageMonths\":2,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 15 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210010946\",\"ticket\":\"210010946\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N02580\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"ریست دستگاه - ظرفشویی\",\"acceptDate\":\"1405-01-19\",\"produceDate\":\"1404-02-05\",\"installDate\":\"1403-10-30\",\"ageMonths\":15,\"cause\":\"ریست نرم‌افزاری (بدون قطعه)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":700000,\"laborCost\":1100000,\"totalCost\":1800000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004793\",\"ticket\":\"130004793\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N02226\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی درب مخزن نمک\",\"acceptDate\":\"1405-01-23\",\"produceDate\":\"1404-04-09\",\"installDate\":\"1403-10-27\",\"ageMonths\":16,\"cause\":\"نشتی - درب مخزن نمک (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210010892\",\"ticket\":\"210010892\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210009N01809\",\"complaint\":\"دفرمگی نوار دور درب ایاب و ذهاب به عهده شرکت\",\"failure\":\"دفرمگی لاستیک\",\"acceptDate\":\"1405-01-26\",\"produceDate\":\"1404-05-21\",\"installDate\":\"1404-05-21\",\"ageMonths\":9,\"cause\":\"لاستیک درزگیر - دفرمگی/پارگی (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"510018453\",\"ticket\":\"510018453\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N01583\",\"complaint\":\"تعویض لوگو — ایاب و ذهاب به عهده شرکت\",\"failure\":\"کسری قطعات تزئینی داخل کابین - ظرفشویی\",\"acceptDate\":\"1405-01-27\",\"produceDate\":\"1403-12-04\",\"installDate\":\"1405-02-13\",\"ageMonths\":0,\"cause\":\"قطعات تزئینی - شکستگی/کسری (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"710002117\",\"ticket\":\"710002117\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H13V\",\"serial\":\"210140001N00091\",\"complaint\":\"خطای F54 ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی از جا قرصی\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1402-10-21\",\"installDate\":\"1403-02-04\",\"ageMonths\":24,\"cause\":\"نشتی آب - محل نامشخص (نیازمند بازدید)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810003215\",\"ticket\":\"810003215\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N04785\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده مشتری\",\"failure\":\"گرفتگی پمپ تخلیه - غیر گارانتی\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-08-22\",\"installDate\":\"1404-03-07\",\"ageMonths\":11,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130006543\",\"ticket\":\"130006543\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N02241\",\"complaint\":\"خطای F54  —  ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی اورینگ مخزن نمک\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-04-09\",\"installDate\":\"1404-04-09\",\"ageMonths\":10,\"cause\":\"نشتی - درب مخزن نمک (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210011141\",\"ticket\":\"210011141\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N00355\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده مشتری\",\"failure\":\"گرفتگی پمپ تخلیه - غیر گارانتی\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-07-27\",\"installDate\":\"1403-07-27\",\"ageMonths\":18,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210011071\",\"ticket\":\"210011071\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210006N00699\",\"complaint\":\"بسته نشدن درب — ایاب و ذهاب به عهده مشتری\",\"failure\":\"عدم قرارگیری مهره درب\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-02-05\",\"installDate\":\"1403-12-09\",\"ageMonths\":14,\"cause\":\"سایر اجزای درب (بازبینی)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":1000000,\"laborCost\":1100000,\"totalCost\":2100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004825\",\"ticket\":\"130004825\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210007N01247\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از لاستیک دور درب\",\"acceptDate\":\"1405-01-18\",\"produceDate\":\"1404-05-09\",\"installDate\":\"1404-09-27\",\"ageMonths\":4,\"cause\":\"لاستیک درزگیر - دفرمگی/پارگی (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004237\",\"ticket\":\"130004237\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N04878\",\"complaint\":\"عدم شست و شوی کامل ظروف — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی واترجت\",\"acceptDate\":\"1405-01-20\",\"produceDate\":\"1404-08-22\",\"installDate\":\"1404-11-04\",\"ageMonths\":3,\"cause\":\"خرابی - واترجت (تعویض)\",\"part\":\"واترجت ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":4000000,\"laborCost\":1100000,\"totalCost\":5100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130006264\",\"ticket\":\"130006264\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N03807\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"ریست دستگاه - ظرفشویی\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1404-07-07\",\"installDate\":\"1404-08-13\",\"ageMonths\":6,\"cause\":\"ریست نرم‌افزاری (بدون قطعه)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":700000,\"laborCost\":1100000,\"totalCost\":1800000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810003208\",\"ticket\":\"810003208\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N01514\",\"complaint\":\"باز شدن درب حین شست و شو ایاب و ذهاب به عهده شرکت\",\"failure\":\"ریست دستگاه - ظرفشویی\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1403-11-01\",\"installDate\":\"1404-09-02\",\"ageMonths\":5,\"cause\":\"ریست نرم‌افزاری (بدون قطعه)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":700000,\"laborCost\":1100000,\"totalCost\":1800000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510019989\",\"ticket\":\"510019989\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N02711\",\"complaint\":\"بسته نشدن درب ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-01-23\",\"produceDate\":\"1404-08-14\",\"installDate\":\"1405-01-22\",\"ageMonths\":1,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 15 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810003207\",\"ticket\":\"810003207\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210008N01023\",\"complaint\":\"صدای غیرعادی هنگام خشک کن ایاب و ذهاب به عهده شرکت\",\"failure\":\"برخورد شیلنگ رابط هوا به درام فلزی\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1404-04-12\",\"installDate\":\"1404-08-20\",\"ageMonths\":6,\"cause\":\"شیلنگ - برخورد/لهیدگی (بازبینی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510020027\",\"ticket\":\"510020027\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"210140002N00260\",\"complaint\":\"باز شدن درب حین شست و شو ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1404-05-01\",\"installDate\":\"1404-05-02\",\"ageMonths\":9,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 15 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004710\",\"ticket\":\"130004710\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N02840\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-01-26\",\"produceDate\":\"1404-02-30\",\"installDate\":\"1404-10-15\",\"ageMonths\":4,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 16 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004708\",\"ticket\":\"130004708\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H13V\",\"serial\":\"52220001N00786\",\"complaint\":\"خطای F54 ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی مهره مخزن نمک\",\"acceptDate\":\"1405-01-26\",\"produceDate\":\"1403-07-25\",\"installDate\":\"1404-09-12\",\"ageMonths\":5,\"cause\":\"نشتی - درب مخزن نمک (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004703\",\"ticket\":\"130004703\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N04970\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-01-27\",\"produceDate\":\"1404-09-02\",\"installDate\":\"1404-12-05\",\"ageMonths\":2,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 16 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210011129\",\"ticket\":\"210011129\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N03782\",\"complaint\":\"افتادگی درب/ تنظیم درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"لولا تنظیم / رگلاژ درب\",\"acceptDate\":\"1405-01-27\",\"produceDate\":\"1404-07-28\",\"installDate\":\"1404-10-23\",\"ageMonths\":4,\"cause\":\"مکانیزم درب - لولا (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004235\",\"ticket\":\"130004235\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N01975\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-01-29\",\"produceDate\":\"1403-12-06\",\"installDate\":\"1404-06-17\",\"ageMonths\":8,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 16 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810001819\",\"ticket\":\"810001819\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N05167\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-01-29\",\"produceDate\":\"1404-08-28\",\"installDate\":\"1405-01-25\",\"ageMonths\":1,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 16 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510019960\",\"ticket\":\"510019960\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210005N01679\",\"complaint\":\"بسته نشدن درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"عدم قرارگیری مهره درب\",\"acceptDate\":\"1405-01-29\",\"produceDate\":\"1404-03-12\",\"installDate\":\"1404-07-21\",\"ageMonths\":7,\"cause\":\"سایر اجزای درب (بازبینی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1000000,\"laborCost\":1100000,\"totalCost\":2100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810001791\",\"ticket\":\"810001791\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210009N00298\",\"complaint\":\"جمع شدن آب داخل محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی شیربرقی\",\"acceptDate\":\"1405-01-29\",\"produceDate\":\"1403-11-29\",\"installDate\":\"1404-12-21\",\"ageMonths\":2,\"cause\":\"خرابی - شیربرقی (تعویض)\",\"part\":\"شیر برقی لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":1800000,\"laborCost\":1100000,\"totalCost\":2900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004844\",\"ticket\":\"130004844\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"تلویزیون\",\"model\":\"CTV-55UHJS2\",\"serial\":\"52230003N00664\",\"complaint\":\"عدم عملکرد ریموت کنترل — ایاب و ذهاب به عهده مشتری\",\"failure\":\"ایراد در ریموت کنترل\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-08-13\",\"installDate\":\"1403-09-29\",\"ageMonths\":16,\"cause\":\"ریموت کنترل (تعویض/تعمیر)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":3000000,\"laborCost\":1100000,\"totalCost\":4100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510018102\",\"ticket\":\"510018102\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"210100004N00372\",\"complaint\":\"دفرمگی نوار دور درب ایاب و ذهاب به عهده مشتری\",\"failure\":\"دفرمگی لاستیک\",\"acceptDate\":\"1405-01-12\",\"produceDate\":\"1403-06-17\",\"installDate\":\"1403-06-17\",\"ageMonths\":20,\"cause\":\"لاستیک درزگیر - دفرمگی/پارگی (تعویض)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210006481\",\"ticket\":\"210006481\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210006N01491\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی بلبرینگ\",\"acceptDate\":\"1405-01-15\",\"produceDate\":\"1404-05-08\",\"installDate\":\"1404-09-17\",\"ageMonths\":4,\"cause\":\"خرابی - بلبرینگ (تعویض)\",\"part\":\"بلبرینگ لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":7000000,\"laborCost\":1100000,\"totalCost\":8100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210011577\",\"ticket\":\"210011577\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210006N01611\",\"complaint\":\"خطای LE ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از شیلنگ ورودی آب\",\"acceptDate\":\"1405-01-18\",\"produceDate\":\"1404-06-24\",\"installDate\":\"1404-07-15\",\"ageMonths\":7,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210011525\",\"ticket\":\"210011525\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N02140\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر / غیرگارانتی - ساید بای ساید\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-10-16\",\"installDate\":\"1404-05-04\",\"ageMonths\":9,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210011406\",\"ticket\":\"210011406\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01659\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر / غیرگارانتی - ساید بای ساید\",\"acceptDate\":\"1405-01-17\",\"produceDate\":\"1403-08-30\",\"installDate\":\"1404-05-13\",\"ageMonths\":9,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130006277\",\"ticket\":\"130006277\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N05131\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی پمپ تخلیه\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1404-08-29\",\"installDate\":\"1404-09-09\",\"ageMonths\":5,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210011669\",\"ticket\":\"210011669\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01024\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر / غیرگارانتی - ساید بای ساید\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-04-13\",\"installDate\":\"1404-06-04\",\"ageMonths\":8,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210006037\",\"ticket\":\"210006037\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال مینی\",\"model\":\"MINI-R (BK01)\",\"serial\":\"52240002N00380\",\"complaint\":\"رنگ پریدگی درب ایاب و ذهاب به عهده شرکت\",\"failure\":\"رنگ پریدگی درب - یخچال مینی\",\"acceptDate\":\"1405-01-19\",\"produceDate\":\"1403-10-26\",\"installDate\":\"1403-10-26\",\"ageMonths\":15,\"cause\":\"سایر اجزای درب (بازبینی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1000000,\"laborCost\":1100000,\"totalCost\":2100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"710002358\",\"ticket\":\"710002358\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N04863\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"ریست دستگاه - ظرفشویی\",\"acceptDate\":\"1405-01-19\",\"produceDate\":\"1404-08-22\",\"installDate\":\"1404-10-24\",\"ageMonths\":3,\"cause\":\"ریست نرم‌افزاری (بدون قطعه)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":700000,\"laborCost\":1100000,\"totalCost\":1800000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210011917\",\"ticket\":\"210011917\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N04894\",\"complaint\":\"عدم تخلیه آب تمیز داخل درام — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از شیلنگ ورودی\",\"acceptDate\":\"1405-01-20\",\"produceDate\":\"1404-08-24\",\"installDate\":\"1405-01-19\",\"ageMonths\":1,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210012126\",\"ticket\":\"210012126\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N01662\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"ریست دستگاه - ظرفشویی\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1403-11-09\",\"installDate\":\"1404-04-21\",\"ageMonths\":10,\"cause\":\"ریست نرم‌افزاری (بدون قطعه)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":700000,\"laborCost\":1100000,\"totalCost\":1800000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210012002\",\"ticket\":\"210012002\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال مینی\",\"model\":\"CM-RS5BK1\",\"serial\":\"52240002N00838\",\"complaint\":\"گرم شدن محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی ترموستات - یخچال مینی\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1403-12-11\",\"installDate\":\"1404-05-28\",\"ageMonths\":8,\"cause\":\"خرابی - ترموستات (تعویض)\",\"part\":\"ترموستات مینی\",\"travelPayer\":\"شرکت\",\"partCost\":2000000,\"laborCost\":1100000,\"totalCost\":3100000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"510020243\",\"ticket\":\"510020243\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210007N01378\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-23\",\"produceDate\":\"1404-05-13\",\"installDate\":\"1404-12-17\",\"ageMonths\":2,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210012260\",\"ticket\":\"210012260\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N00401\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر / غیرگارانتی - ساید بای ساید\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-04-03\",\"installDate\":\"1403-09-28\",\"ageMonths\":16,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130006240\",\"ticket\":\"130006240\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210008N00610\",\"complaint\":\"صدای غیرعادی هنگام خشک کن ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-17\",\"produceDate\":\"1404-02-13\",\"installDate\":\"1404-07-13\",\"ageMonths\":7,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"510020264\",\"ticket\":\"510020264\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N00902\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی پمپ تخلیه\",\"acceptDate\":\"1405-01-23\",\"produceDate\":\"1403-08-30\",\"installDate\":\"1404-06-01\",\"ageMonths\":8,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210012274\",\"ticket\":\"210012274\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N01411\",\"complaint\":\"زنگ زدگی کابین ایاب و ذهاب به عهده شرکت\",\"failure\":\"زنگ زدگی کابین\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1403-08-06\",\"installDate\":\"1405-01-15\",\"ageMonths\":1,\"cause\":\"زنگ‌زدگی بدنه/قطعه (تعویض)\",\"part\":\"زنگ زدگی کابین\",\"travelPayer\":\"شرکت\",\"partCost\":3500000,\"laborCost\":1100000,\"totalCost\":4600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210012249\",\"ticket\":\"210012249\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال مینی\",\"model\":\"MINI-R (RE01)\",\"serial\":\"52240003N00589\",\"complaint\":\"شکستگی قطعات تزئینی کابین- کد قطعه در لیست اقدامات درج می گردد. — ایاب و ذهاب به عهده شرکت\",\"failure\":\"شکستگی قطعات تزئینی داخل کابین - یخچال مینی\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1403-10-24\",\"installDate\":\"1404-10-08\",\"ageMonths\":4,\"cause\":\"قطعات تزئینی - شکستگی/کسری (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810003432\",\"ticket\":\"810003432\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220003N01306\",\"complaint\":\"خطای F54  —  ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از شیلنگ تخلیه\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1403-07-23\",\"installDate\":\"1404-02-15\",\"ageMonths\":12,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210012289\",\"ticket\":\"210012289\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N03900\",\"complaint\":\"از کار افتادن محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی پمپ تخلیه\",\"acceptDate\":\"1405-01-25\",\"produceDate\":\"1404-07-14\",\"installDate\":\"1404-08-26\",\"ageMonths\":5,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210012285\",\"ticket\":\"210012285\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N02595\",\"complaint\":\"خطای F54ایاب و ذهاب به عهده شرکت\",\"failure\":\"گرفتگی پمپ تخلیه\",\"acceptDate\":\"1405-01-25\",\"produceDate\":\"1404-02-05\",\"installDate\":\"1404-06-04\",\"ageMonths\":8,\"cause\":\"خرابی - پمپ تخلیه (تعویض)\",\"part\":\"پمپ تخلیه ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":3000000,\"laborCost\":1100000,\"totalCost\":4100000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"130006273\",\"ticket\":\"130006273\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N02021\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"اصلاح دمپر پلاستیکی پشت کابین - ساید بای ساید\",\"acceptDate\":\"1405-01-26\",\"produceDate\":\"1403-09-13\",\"installDate\":\"1404-12-03\",\"ageMonths\":2,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"130006278\",\"ticket\":\"130006278\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H13V\",\"serial\":\"210140001N00103\",\"complaint\":\"خطای F54 ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از شیلنگ تخلیه\",\"acceptDate\":\"1405-01-26\",\"produceDate\":\"1402-10-26\",\"installDate\":\"1404-04-29\",\"ageMonths\":9,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510020282\",\"ticket\":\"510020282\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01500\",\"complaint\":\"یخزدگی مواد غذایی در تمام طبقات — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی سنسور دمای کابین یخچال - ساید بای ساید\",\"acceptDate\":\"1405-01-26\",\"produceDate\":\"1403-07-17\",\"installDate\":\"1404-08-11\",\"ageMonths\":6,\"cause\":\"خرابی - ترموستات (تعویض)\",\"part\":\"ترموستات ساید بای ساید\",\"travelPayer\":\"شرکت\",\"partCost\":2000000,\"laborCost\":1100000,\"totalCost\":3100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510020309\",\"ticket\":\"510020309\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8V1\",\"serial\":\"210100003N00328\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده مشتری\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-27\",\"produceDate\":\"1402-10-23\",\"installDate\":\"1403-02-09\",\"ageMonths\":24,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"مشتری\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210012326\",\"ticket\":\"210012326\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"210120001N00234\",\"complaint\":\"بسته نشدن درب — ایاب و ذهاب به عهده مشتری\",\"failure\":\"تعویض لولای پایین - ساید بای ساید\",\"acceptDate\":\"1405-01-27\",\"produceDate\":\"1403-03-20\",\"installDate\":\"1403-04-18\",\"ageMonths\":22,\"cause\":\"مکانیزم درب - لولا (تعویض)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510020302\",\"ticket\":\"510020302\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210009N00574\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-27\",\"produceDate\":\"1404-02-02\",\"installDate\":\"1405-01-20\",\"ageMonths\":1,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810003573\",\"ticket\":\"810003573\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220003N01755\",\"complaint\":\"خطای F54 — ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی از اورینگ پمپ تخلیه\",\"acceptDate\":\"1405-01-26\",\"produceDate\":\"1403-11-04\",\"installDate\":\"1403-12-16\",\"ageMonths\":14,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510020328\",\"ticket\":\"510020328\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210005N01679\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"صدای غیرعادی پمپ تخلیه\",\"acceptDate\":\"1405-01-30\",\"produceDate\":\"1404-03-12\",\"installDate\":\"1404-07-21\",\"ageMonths\":7,\"cause\":\"خرابی - پمپ تخلیه (تعویض)\",\"part\":\"پمپ تخلیه لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":3000000,\"laborCost\":1100000,\"totalCost\":4100000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210012658\",\"ticket\":\"210012658\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01707\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر / غیرگارانتی - ساید بای ساید\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-08-10\",\"installDate\":\"1403-12-13\",\"ageMonths\":14,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210012633\",\"ticket\":\"210012633\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210008N00788\",\"complaint\":\"لرزش و حرکت محصول غیرگارانتی\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-02-22\",\"installDate\":\"1404-08-11\",\"ageMonths\":6,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"نامشخص\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"130004233\",\"ticket\":\"130004233\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220003N00768\",\"complaint\":\"کسری قطعات تزئینی کابین - کد قطعه در لیست اقدامات درج می گردد. ایاب و ذهاب به عهده شرکت\",\"failure\":\"کسری قطعات تزئینی داخل کابین - ظرفشویی\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-04-04\",\"installDate\":\"1405-01-08\",\"ageMonths\":1,\"cause\":\"قطعات تزئینی - شکستگی/کسری (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"100003885\",\"ticket\":\"100003885\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"تلویزیون\",\"model\":\"CTV-65UHJS2\",\"serial\":\"52230004N00236\",\"complaint\":\"عدم عملکرد ریموت کنترل — ایاب و ذهاب به عهده شرکت\",\"failure\":\"ایراد در ریموت کنترل\",\"acceptDate\":\"1405-01-17\",\"produceDate\":\"1403-11-29\",\"installDate\":\"1404-02-14\",\"ageMonths\":12,\"cause\":\"ریموت کنترل (تعویض/تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":3000000,\"laborCost\":1100000,\"totalCost\":4100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"310000301\",\"ticket\":\"310000301\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"210120001N00311\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده مشتری\",\"failure\":\"شکستگی کاور بالای یخساز - ساید بای ساید\",\"acceptDate\":\"1405-01-17\",\"produceDate\":\"1403-03-06\",\"installDate\":\"1403-10-18\",\"ageMonths\":16,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"710002184\",\"ticket\":\"710002184\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N02112\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"اصلاح دمپر پلاستیکی پشت کابین - ساید بای ساید\",\"acceptDate\":\"1405-01-17\",\"produceDate\":\"1403-09-20\",\"installDate\":\"1404-12-23\",\"ageMonths\":1,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"100003921\",\"ticket\":\"100003921\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N00318\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"ریست دستگاه - ظرفشویی\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1403-07-28\",\"installDate\":\"1404-03-31\",\"ageMonths\":10,\"cause\":\"ریست نرم‌افزاری (بدون قطعه)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":700000,\"laborCost\":1100000,\"totalCost\":1800000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130007683\",\"ticket\":\"130007683\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220003N02786\",\"complaint\":\"شکستگی قطعات تزئینی کابین- کد قطعه در لیست اقدامات درج می گردد. — ایاب و ذهاب به عهده شرکت\",\"failure\":\"شکستگی سبد بالا\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1404-08-15\",\"installDate\":\"1404-12-11\",\"ageMonths\":2,\"cause\":\"سبد ظرفشویی - شکستگی (تعویض)\",\"part\":\"سبد ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":6500000,\"laborCost\":1100000,\"totalCost\":7600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130007683\",\"ticket\":\"130007683\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220003N02786\",\"complaint\":\"شکستگی قطعات تزئینی کابین- کد قطعه در لیست اقدامات درج می گردد. — ایاب و ذهاب به عهده شرکت\",\"failure\":\"شکستگی سبد پایین\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1404-08-15\",\"installDate\":\"1404-12-11\",\"ageMonths\":2,\"cause\":\"سبد ظرفشویی - شکستگی (تعویض)\",\"part\":\"سبد ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":6500000,\"laborCost\":1100000,\"totalCost\":7600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210004825\",\"ticket\":\"210004825\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01196\",\"complaint\":\"عدم کارکرد یخساز ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی موتور یخساز - ساید بای ساید\",\"acceptDate\":\"1405-01-23\",\"produceDate\":\"1403-04-24\",\"installDate\":\"1404-03-12\",\"ageMonths\":11,\"cause\":\"یخساز - خرابی موتور/سنسور/برد (تعویض)\",\"part\":\"خرابی موتور یخساز ساید\",\"travelPayer\":\"شرکت\",\"partCost\":5000000,\"laborCost\":1100000,\"totalCost\":6100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130007886\",\"ticket\":\"130007886\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8V1\",\"serial\":\"52210004N00791\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — مجدد — لرزش و حرکت محصول — ایاب و ذهاب به عهده مشتری\",\"failure\":\"خرابی بلبرینگ\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-02-11\",\"installDate\":\"1403-08-13\",\"ageMonths\":18,\"cause\":\"خرابی - بلبرینگ (تعویض)\",\"part\":\"بلبرینگ لباسشویی\",\"travelPayer\":\"مشتری\",\"partCost\":7000000,\"laborCost\":1100000,\"totalCost\":8100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130007902\",\"ticket\":\"130007902\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H13V\",\"serial\":\"52220001N00661\",\"complaint\":\"خطای F54 ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی اورینگ مخزن نمک\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-07-07\",\"installDate\":\"1404-11-04\",\"ageMonths\":3,\"cause\":\"نشتی - درب مخزن نمک (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"310003983\",\"ticket\":\"310003983\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8V1\",\"serial\":\"52210003N01422\",\"complaint\":\"ضربه کابین — غیرگارانتی\",\"failure\":\"ضربه کابین\",\"acceptDate\":\"1405-01-18\",\"produceDate\":\"1403-10-17\",\"installDate\":\"1403-10-17\",\"ageMonths\":16,\"cause\":\"بدنه/کابین - ضربه (بازبینی/تعویض پنل)\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":4000000,\"laborCost\":1100000,\"totalCost\":5100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210015748\",\"ticket\":\"210015748\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N02291\",\"complaint\":\"از کار افتادن محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"قطعی درخت سیم -غیر گارانتی\",\"acceptDate\":\"1405-01-19\",\"produceDate\":\"1404-01-23\",\"installDate\":\"1404-05-29\",\"ageMonths\":8,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130006951\",\"ticket\":\"130006951\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T3\",\"serial\":\"52210013N00061\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از لاستیک دور درب\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-12-03\",\"installDate\":\"1405-01-05\",\"ageMonths\":1,\"cause\":\"لاستیک درزگیر - دفرمگی/پارگی (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210004826\",\"ticket\":\"210004826\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01229\",\"complaint\":\"عدم کارکرد یخسازایاب و ذهاب به عهده شرکت\",\"failure\":\"اصلاح دمپر پلاستیکی پشت کابین - ساید بای ساید\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1403-05-12\",\"installDate\":\"1404-04-28\",\"ageMonths\":9,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210015866\",\"ticket\":\"210015866\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01260\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر / غیرگارانتی - ساید بای ساید\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1403-05-21\",\"installDate\":\"1404-05-04\",\"ageMonths\":9,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810003274\",\"ticket\":\"810003274\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"تلویزیون\",\"model\":\"CTV-65UHJS2\",\"serial\":\"52230004N00072\",\"complaint\":\"ایاب و ذهاب به عهده مشتری مشاهده خطوط در نمایش تصویر\",\"failure\":\"بدون مورد اجرت\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1403-07-25\",\"installDate\":\"1404-03-27\",\"ageMonths\":10,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510022350\",\"ticket\":\"510022350\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N00642\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر / غیرگارانتی - ساید بای ساید\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1403-04-06\",\"installDate\":\"1403-09-27\",\"ageMonths\":17,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130008509\",\"ticket\":\"130008509\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW7.5VI1\",\"serial\":\"52210002N00408\",\"complaint\":\"پارگی لباس ایاب و ذهاب به عهده شرکت\",\"failure\":\"زنگ زدگی درام\",\"acceptDate\":\"1405-01-25\",\"produceDate\":\"1404-05-05\",\"installDate\":\"1404-11-04\",\"ageMonths\":3,\"cause\":\"زنگ‌زدگی بدنه/قطعه (تعویض)\",\"part\":\"زنگ زدگی درام\",\"travelPayer\":\"شرکت\",\"partCost\":3500000,\"laborCost\":1100000,\"totalCost\":4600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210006131\",\"ticket\":\"210006131\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210006N01567\",\"complaint\":\"جمع شدن آب داخل محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی شیربرقی\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1404-05-15\",\"installDate\":\"1404-10-14\",\"ageMonths\":4,\"cause\":\"خرابی - شیربرقی (تعویض)\",\"part\":\"شیر برقی لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":1800000,\"laborCost\":1100000,\"totalCost\":2900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"710001924\",\"ticket\":\"710001924\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N02052\",\"complaint\":\"خطای ER — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی مگنت درب\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-09-20\",\"installDate\":\"1404-12-28\",\"ageMonths\":1,\"cause\":\"سایر اجزای درب (بازبینی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1000000,\"laborCost\":1100000,\"totalCost\":2100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210005280\",\"ticket\":\"210005280\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال مینی\",\"model\":\"MINI-R (BLACK)\",\"serial\":\"52240004N00055\",\"complaint\":\"افتادگی درب/ تنظیم درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تعویض لولا\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-08-13\",\"installDate\":\"1403-12-25\",\"ageMonths\":13,\"cause\":\"مکانیزم درب - لولا (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210004824\",\"ticket\":\"210004824\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01153\",\"complaint\":\"عدم کارکرد یخساز — عدم خروج آب از آبسردکن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"اصلاح دمپر پلاستیکی\",\"acceptDate\":\"1405-01-19\",\"produceDate\":\"1403-04-27\",\"installDate\":\"1404-04-16\",\"ageMonths\":10,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"310003960\",\"ticket\":\"310003960\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"210100006N00224\",\"complaint\":\"از کار افتادن محصول — ایاب و ذهاب به عهده مشتری\",\"failure\":\"خرابی دیسپلی - عدم عملکرد کلیدهای دیسپلی - لباسشویی\",\"acceptDate\":\"1405-01-17\",\"produceDate\":\"1402-09-29\",\"installDate\":\"1403-07-26\",\"ageMonths\":18,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد لباسشویی\",\"travelPayer\":\"مشتری\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"762888\",\"ticket\":\"762888\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"210120001N00046\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی برد - عدم کارکرد یخساز - ساید بای ساید\",\"acceptDate\":\"1405-01-17\",\"produceDate\":\"1403-04-04\",\"installDate\":\"1403-09-03\",\"ageMonths\":17,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد ساید بای ساید\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004819\",\"ticket\":\"130004819\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N03052\",\"complaint\":\"خطای F54ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی واترجت\",\"acceptDate\":\"1405-01-18\",\"produceDate\":\"1404-05-27\",\"installDate\":\"1404-06-15\",\"ageMonths\":8,\"cause\":\"خرابی - واترجت (تعویض)\",\"part\":\"واترجت ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":4000000,\"laborCost\":1100000,\"totalCost\":5100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810003135\",\"ticket\":\"810003135\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H13V\",\"serial\":\"210140001N00211\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی اورینگ پمپ تخلیه\",\"acceptDate\":\"1405-01-29\",\"produceDate\":\"1402-11-05\",\"installDate\":\"1404-02-03\",\"ageMonths\":12,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"753605\",\"ticket\":\"753605\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"تلویزیون\",\"model\":\"CTV-55UHJS2\",\"serial\":\"52230003N00020\",\"complaint\":\"پرش تصویر  —  ایاب و ذهاب به عهده شرکت\",\"failure\":\"پرش تصویر\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-06-15\",\"installDate\":\"1404-02-20\",\"ageMonths\":11,\"cause\":\"برد نمایش تلویزیون (تعویض)\",\"part\":\"برد تلویزیون\",\"travelPayer\":\"شرکت\",\"partCost\":4000000,\"laborCost\":1100000,\"totalCost\":5100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"754522\",\"ticket\":\"754522\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H13V\",\"serial\":\"210140001N00091\",\"complaint\":\"خطای F54 ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی از مقسم آب\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1402-10-21\",\"installDate\":\"1402-12-01\",\"ageMonths\":26,\"cause\":\"نشتی - مقسم آب (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":1800000,\"laborCost\":1100000,\"totalCost\":2900000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"759882\",\"ticket\":\"759882\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N04785\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی پمپ تخلیه\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-08-22\",\"installDate\":\"1404-09-02\",\"ageMonths\":5,\"cause\":\"خرابی - پمپ تخلیه (تعویض)\",\"part\":\"پمپ تخلیه ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":3000000,\"laborCost\":1100000,\"totalCost\":4100000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"510015832\",\"ticket\":\"510015832\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210009N01186\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت — مجدد\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1404-04-19\",\"installDate\":\"1404-04-31\",\"ageMonths\":9,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"761918\",\"ticket\":\"761918\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N00355\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی پمپ تخلیه\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-07-27\",\"installDate\":\"1403-12-18\",\"ageMonths\":14,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"نشتی پمپ ظرفشویی\",\"travelPayer\":\"مشتری\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"762205\",\"ticket\":\"762205\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210006N00699\",\"complaint\":\"بسته نشدن درب — ایاب و ذهاب به عهده مشتری\",\"failure\":\"خرابی زبانه\",\"acceptDate\":\"1405-01-16\",\"produceDate\":\"1403-02-05\",\"installDate\":\"1403-03-19\",\"ageMonths\":23,\"cause\":\"مکانیزم درب - زبانه (تعویض)\",\"part\":\"زبانه درب لباسشویی\",\"travelPayer\":\"مشتری\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"763020\",\"ticket\":\"763020\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N02112\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تنظیم تایم آبگیری یخساز - ساید بای ساید\",\"acceptDate\":\"1405-01-17\",\"produceDate\":\"1403-09-20\",\"installDate\":\"1404-12-23\",\"ageMonths\":1,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"764154\",\"ticket\":\"764154\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N04742\",\"complaint\":\"خطای F54ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی درب مخزن نمک\",\"acceptDate\":\"1405-01-21\",\"produceDate\":\"1404-08-22\",\"installDate\":\"1404-10-11\",\"ageMonths\":4,\"cause\":\"نشتی - درب مخزن نمک (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"764320\",\"ticket\":\"764320\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01950\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"یخزدگی شیلنگ داخل درب - ساید بای ساید\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1403-09-07\",\"installDate\":\"1404-05-05\",\"ageMonths\":9,\"cause\":\"شیلنگ یخساز - یخ‌زدگی (بازبینی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"764462\",\"ticket\":\"764462\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N03807\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"ریست دستگاه - ظرفشویی\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1404-07-07\",\"installDate\":\"1404-08-13\",\"ageMonths\":6,\"cause\":\"ریست نرم‌افزاری (بدون قطعه)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":700000,\"laborCost\":1100000,\"totalCost\":1800000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"764466\",\"ticket\":\"764466\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N01514\",\"complaint\":\"باز شدن درب حین شست و شو ایاب و ذهاب به عهده شرکت\",\"failure\":\"ریست دستگاه - ظرفشویی\",\"acceptDate\":\"1405-01-22\",\"produceDate\":\"1403-11-01\",\"installDate\":\"1404-09-02\",\"ageMonths\":5,\"cause\":\"ریست نرم‌افزاری (بدون قطعه)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":700000,\"laborCost\":1100000,\"totalCost\":1800000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"510016237\",\"ticket\":\"510016237\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N00902\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی پمپ تخلیه\",\"acceptDate\":\"1405-01-23\",\"produceDate\":\"1403-08-30\",\"installDate\":\"1404-06-01\",\"ageMonths\":8,\"cause\":\"خرابی - پمپ تخلیه (تعویض)\",\"part\":\"پمپ تخلیه ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":3000000,\"laborCost\":1100000,\"totalCost\":4100000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"765124\",\"ticket\":\"765124\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210008N01023\",\"complaint\":\"صدای غیرعادی هنگام خشک کن  —  ایاب و ذهاب به عهده شرکت\",\"failure\":\"برخورد شیلنگ رابط هوا به درام فلزی\",\"acceptDate\":\"1405-01-24\",\"produceDate\":\"1404-04-12\",\"installDate\":\"1404-08-20\",\"ageMonths\":6,\"cause\":\"شیلنگ - برخورد/لهیدگی (بازبینی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"765614\",\"ticket\":\"765614\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N01531\",\"complaint\":\"ایاب و ذهاب به عهده شرکت  —  بسته نشدن درب\",\"failure\":\"رگلاژ درب / لولا درب\",\"acceptDate\":\"1405-01-26\",\"produceDate\":\"1403-11-07\",\"installDate\":\"1404-02-13\",\"ageMonths\":12,\"cause\":\"مکانیزم درب - لولا (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"766169\",\"ticket\":\"766169\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N03782\",\"complaint\":\"افتادگی درب/ تنظیم درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"رگلاژ درب / لولا درب\",\"acceptDate\":\"1405-01-27\",\"produceDate\":\"1404-07-28\",\"installDate\":\"1404-10-23\",\"ageMonths\":4,\"cause\":\"مکانیزم درب - لولا (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"510016363\",\"ticket\":\"510016363\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210009N00574\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-01-27\",\"produceDate\":\"1404-02-02\",\"installDate\":\"1405-01-20\",\"ageMonths\":1,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"766636\",\"ticket\":\"766636\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H13V\",\"serial\":\"210140001N00211\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی پمپ تخلیه\",\"acceptDate\":\"1405-01-29\",\"produceDate\":\"1402-11-05\",\"installDate\":\"1404-02-03\",\"ageMonths\":12,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"نشتی پمپ ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"767088\",\"ticket\":\"767088\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220003N01755\",\"complaint\":\"خطای F54 — ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی پمپ تخلیه\",\"acceptDate\":\"1405-01-30\",\"produceDate\":\"1403-11-04\",\"installDate\":\"1403-12-16\",\"ageMonths\":14,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"نشتی پمپ ظرفشویی\",\"travelPayer\":\"مشتری\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"767187\",\"ticket\":\"767187\",\"monthName\":\"فروردین\",\"month\":\"1405-01\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210005N01679\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"صدای غیرعادی پمپ تخلیه\",\"acceptDate\":\"1405-01-30\",\"produceDate\":\"1404-03-12\",\"installDate\":\"1404-07-21\",\"ageMonths\":7,\"cause\":\"خرابی - پمپ تخلیه (تعویض)\",\"part\":\"پمپ تخلیه لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":3000000,\"laborCost\":1100000,\"totalCost\":4100000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"779873\",\"ticket\":\"779873\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01882\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"اصلاح دمپر پلاستیکی پشت کابین - ساید بای ساید\",\"acceptDate\":\"1405-03-02\",\"produceDate\":\"1403-09-04\",\"installDate\":\"1404-05-09\",\"ageMonths\":10,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210004739\",\"ticket\":\"210004739\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210008N00988\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از شیلنگ تخلیه آب\",\"acceptDate\":\"1405-03-03\",\"produceDate\":\"1404-03-21\",\"installDate\":\"1405-02-02\",\"ageMonths\":2,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004136\",\"ticket\":\"130004136\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T3\",\"serial\":\"52210014N00424\",\"complaint\":\"عدم عملکرد کلیدهای دیسپلی — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی دیسپلی\",\"acceptDate\":\"1405-03-05\",\"produceDate\":\"1405-02-21\",\"installDate\":\"1405-02-21\",\"ageMonths\":1,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510017610\",\"ticket\":\"510017610\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01913\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از فیتینگی پشت جلوپایی - ساید بای ساید\",\"acceptDate\":\"1405-03-03\",\"produceDate\":\"1403-09-06\",\"installDate\":\"1404-12-09\",\"ageMonths\":3,\"cause\":\"نشتی آب - محل نامشخص (نیازمند بازدید)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"781296\",\"ticket\":\"781296\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال مینی\",\"model\":\"MINI-R (BK01)\",\"serial\":\"52240002N00359\",\"complaint\":\"خاموش بودن LED کاور / سقفی — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی LED\",\"acceptDate\":\"1405-03-05\",\"produceDate\":\"1403-10-24\",\"installDate\":\"1404-12-09\",\"ageMonths\":3,\"cause\":\"خرابی - لامپ/LED داخلی (تعویض)\",\"part\":\"لامپ مینی\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"781905\",\"ticket\":\"781905\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N02169\",\"complaint\":\"بسته نشدن درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تنظیم دیسپلی - پایین بودن میکروسوئیچ درب\",\"acceptDate\":\"1405-03-07\",\"produceDate\":\"1404-01-20\",\"installDate\":\"1404-06-29\",\"ageMonths\":9,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 16 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"780467\",\"ticket\":\"780467\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210010N02062\",\"complaint\":\"ایاب و ذهاب به عهده شرکت از کار افتادن محصول\",\"failure\":\"خرابی موتور\",\"acceptDate\":\"1405-03-03\",\"produceDate\":\"1404-09-05\",\"installDate\":\"1404-09-18\",\"ageMonths\":6,\"cause\":\"خرابی - موتور (تعویض)\",\"part\":\"موتور لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":4500000,\"laborCost\":1100000,\"totalCost\":5600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210009186\",\"ticket\":\"210009186\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N01300\",\"complaint\":\"از کار افتادن محصول — ایاب و ذهاب به عهده مشتری\",\"failure\":\"خرابی برد - از کار افتادن\",\"acceptDate\":\"1405-03-07\",\"produceDate\":\"1403-10-02\",\"installDate\":\"1404-01-05\",\"ageMonths\":15,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد ظرفشویی\",\"travelPayer\":\"مشتری\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210007557\",\"ticket\":\"210007557\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"210120001N00221\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"عدم قرار گیری قالب یخساز در جایگاه - ساید بای ساید\",\"acceptDate\":\"1405-03-09\",\"produceDate\":\"1403-03-17\",\"installDate\":\"1404-12-18\",\"ageMonths\":3,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210009132\",\"ticket\":\"210009132\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N00890\",\"complaint\":\"بسته نشدن درب — ایاب و ذهاب به عهده مشتری\",\"failure\":\"تنظیم دیسپلی - پایین بودن میکروسوئیچ درب\",\"acceptDate\":\"1405-03-09\",\"produceDate\":\"1403-08-28\",\"installDate\":\"1403-10-30\",\"ageMonths\":17,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 16 نفره\",\"travelPayer\":\"مشتری\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210009117\",\"ticket\":\"210009117\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01659\",\"complaint\":\"ایاب و ذهاب به عهده شرکت خطای E6\",\"failure\":\"خرابی سنسور یخساز - ساید بای ساید\",\"acceptDate\":\"1405-03-09\",\"produceDate\":\"1403-08-30\",\"installDate\":\"1404-05-13\",\"ageMonths\":10,\"cause\":\"یخساز - خرابی موتور/سنسور/برد (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":5000000,\"laborCost\":1100000,\"totalCost\":6100000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210007178\",\"ticket\":\"210007178\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210006N00678\",\"complaint\":\"خطای F54 ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی از شیلنگ تخلیه آب\",\"acceptDate\":\"1405-03-20\",\"produceDate\":\"1403-02-02\",\"installDate\":\"1403-02-24\",\"ageMonths\":26,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210008929\",\"ticket\":\"210008929\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N02101\",\"complaint\":\"عدم تخلیه آب داخل ماشین ظرفشویی — ایاب و ذهاب به عهده مشتری — خطای F54\",\"failure\":\"نشتی از مقسم آب\",\"acceptDate\":\"1405-03-23\",\"produceDate\":\"1404-01-08\",\"installDate\":\"1404-06-01\",\"ageMonths\":10,\"cause\":\"نشتی - مقسم آب (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":1800000,\"laborCost\":1100000,\"totalCost\":2900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"710000346\",\"ticket\":\"710000346\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210007N01410\",\"complaint\":\"لرزش و حرکت محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-03-12\",\"produceDate\":\"1404-05-18\",\"installDate\":\"1405-03-02\",\"ageMonths\":1,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210006821\",\"ticket\":\"210006821\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01110\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر / غیرگارانتی - ساید بای ساید\",\"acceptDate\":\"1405-03-18\",\"produceDate\":\"1403-05-03\",\"installDate\":\"1404-03-27\",\"ageMonths\":12,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210006953\",\"ticket\":\"210006953\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N00630\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر / غیرگارانتی - ساید بای ساید\",\"acceptDate\":\"1405-03-19\",\"produceDate\":\"1403-04-06\",\"installDate\":\"1403-07-01\",\"ageMonths\":21,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210009082\",\"ticket\":\"210009082\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01164\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"اصلاح دمپر پلاستیکی پشت کابین - ساید بای ساید\",\"acceptDate\":\"1405-03-22\",\"produceDate\":\"1403-04-24\",\"installDate\":\"1404-09-29\",\"ageMonths\":6,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210006091\",\"ticket\":\"210006091\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N02155\",\"complaint\":\"ایاب و ذهاب به عهده شرکت از کار افتادن محصول\",\"failure\":\"خرابی برد - از کار افتادن\",\"acceptDate\":\"1405-03-17\",\"produceDate\":\"1404-01-19\",\"installDate\":\"1404-06-13\",\"ageMonths\":10,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210008839\",\"ticket\":\"210008839\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220003N00607\",\"complaint\":\"از کار افتادن محصول — ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی از اورینگ پمپ تخلیه\",\"acceptDate\":\"1405-03-23\",\"produceDate\":\"1403-03-26\",\"installDate\":\"1403-04-16\",\"ageMonths\":24,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"نشتی پمپ ظرفشویی\",\"travelPayer\":\"مشتری\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210014173\",\"ticket\":\"210014173\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال مینی\",\"model\":\"CM-RS5BK1\",\"serial\":\"52240002N01230\",\"complaint\":\"خاموش و روشن شدن LED کاور / سقفی — مجدد — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی ال ای دی داخل کابین - یخچال مینی\",\"acceptDate\":\"1405-03-10\",\"produceDate\":\"1404-05-22\",\"installDate\":\"1404-08-10\",\"ageMonths\":8,\"cause\":\"خرابی - لامپ/LED داخلی (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210008812\",\"ticket\":\"210008812\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N00440\",\"complaint\":\"جمع شدن آب داخل محصول — ایاب و ذهاب به عهده مشتری\",\"failure\":\"خرابی شیربرقی\",\"acceptDate\":\"1405-03-11\",\"produceDate\":\"1403-07-24\",\"installDate\":\"1403-08-22\",\"ageMonths\":19,\"cause\":\"خرابی - شیربرقی (تعویض)\",\"part\":\"شیر برقی ظرفشویی\",\"travelPayer\":\"مشتری\",\"partCost\":1800000,\"laborCost\":1100000,\"totalCost\":2900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"310000351\",\"ticket\":\"310000351\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N02169\",\"complaint\":\"بسته نشدن درب — ریزش آب از درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تنظیم دیسپلی ( مایع جلادهنده/ صدای دیسپلی/ باز شدن یا باز نشدن درب )\",\"acceptDate\":\"1405-03-11\",\"produceDate\":\"1404-01-20\",\"installDate\":\"1404-06-29\",\"ageMonths\":9,\"cause\":\"تنظیم - تنظیمات دستگاه/دیسپلی (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"310000805\",\"ticket\":\"310000805\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N04922\",\"complaint\":\"خطای F54 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی اورینگ مخزن نمک\",\"acceptDate\":\"1405-03-16\",\"produceDate\":\"1404-08-25\",\"installDate\":\"1404-10-02\",\"ageMonths\":6,\"cause\":\"نشتی - درب مخزن نمک (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510017943\",\"ticket\":\"510017943\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"210120001N00335\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"اصلاح دمپر پلاستیکی پشت کابین - ساید بای ساید\",\"acceptDate\":\"1405-03-11\",\"produceDate\":\"1403-03-17\",\"installDate\":\"1404-12-18\",\"ageMonths\":3,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210006874\",\"ticket\":\"210006874\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N04701\",\"complaint\":\"ایاب و ذهاب به عهده شرکت از کار افتادن محصول\",\"failure\":\"خرابی برد - از کار افتادن\",\"acceptDate\":\"1405-03-19\",\"produceDate\":\"1404-08-21\",\"installDate\":\"1405-01-27\",\"ageMonths\":2,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210008506\",\"ticket\":\"210008506\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N00773\",\"complaint\":\"آلارم خودبخودی محصول — اختلاف ارتفاع درب یخچال و فریزر — ایاب و ذهاب به عهده مشتری\",\"failure\":\"خرابی برد - آلارم خود بخودی محصول - ساید بای ساید\",\"acceptDate\":\"1405-03-21\",\"produceDate\":\"1403-04-09\",\"installDate\":\"1403-10-27\",\"ageMonths\":18,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد ساید بای ساید\",\"travelPayer\":\"مشتری\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210007876\",\"ticket\":\"210007876\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01143\",\"complaint\":\"صدای غیرعادی درب — ایاب و ذهاب به عهده مشتری\",\"failure\":\"گریسکاری درب - ساید بای ساید\",\"acceptDate\":\"1405-03-03\",\"produceDate\":\"1403-04-24\",\"installDate\":\"1403-10-24\",\"ageMonths\":17,\"cause\":\"سایر اجزای درب (بازبینی)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":1000000,\"laborCost\":1100000,\"totalCost\":2100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210013253\",\"ticket\":\"210013253\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال مینی\",\"model\":\"CM-RS5RE1\",\"serial\":\"52240003N01957\",\"complaint\":\"خاموش بودن LED کاور / سقفی — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی ال ای دی داخل کابین - یخچال مینی\",\"acceptDate\":\"1405-03-09\",\"produceDate\":\"1405-03-04\",\"installDate\":\"1405-03-04\",\"ageMonths\":1,\"cause\":\"خرابی - لامپ/LED داخلی (تعویض)\",\"part\":\"لامپ مینی\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210007436\",\"ticket\":\"210007436\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01143\",\"complaint\":\"افتادگی درب/ تنظیم درب — ایاب و ذهاب به عهده مشتری\",\"failure\":\"رگلاژ درب / لولا درب\",\"acceptDate\":\"1405-03-09\",\"produceDate\":\"1403-04-24\",\"installDate\":\"1403-10-24\",\"ageMonths\":17,\"cause\":\"مکانیزم درب - لولا (تعویض)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210007409\",\"ticket\":\"210007409\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210005N01412\",\"complaint\":\"بسته نشدن درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"عدم قرارگیری مهره درب\",\"acceptDate\":\"1405-03-10\",\"produceDate\":\"1403-12-04\",\"installDate\":\"1405-03-09\",\"ageMonths\":1,\"cause\":\"سایر اجزای درب (بازبینی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1000000,\"laborCost\":1100000,\"totalCost\":2100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210004767\",\"ticket\":\"210004767\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01829\",\"complaint\":\"عدم کارکرد یخساز — مجدد — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی یخساز - عدم چرخش کامل یخساز - ساید بای ساید\",\"acceptDate\":\"1405-03-11\",\"produceDate\":\"1403-08-30\",\"installDate\":\"1404-05-12\",\"ageMonths\":11,\"cause\":\"یخساز - خرابی موتور/سنسور/برد (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":5000000,\"laborCost\":1100000,\"totalCost\":6100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210013242\",\"ticket\":\"210013242\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N00637\",\"complaint\":\"افتادگی درب/ تنظیم درب ایاب و ذهاب به عهده شرکت\",\"failure\":\"شکستگی قاب لولا - ساید بای ساید\",\"acceptDate\":\"1405-03-20\",\"produceDate\":\"1403-03-13\",\"installDate\":\"1404-07-22\",\"ageMonths\":8,\"cause\":\"مکانیزم درب - لولا (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210010846\",\"ticket\":\"210010846\",\"monthName\":\"خرداد\",\"month\":\"1405-03\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N02290\",\"complaint\":\"بسته نشدن درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-03-30\",\"produceDate\":\"1404-01-21\",\"installDate\":\"1405-03-26\",\"ageMonths\":1,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 16 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"772264\",\"ticket\":\"772264\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N04527\",\"complaint\":\"بسته نشدن درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی قلاب میکروسوئیچ\",\"acceptDate\":\"1405-02-13\",\"produceDate\":\"1404-08-18\",\"installDate\":\"1405-02-19\",\"ageMonths\":0,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 16 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"772652\",\"ticket\":\"772652\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210008N01398\",\"complaint\":\"عدم عملکرد کلیدهای دیسپلی — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی دیسپلی\",\"acceptDate\":\"1405-02-14\",\"produceDate\":\"1404-06-12\",\"installDate\":\"1404-06-26\",\"ageMonths\":8,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"775970\",\"ticket\":\"775970\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01673\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر - غیرگارانتی\",\"acceptDate\":\"1405-02-29\",\"produceDate\":\"1403-09-17\",\"installDate\":\"1404-06-05\",\"ageMonths\":9,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"775086\",\"ticket\":\"775086\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N01535\",\"complaint\":\"باز نشدن درب ایاب و ذهاب به عهده شرکت\",\"failure\":\"اصلاح میکروسوئیچ درب\",\"acceptDate\":\"1405-02-21\",\"produceDate\":\"1403-10-28\",\"installDate\":\"1405-02-20\",\"ageMonths\":1,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"میکروسوئیچ 15 نفره\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"770306\",\"ticket\":\"770306\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال مینی\",\"model\":\"CM-RS5BK1\",\"serial\":\"52240002N00838\",\"complaint\":\"گرم شدن محصول ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی گاز - نامشخص - یخچال مینی\",\"acceptDate\":\"1405-02-08\",\"produceDate\":\"1403-12-11\",\"installDate\":\"1404-05-28\",\"ageMonths\":9,\"cause\":\"نشتی آب - محل نامشخص (نیازمند بازدید)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210005406\",\"ticket\":\"210005406\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW7.5VI1\",\"serial\":\"52210002N00242\",\"complaint\":\"لرزش و حرکت محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-02-31\",\"produceDate\":\"1404-03-13\",\"installDate\":\"1404-09-18\",\"ageMonths\":6,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210005400\",\"ticket\":\"210005400\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210008N00878\",\"complaint\":\"ایاب و ذهاب به عهده شرکت صدای غیرعادی هنگام خشک کن\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-02-31\",\"produceDate\":\"1404-03-20\",\"installDate\":\"1404-07-14\",\"ageMonths\":8,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"310000608\",\"ticket\":\"310000608\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"210120001N00120\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر / غیرگارانتی - ساید بای ساید\",\"acceptDate\":\"1405-02-31\",\"produceDate\":\"1403-03-07\",\"installDate\":\"1403-06-05\",\"ageMonths\":22,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210008229\",\"ticket\":\"210008229\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210010N02062\",\"complaint\":\"ایاب و ذهاب به عهده شرکت خطای CE\",\"failure\":\"از کار افتادن محصول -خرابی برد\",\"acceptDate\":\"1405-02-21\",\"produceDate\":\"1404-09-05\",\"installDate\":\"1404-09-18\",\"ageMonths\":6,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"210009179\",\"ticket\":\"210009179\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال مینی\",\"model\":\"CM-RS5BK1\",\"serial\":\"52240002N01230\",\"complaint\":\"خاموش بودن LED کاور / سقفی — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی LED\",\"acceptDate\":\"1405-02-15\",\"produceDate\":\"1404-05-22\",\"installDate\":\"1404-08-10\",\"ageMonths\":7,\"cause\":\"خرابی - لامپ/LED داخلی (تعویض)\",\"part\":\"لامپ مینی\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":true,\"repeatCost\":1100000},{\"id\":\"100003779\",\"ticket\":\"100003779\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"تلویزیون\",\"model\":\"CTV-65UHJS2\",\"serial\":\"52230004N00275\",\"complaint\":\"قطعی صدا در اتصال تلفن همراه به تلویزیون — ایاب و ذهاب به عهده شرکت\",\"failure\":\"قطعی صدا در تلویزیون - خرابی مین برد\",\"acceptDate\":\"1405-02-10\",\"produceDate\":\"1404-02-30\",\"installDate\":\"1404-12-28\",\"ageMonths\":2,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد تلویزیون\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810002893\",\"ticket\":\"810002893\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N04080\",\"complaint\":\"ایاب و ذهاب به عهده شرکت جمع شدن آب داخل محصول\",\"failure\":\"خرابی شیربرقی\",\"acceptDate\":\"1405-02-17\",\"produceDate\":\"1404-08-06\",\"installDate\":\"1405-02-17\",\"ageMonths\":0,\"cause\":\"خرابی - شیربرقی (تعویض)\",\"part\":\"شیر برقی ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":1800000,\"laborCost\":1100000,\"totalCost\":2900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210006698\",\"ticket\":\"210006698\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210007N01041\",\"complaint\":\"ریزش آب از درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از لاستیک دور درب\",\"acceptDate\":\"1405-02-16\",\"produceDate\":\"1404-03-21\",\"installDate\":\"1404-06-03\",\"ageMonths\":9,\"cause\":\"لاستیک درزگیر - دفرمگی/پارگی (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210014741\",\"ticket\":\"210014741\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8V1\",\"serial\":\"210100004N00012\",\"complaint\":\"عدم عملکرد کلیدهای دیسپلی ایاب و ذهاب به عهده مشتری\",\"failure\":\"خرابی برد - عدم عملکرد کلیدهای دیسپلی\",\"acceptDate\":\"1405-02-17\",\"produceDate\":\"1402-08-09\",\"installDate\":\"1403-02-04\",\"ageMonths\":25,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد لباسشویی\",\"travelPayer\":\"مشتری\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210009809\",\"ticket\":\"210009809\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال مینی\",\"model\":\"CM-RS5RE1\",\"serial\":\"52240003N01096\",\"complaint\":\"خاموش بودن LED کاور / سقفی — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی ال ای دی داخل کابین - یخچال مینی\",\"acceptDate\":\"1405-02-28\",\"produceDate\":\"1403-12-16\",\"installDate\":\"1404-06-29\",\"ageMonths\":8,\"cause\":\"خرابی - لامپ/LED داخلی (تعویض)\",\"part\":\"لامپ مینی\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210006788\",\"ticket\":\"210006788\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال مینی\",\"model\":\"CM-RS5BK2\",\"serial\":\"52240004N00285\",\"complaint\":\"گرم شدن محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"سوختن کمپرسور - یخچال مینی\",\"acceptDate\":\"1405-02-29\",\"produceDate\":\"1403-11-24\",\"installDate\":\"1404-02-30\",\"ageMonths\":13,\"cause\":\"خرابی - کمپرسور (تعویض)\",\"part\":\"کمپرسور مینی\",\"travelPayer\":\"شرکت\",\"partCost\":28000000,\"laborCost\":1100000,\"totalCost\":29100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130008450\",\"ticket\":\"130008450\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"تلویزیون\",\"model\":\"CTV-55UHJS2\",\"serial\":\"52230003N00401\",\"complaint\":\"از کار افتادن محصول ایاب و ذهاب به عهده مشتری\",\"failure\":\"خرابی مین برد\",\"acceptDate\":\"1405-02-13\",\"produceDate\":\"1403-08-02\",\"installDate\":\"1403-12-16\",\"ageMonths\":15,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد تلویزیون\",\"travelPayer\":\"مشتری\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210007726\",\"ticket\":\"210007726\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N05186\",\"complaint\":\"از کار افتادن محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی واترجت\",\"acceptDate\":\"1405-02-16\",\"produceDate\":\"1404-08-28\",\"installDate\":\"1404-09-22\",\"ageMonths\":5,\"cause\":\"خرابی - واترجت (تعویض)\",\"part\":\"واترجت ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":4000000,\"laborCost\":1100000,\"totalCost\":5100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210007720\",\"ticket\":\"210007720\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01048\",\"complaint\":\"تعویض فیلتر - غیرگارانتی\",\"failure\":\"تعویض فیلتر / غیرگارانتی - ساید بای ساید\",\"acceptDate\":\"1405-02-17\",\"produceDate\":\"1403-04-14\",\"installDate\":\"1404-07-27\",\"ageMonths\":7,\"cause\":\"غیرگارانتی/بدون قطعه\",\"part\":\"\",\"travelPayer\":\"نامشخص\",\"partCost\":800000,\"laborCost\":1100000,\"totalCost\":1900000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810002486\",\"ticket\":\"810002486\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N00372\",\"complaint\":\"گرم شدن محصول — ایاب و ذهاب به عهده مشتری\",\"failure\":\"خرابی کمپرسور - از کارافتادن - ساید بای ساید\",\"acceptDate\":\"1405-02-17\",\"produceDate\":\"1403-04-02\",\"installDate\":\"1403-12-05\",\"ageMonths\":15,\"cause\":\"خرابی - کمپرسور (تعویض)\",\"part\":\"کمپرسور ساید بای ساید\",\"travelPayer\":\"مشتری\",\"partCost\":28000000,\"laborCost\":1100000,\"totalCost\":29100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"710001786\",\"ticket\":\"710001786\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8V1\",\"serial\":\"52210003N01370\",\"complaint\":\"از کار افتادن محصول ایاب و ذهاب به عهده مشتری\",\"failure\":\"پارگی تسمه\",\"acceptDate\":\"1405-02-17\",\"produceDate\":\"1403-10-23\",\"installDate\":\"1403-11-10\",\"ageMonths\":16,\"cause\":\"خرابی - تسمه (تعویض)\",\"part\":\"تسمه لباسشویی\",\"travelPayer\":\"مشتری\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"810004652\",\"ticket\":\"810004652\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8V1\",\"serial\":\"52210004N01516\",\"complaint\":\"لرزش و حرکت محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تاب درام\",\"acceptDate\":\"1405-02-17\",\"produceDate\":\"1404-05-26\",\"installDate\":\"1404-07-14\",\"ageMonths\":8,\"cause\":\"خرابی - تاب برداشتن درام (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":23000000,\"laborCost\":1100000,\"totalCost\":24100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210008359\",\"ticket\":\"210008359\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01301\",\"complaint\":\"صدای غیرعادی درب ایاب و ذهاب به عهده مشتری\",\"failure\":\"تعویض آرام بند - ساید بای ساید\",\"acceptDate\":\"1405-02-15\",\"produceDate\":\"1403-06-04\",\"installDate\":\"1403-07-17\",\"ageMonths\":20,\"cause\":\"تعویض کامل دستگاه (Replacement)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":80000000,\"laborCost\":1100000,\"totalCost\":81100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"210009817\",\"ticket\":\"210009817\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"تلویزیون\",\"model\":\"CTV-75QMJS4\",\"serial\":\"52230008N00018\",\"complaint\":\"عدم عملکرد ریموت کنترل ایاب و ذهاب به عهده شرکت\",\"failure\":\"ایراد در ریموت کنترل\",\"acceptDate\":\"1405-02-27\",\"produceDate\":\"1403-12-18\",\"installDate\":\"1403-12-19\",\"ageMonths\":15,\"cause\":\"ریموت کنترل (تعویض/تعمیر)\",\"part\":\"کنترل تلویزیون\",\"travelPayer\":\"شرکت\",\"partCost\":3000000,\"laborCost\":1100000,\"totalCost\":4100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"310002606\",\"ticket\":\"310002606\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210009N00048\",\"complaint\":\"عدم عملکرد کلیدهای دیسپلی — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی برد - عدم عملکرد کلیدهای دیسپلی\",\"acceptDate\":\"1405-02-05\",\"produceDate\":\"1403-10-09\",\"installDate\":\"1404-08-20\",\"ageMonths\":6,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"710001205\",\"ticket\":\"710001205\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210007N00595\",\"complaint\":\"دفرمگی نوار دور درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"پارگی لاستیک\",\"acceptDate\":\"1405-02-10\",\"produceDate\":\"1404-02-10\",\"installDate\":\"1404-03-07\",\"ageMonths\":12,\"cause\":\"لاستیک درزگیر - دفرمگی/پارگی (تعویض)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"771166\",\"ticket\":\"771166\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال مینی\",\"model\":\"MINI-R (RE01)\",\"serial\":\"52240003N00558\",\"complaint\":\"گرم شدن محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تنظیم ترموستات\",\"acceptDate\":\"1405-02-12\",\"produceDate\":\"1403-10-23\",\"installDate\":\"1405-01-22\",\"ageMonths\":1,\"cause\":\"خرابی - ترموستات (تعویض)\",\"part\":\"ترموستات مینی\",\"travelPayer\":\"شرکت\",\"partCost\":2000000,\"laborCost\":1100000,\"totalCost\":3100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130003972\",\"ticket\":\"130003972\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"تلویزیون\",\"model\":\"CTV-55UHJS2\",\"serial\":\"52230003N00884\",\"complaint\":\"عدم نمایش تصویر در اتصال با بلوتوث — ایاب و ذهاب به عهده شرکت\",\"failure\":\"متصل نبودن سوکت WIFI\",\"acceptDate\":\"1405-02-28\",\"produceDate\":\"1404-07-28\",\"installDate\":\"1405-02-26\",\"ageMonths\":1,\"cause\":\"خرابی - برد الکترونیک (تعویض)\",\"part\":\"برد تلویزیون\",\"travelPayer\":\"شرکت\",\"partCost\":14000000,\"laborCost\":1100000,\"totalCost\":15100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130004037\",\"ticket\":\"130004037\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N01629\",\"complaint\":\"خطای F12 — ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی از شیلنگ ورودی\",\"acceptDate\":\"1405-02-31\",\"produceDate\":\"1403-11-11\",\"installDate\":\"1404-04-02\",\"ageMonths\":12,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"767776\",\"ticket\":\"767776\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N00726\",\"complaint\":\"بسته نشدن درب  —  ایاب و ذهاب به عهده شرکت\",\"failure\":\"ریست دستگاه - ظرفشویی\",\"acceptDate\":\"1405-02-01\",\"produceDate\":\"1403-08-15\",\"installDate\":\"1404-04-24\",\"ageMonths\":10,\"cause\":\"ریست نرم‌افزاری (بدون قطعه)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":700000,\"laborCost\":1100000,\"totalCost\":1800000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"768255\",\"ticket\":\"768255\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210007N00761\",\"complaint\":\"صدای غیرعادی هنگام خشک کن  —  ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-02-02\",\"produceDate\":\"1404-02-19\",\"installDate\":\"1404-09-12\",\"ageMonths\":5,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"768502\",\"ticket\":\"768502\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210010N01056\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-02-03\",\"produceDate\":\"1404-03-03\",\"installDate\":\"1404-05-22\",\"ageMonths\":9,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"768535\",\"ticket\":\"768535\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N02662\",\"complaint\":\"خطای F54 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از براکت ریل وسط\",\"acceptDate\":\"1405-02-03\",\"produceDate\":\"1404-02-06\",\"installDate\":\"1404-08-12\",\"ageMonths\":6,\"cause\":\"نشتی - براکت ریل (تعمیر/آب‌بندی)\",\"part\":\"باز شدن پرچ داخل کابین\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"768537\",\"ticket\":\"768537\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N01168\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده مشتری\",\"failure\":\"باز شدن پرچ داخل کابین\",\"acceptDate\":\"1405-02-03\",\"produceDate\":\"1403-09-30\",\"installDate\":\"1403-12-21\",\"ageMonths\":14,\"cause\":\"پرچ/بدنه کابین(تعمیر)\",\"part\":\"باز شدن پرچ داخل کابین\",\"travelPayer\":\"مشتری\",\"partCost\":0,\"laborCost\":1100000,\"totalCost\":1100000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"769082\",\"ticket\":\"769082\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N02776\",\"complaint\":\"خطای F54 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی شیلنگ تخلیه\",\"acceptDate\":\"1405-02-05\",\"produceDate\":\"1404-08-17\",\"installDate\":\"1404-10-02\",\"ageMonths\":5,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"769267\",\"ticket\":\"769267\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"210100006N00248\",\"complaint\":\"لرزش و حرکت محصول — ایاب و ذهاب به عهده مشتری\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-02-05\",\"produceDate\":\"1402-09-23\",\"installDate\":\"1403-05-20\",\"ageMonths\":21,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"مشتری\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510016639\",\"ticket\":\"510016639\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210005N01875\",\"complaint\":\"بسته نشدن درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"خرابی زبانه\",\"acceptDate\":\"1405-02-06\",\"produceDate\":\"1404-05-07\",\"installDate\":\"1405-05-02\",\"ageMonths\":-2,\"cause\":\"مکانیزم درب - زبانه (تعویض)\",\"part\":\"زبانه درب لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"769694\",\"ticket\":\"769694\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N00758\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی پمپ تخلیه\",\"acceptDate\":\"1405-02-06\",\"produceDate\":\"1403-08-15\",\"installDate\":\"1403-12-19\",\"ageMonths\":14,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"نشتی پمپ ظرفشویی\",\"travelPayer\":\"مشتری\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"770165\",\"ticket\":\"770165\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210006N01568\",\"complaint\":\"از کار افتادن محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"قطعی درخت سیم\",\"acceptDate\":\"1405-02-07\",\"produceDate\":\"1404-05-15\",\"installDate\":\"1404-06-16\",\"ageMonths\":8,\"cause\":\"سیم‌کشی/اتصالات (تعویض/بازبینی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1400000,\"laborCost\":1100000,\"totalCost\":2500000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"770693\",\"ticket\":\"770693\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N03839\",\"complaint\":\"جمع شدن آب داخل محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی پمپ تخلیه\",\"acceptDate\":\"1405-02-09\",\"produceDate\":\"1404-07-14\",\"installDate\":\"1404-09-16\",\"ageMonths\":5,\"cause\":\"نشتی - پمپ تخلیه (تعمیر/آب‌بندی)\",\"part\":\"نشتی پمپ ظرفشویی\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130003664\",\"ticket\":\"130003664\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8V1\",\"serial\":\"52210003N01048\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — مجدد — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-02-09\",\"produceDate\":\"1403-02-09\",\"installDate\":\"1404-03-13\",\"ageMonths\":11,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"771019\",\"ticket\":\"771019\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220004N04041\",\"complaint\":\"خطای F54 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از شیلنگ تخلیه\",\"acceptDate\":\"1405-02-10\",\"produceDate\":\"1404-07-28\",\"installDate\":\"1404-09-13\",\"ageMonths\":5,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"771202\",\"ticket\":\"771202\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8V1\",\"serial\":\"52210003N01135\",\"complaint\":\"خطای E1 — ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی از شیلنگ تخلیه\",\"acceptDate\":\"1405-02-12\",\"produceDate\":\"1403-02-10\",\"installDate\":\"1403-11-27\",\"ageMonths\":15,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"771209\",\"ticket\":\"771209\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01938\",\"complaint\":\"عدم کارکرد یخساز — ایاب و ذهاب به عهده شرکت\",\"failure\":\"عایق کاری ورودی یخساز - ساید بای ساید\",\"acceptDate\":\"1405-02-12\",\"produceDate\":\"1403-09-07\",\"installDate\":\"1405-01-24\",\"ageMonths\":1,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"771374\",\"ticket\":\"771374\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220002N01848\",\"complaint\":\"جمع شدن آب زیر محصول — ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی از شیلنگ ورودی\",\"acceptDate\":\"1405-02-12\",\"produceDate\":\"1403-11-16\",\"installDate\":\"1404-02-09\",\"ageMonths\":13,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"نشتی پمپ ظرفشویی\",\"travelPayer\":\"مشتری\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510016831\",\"ticket\":\"510016831\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210010N00834\",\"complaint\":\"لرزش و حرکت محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-02-13\",\"produceDate\":\"1404-02-17\",\"installDate\":\"1404-02-22\",\"ageMonths\":12,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"772120\",\"ticket\":\"772120\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T1\",\"serial\":\"52210007N01116\",\"complaint\":\"لرزش و حرکت محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-02-13\",\"produceDate\":\"1404-04-21\",\"installDate\":\"1404-06-04\",\"ageMonths\":9,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"130003757\",\"ticket\":\"130003757\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N00148\",\"complaint\":\"خطای F11 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از شیلنگ تخلیه\",\"acceptDate\":\"1405-02-14\",\"produceDate\":\"1403-07-12\",\"installDate\":\"1404-09-26\",\"ageMonths\":5,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"773306\",\"ticket\":\"773306\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N04325\",\"complaint\":\"خطای F54  —  مجدد  —  ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از شیلنگ تخلیه\",\"acceptDate\":\"1405-02-16\",\"produceDate\":\"1404-08-11\",\"installDate\":\"1404-11-09\",\"ageMonths\":4,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"774233\",\"ticket\":\"774233\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"یخچال ساید‌بای‌ساید\",\"model\":\"C2S-29HS1\",\"serial\":\"52240001N01928\",\"complaint\":\"عدم تخلیه یخ به صورت قالبی — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تنظیم تایم آبگیری یخساز - ساید بای ساید\",\"acceptDate\":\"1405-02-19\",\"produceDate\":\"1403-09-08\",\"installDate\":\"1404-05-01\",\"ageMonths\":10,\"cause\":\"یخساز - تنظیم/عایق (تعمیر)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1500000,\"laborCost\":1100000,\"totalCost\":2600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"774240\",\"ticket\":\"774240\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T1\",\"serial\":\"52210006N01067\",\"complaint\":\"بسته نشدن درب — ایاب و ذهاب به عهده شرکت\",\"failure\":\"اصلاح سوکت میکروسوئیچ\",\"acceptDate\":\"1405-02-19\",\"produceDate\":\"1404-02-11\",\"installDate\":\"1405-02-19\",\"ageMonths\":0,\"cause\":\"مکانیزم درب - میکروسوئیچ/قلاب (تعویض/تنظیم)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":2500000,\"laborCost\":1100000,\"totalCost\":3600000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"774878\",\"ticket\":\"774878\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220003N01615\",\"complaint\":\"خطای F54 — ایاب و ذهاب به عهده مشتری\",\"failure\":\"نشتی از شیلنگ تخلیه\",\"acceptDate\":\"1405-02-20\",\"produceDate\":\"1403-10-27\",\"installDate\":\"1403-12-09\",\"ageMonths\":15,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"مشتری\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"775632\",\"ticket\":\"775632\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H15V\",\"serial\":\"52220003N02491\",\"complaint\":\"خطای F54  —  ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی شیلنگ تخلیه\",\"acceptDate\":\"1405-02-22\",\"produceDate\":\"1404-07-08\",\"installDate\":\"1404-10-20\",\"ageMonths\":5,\"cause\":\"نشتی - شیلنگ (تعمیر/آب‌بندی)\",\"part\":\"\",\"travelPayer\":\"شرکت\",\"partCost\":1200000,\"laborCost\":1100000,\"totalCost\":2300000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"776160\",\"ticket\":\"776160\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW9T2\",\"serial\":\"52210015N00213\",\"complaint\":\"لرزش و حرکت محصول — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-02-23\",\"produceDate\":\"1404-12-17\",\"installDate\":\"1405-02-21\",\"ageMonths\":1,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"776362\",\"ticket\":\"776362\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین ظرفشویی\",\"model\":\"CDW-H16T\",\"serial\":\"52220005N02660\",\"complaint\":\"خطای F54 — ایاب و ذهاب به عهده شرکت\",\"failure\":\"نشتی از براکت ریل وسط\",\"acceptDate\":\"1405-02-23\",\"produceDate\":\"1404-02-06\",\"installDate\":\"1404-06-30\",\"ageMonths\":8,\"cause\":\"نشتی - براکت ریل (تعمیر/آب‌بندی)\",\"part\":\"باز شدن پرچ داخل کابین\",\"travelPayer\":\"شرکت\",\"partCost\":1300000,\"laborCost\":1100000,\"totalCost\":2400000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"510017367\",\"ticket\":\"510017367\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-H10VCR1\",\"serial\":\"52210011N00704\",\"complaint\":\"صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-02-27\",\"produceDate\":\"1404-11-09\",\"installDate\":\"1404-12-02\",\"ageMonths\":3,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0},{\"id\":\"778100\",\"ticket\":\"778100\",\"monthName\":\"اردیبهشت\",\"month\":\"1405-02\",\"product\":\"ماشین لباسشویی\",\"model\":\"CWM-BMW8T2\",\"serial\":\"52210009N02113\",\"complaint\":\"لرزش و حرکت محصول — صدای غیرعادی هنگام خشک کن — ایاب و ذهاب به عهده شرکت\",\"failure\":\"تراز پایه تنظیم\",\"acceptDate\":\"1405-02-28\",\"produceDate\":\"1404-07-26\",\"installDate\":\"1404-09-27\",\"ageMonths\":6,\"cause\":\"تراز/لرزش - نصب (رگلاژ پایه)\",\"part\":\"رگلاژ پایه تنظیم لباسشویی\",\"travelPayer\":\"شرکت\",\"partCost\":900000,\"laborCost\":1100000,\"totalCost\":2000000,\"repeat\":false,\"repeatCost\":0}]");
var COMPANY = {
	name: "آرتا گستر افق پارسیان",
	legal: "آرتا گستر افق پارسیان",
	desk: "خدمات پس از فروش",
	periodLabel: "سه ماهه اول ۱۴۰۵"
};
var SEED_RECORDS = arta_records_default;
var STORAGE_KEY = "rasad-arta-v2";
function persist(part) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(part));
	} catch {}
}
var useReportStore = create((set, get) => ({
	ready: false,
	rows: SEED_RECORDS,
	source: "seed",
	fileName: "خدمات_پس_از_فروش_ارتا.xlsm",
	lastImportAt: null,
	importLog: [],
	selectedMonth: "all",
	filters: {
		product: null,
		cause: null,
		model: null
	},
	company: COMPANY.name,
	hydrate: () => {
		if (get().ready) return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const data = JSON.parse(raw);
				if (Array.isArray(data.rows) && data.rows.length > 0) {
					set({
						rows: data.rows,
						source: data.source ?? "excel",
						fileName: data.fileName ?? null,
						lastImportAt: data.lastImportAt ?? null,
						importLog: data.importLog ?? [],
						ready: true
					});
					return;
				}
			}
		} catch {}
		set({ ready: true });
	},
	setMonth: (month) => set({ selectedMonth: month }),
	setFilter: (key, value) => set((s) => ({ filters: {
		...s.filters,
		[key]: value
	} })),
	importExcel: (incoming, fileName, mode) => {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const incomingMonths = monthsOf(incoming);
		set((s) => {
			let next = incoming;
			if (mode === "merge-months") {
				const monthSet = new Set(incomingMonths);
				next = [...s.rows.filter((r) => !monthSet.has(r.month)), ...incoming];
			}
			const state = {
				...s,
				rows: next,
				source: "excel",
				fileName,
				lastImportAt: now,
				selectedMonth: "all",
				importLog: [{
					at: now,
					fileName,
					months: incomingMonths,
					rows: incoming.length,
					mode
				}, ...s.importLog].slice(0, 12)
			};
			persist({
				rows: state.rows,
				source: state.source,
				fileName: state.fileName,
				lastImportAt: state.lastImportAt,
				importLog: state.importLog
			});
			return state;
		});
	},
	resetSeed: () => {
		const next = {
			rows: SEED_RECORDS,
			source: "seed",
			fileName: "خدمات_پس_از_فروش_ارتا.xlsm",
			lastImportAt: null,
			importLog: []
		};
		persist(next);
		set({
			...next,
			selectedMonth: "all"
		});
	}
}));
function compareMonthOf(month) {
	if (month === "all") return "all";
	return prevMonth(month);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CUgUnQdz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 1.75
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-medium",
				children: "خطایی رخ داد"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-fg-muted",
				children: error.message || "یک خطای پیش‌بینی‌نشده رخ داد. صفحه را دوباره بارگذاری کنید."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var NAV = [
	{
		to: "/",
		label: "خلاصه دوره",
		icon: LayoutDashboard
	},
	{
		to: "/causes",
		label: "علت خرابی",
		icon: Wrench
	},
	{
		to: "/devices",
		label: "دستگاه و مدل",
		icon: Package
	},
	{
		to: "/parts",
		label: "قطعه و عمر",
		icon: Timer
	},
	{
		to: "/actions",
		label: "اقدامات اصلاحی خدمات",
		icon: ClipboardList
	},
	{
		to: "/cost",
		label: "هزینه گارانتی",
		icon: Wallet
	},
	{
		to: "/repeats",
		label: "مراجعه تکراری",
		icon: Repeat
	},
	{
		to: "/lifetime",
		label: "زمان‌بندی خرابی",
		icon: Activity
	},
	{
		to: "/cohorts",
		label: "کوهورت نصب و تولید",
		icon: ChartLine
	},
	{
		to: "/data",
		label: "داده و اکسل",
		icon: FileSpreadsheet
	},
	{
		to: "/report",
		label: "گزارش چاپی",
		icon: FileText
	}
];
function Sidebar({ onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-5 pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.18em] text-fg-subtle",
					children: "RASAD DESK"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-2xl font-medium leading-none tracking-tight",
					children: "رصد"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-fg-muted",
					children: "خدمات پس از فروش آرتا"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex-1 space-y-0.5 overflow-y-auto px-2",
			children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				activeOptions: { exact: item.to === "/" },
				className: "flex h-11 items-center gap-2.5 rounded-md px-2.5 text-sm text-fg-muted transition-colors duration-150 hover:bg-bg-subtle hover:text-fg",
				activeProps: { className: "flex h-11 items-center gap-2.5 rounded-md px-2.5 text-sm bg-bg-ink text-fg-on-ink hover:bg-bg-ink hover:text-fg-on-ink" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
					className: "size-4 shrink-0",
					strokeWidth: 1.75
				}), item.label]
			}, item.to))
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:bg-primary-hover shadow-[var(--shadow-border)]",
			ink: "bg-bg-ink text-fg-on-ink hover:opacity-90",
			outline: "bg-bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "text-fg hover:bg-bg-subtle",
			danger: "bg-danger text-primary-fg hover:opacity-90"
		},
		size: {
			default: "h-10 px-3.5",
			sm: "h-8 px-2.5 text-xs",
			lg: "h-11 px-4",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Select({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("h-10 min-w-0 rounded-sm border border-border bg-bg-elevated px-2.5 text-sm text-fg outline-none transition-[box-shadow] duration-150 focus:border-border-strong", className),
		...props,
		children
	});
}
var Sheet = Dialog;
function SheetContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed inset-y-0 right-0 z-50 flex w-[min(20rem,100%)] flex-col bg-bg-elevated p-4 text-fg shadow-[var(--shadow-border)]", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 left-3 flex size-10 items-center justify-center rounded-sm text-fg-muted hover:bg-bg-subtle",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "بستن"
			})]
		}), children]
	})] });
}
function AppShell({ children }) {
	const hydrate = useReportStore((s) => s.hydrate);
	const rows = useReportStore((s) => s.rows);
	const filters = useReportStore((s) => s.filters);
	const selectedMonth = useReportStore((s) => s.selectedMonth);
	const setMonth = useReportStore((s) => s.setMonth);
	const setFilter = useReportStore((s) => s.setFilter);
	const source = useReportStore((s) => s.source);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	const months = monthsOf(rows);
	const products = uniqueValues(rows, "product");
	const causes = uniqueValues(rows, "cause");
	const models = uniqueValues(rows, "model");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				dir: "rtl",
				richColors: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-3 py-2.5 sm:px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-10 items-center justify-center rounded-sm hover:bg-bg-subtle lg:hidden",
							onClick: () => setOpen(true),
							"aria-label": "منو",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm font-medium",
									children: COMPANY.legal
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-[11px] text-fg-subtle sm:inline",
									children: COMPANY.desk
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-fg-muted",
								children: source === "seed" ? "فایل خدمات پس از فروش آرتا" : "داده بارگذاری‌شده از اکسل"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							className: "hidden w-[9.5rem] sm:block",
							value: selectedMonth,
							onChange: (e) => setMonth(e.target.value),
							"aria-label": "ماه",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "کل دوره"
							}), months.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m,
								children: formatMonth(m)
							}, m))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "hidden sm:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/data",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), "به‌روزرسانی اکسل"]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 overflow-x-auto border-t border-border px-3 py-2 sm:px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							className: "h-9 min-w-[8rem] text-xs",
							value: filters.product ?? "",
							onChange: (e) => setFilter("product", e.target.value || null),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "همه دستگاه‌ها"
							}), products.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: b,
								children: b
							}, b))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							className: "h-9 min-w-[9rem] text-xs",
							value: filters.cause ?? "",
							onChange: (e) => setFilter("cause", e.target.value || null),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "همه علت‌ها"
							}), causes.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: b,
								children: b
							}, b))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							className: "h-9 min-w-[8rem] text-xs",
							value: filters.model ?? "",
							onChange: (e) => setFilter("model", e.target.value || null),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "همه مدل‌ها"
							}), models.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: b,
								children: b
							}, b))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							className: "h-9 min-w-[8rem] text-xs sm:hidden",
							value: selectedMonth,
							onChange: (e) => setMonth(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "کل دوره"
							}), months.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m,
								children: formatMonth(m)
							}, m))]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[1440px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "sticky top-[6.35rem] hidden h-[calc(100dvh-6.35rem)] w-56 shrink-0 border-l border-border lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 px-3 py-5 sm:px-6 sm:py-6",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, { onNavigate: () => setOpen(false) }) })
			})
		]
	});
}
var styles_default = "/assets/styles-sg23Ko1N.css";
var APP_NAME = "رصد";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#efeae1"
			},
			{
				name: "description",
				content: "داشبورد خدمات پس از فروش آرتا گستر افق پارسیان — گارانتی، علت خرابی، هزینه و مراجعه تکراری"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap"
			}
		]
	}),
	errorComponent: AppErrorComponent,
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fa",
		dir: "rtl",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$10 = () => import("./routes-DIMECH27.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./actions-CcLTr5ka.mjs");
var Route$9 = createFileRoute("/actions")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./causes-PNAEfMDO.mjs");
var Route$8 = createFileRoute("/causes")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./cohorts-GUuwLrF0.mjs");
var Route$7 = createFileRoute("/cohorts")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./cost-y93rE5Ne.mjs");
var Route$6 = createFileRoute("/cost")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./data-BNrpf_Vo.mjs");
var Route$5 = createFileRoute("/data")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./devices-Da9otNUM.mjs");
var Route$4 = createFileRoute("/devices")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./lifetime-5jnJc3tS.mjs");
var Route$3 = createFileRoute("/lifetime")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./parts-P6zkiXoC.mjs");
var Route$2 = createFileRoute("/parts")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./repeats-0Cp7IESn.mjs");
var Route$1 = createFileRoute("/repeats")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./report-DRQRv3nu.mjs");
var Route = createFileRoute("/report")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	ActionsRoute: Route$9.update({
		id: "/actions",
		path: "/actions",
		getParentRoute: () => Route$11
	}),
	CausesRoute: Route$8.update({
		id: "/causes",
		path: "/causes",
		getParentRoute: () => Route$11
	}),
	CohortsRoute: Route$7.update({
		id: "/cohorts",
		path: "/cohorts",
		getParentRoute: () => Route$11
	}),
	CostRoute: Route$6.update({
		id: "/cost",
		path: "/cost",
		getParentRoute: () => Route$11
	}),
	DataRoute: Route$5.update({
		id: "/data",
		path: "/data",
		getParentRoute: () => Route$11
	}),
	DevicesRoute: Route$4.update({
		id: "/devices",
		path: "/devices",
		getParentRoute: () => Route$11
	}),
	LifetimeRoute: Route$3.update({
		id: "/lifetime",
		path: "/lifetime",
		getParentRoute: () => Route$11
	}),
	PartsRoute: Route$2.update({
		id: "/parts",
		path: "/parts",
		getParentRoute: () => Route$11
	}),
	RepeatsRoute: Route$1.update({
		id: "/repeats",
		path: "/repeats",
		getParentRoute: () => Route$11
	}),
	ReportRoute: Route.update({
		id: "/report",
		path: "/report",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { parseMonthKey as C, useReportStore as E, pad2 as S, toFaDigits as T, groupBy as _, MONTH_NAMES as a, monthlySeries as b, applyFilters as c, cn as d, compareMonthOf as f, formatMonthShort as g, formatMonth as h, COMPANY as i, buildInsights as l, formatJalaliDate as m, Select as n, SEED_RECORDS as o, computeKpis as p, Button as r, ageBuckets as s, router_exports as t, causePriority as u, heatmap as v, repeatSerials as w, monthsOf as x, inMonth as y };
