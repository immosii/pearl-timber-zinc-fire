import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-D8UMmuHf.mjs";
import { a as PageHeader, c as formatMoney, i as CardTitle, n as CardHeader, r as CardHint, s as faNum, t as Card } from "./page-header-BS7rdco_.mjs";
import { t as useView } from "./use-view-CKpncG6R.mjs";
import { h as Download, i as Upload, m as FileSpreadsheet, s as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as useReportStore, S as pad2, d as cn, h as formatMonth, m as formatJalaliDate, n as Select, o as SEED_RECORDS, r as Button, x as monthsOf } from "./router-CUgUnQdz.mjs";
import { n as utils, r as writeFileSync, t as readSync } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-BNrpf_Vo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-10 w-full rounded-sm border border-border bg-bg-elevated px-3 text-sm text-fg placeholder:text-fg-subtle outline-none transition-[box-shadow] duration-150 focus:border-border-strong", className),
		...props
	});
}
var MONTH_MAP = {
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
	اسفند: "12"
};
var ALIASES = {
	ticket: [
		"شماره پذیرش",
		"پذیرش",
		"ticket"
	],
	monthName: ["ماه", "month"],
	product: [
		"نوع محصول",
		"نوع دستگاه",
		"محصول"
	],
	model: ["مدل محصول", "مدل"],
	serial: ["شماره سریال", "سریال"],
	complaint: ["اظهار مشتری", "اظهار"],
	failure: ["شرح خرابی", "شرح"],
	acceptDate: ["تاریخ پذیرش"],
	produceDate: ["تاریخ تولید"],
	installDate: ["تاریخ نصب"],
	ageMonths: [
		"مدت زمان مصرف",
		"عمر",
		"ماه تا خرابی"
	],
	cause: [
		"دسته علت خرابی",
		"علت خرابی",
		"علت"
	],
	part: ["قطعه تعویضی", "قطعه"],
	travelPayer: [
		"مشئول ایاب ذهاب",
		"مسئول ایاب ذهاب",
		"ایاب و ذهاب"
	],
	partCost: ["هزینه قطعه (تومان)", "هزینه قطعه"],
	laborCost: [
		"هزینه اجرت+ایاب‌وذهاب (تومان)",
		"هزینه اجرت+ایاب‌وذهاب",
		"اجرت"
	],
	totalCost: ["هزینه کل ردیف (تومان)", "هزینه کل"],
	repeat: ["مراجعه تکراری؟ (سریال)", "مراجعه تکراری"],
	repeatCost: ["هزینه ضرر تکرار (تومان)", "ضرر تکرار"]
};
function fa(s) {
	return String(s ?? "").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\*+/g, " — ").replace(/\s+/g, " ").trim();
}
function num(v) {
	if (typeof v === "number") return v;
	const n = Number(String(v ?? "").replace(/,/g, ""));
	return Number.isFinite(n) ? n : 0;
}
function jalaliIso(s) {
	const t = fa(s);
	const m = t.match(/^(\d{4})[\/.-](\d{1,2})[\/.-](\d{1,2})$/);
	if (!m) return t;
	return `${m[1]}-${pad2(Number(m[2]))}-${pad2(Number(m[3]))}`;
}
function monthKey(name, date) {
	const mm = MONTH_MAP[name];
	const y = date.slice(0, 4) || "1405";
	if (mm) return `${y}-${mm}`;
	const m = date.match(/^(\d{4})-(\d{2})/);
	return m ? `${m[1]}-${m[2]}` : date.slice(0, 7);
}
function norm(s) {
	return fa(s).toLowerCase();
}
function mapHeaders(headers) {
	const idx = {};
	const n = headers.map(norm);
	for (const [field, names] of Object.entries(ALIASES)) {
		const found = names.map(norm).find((x) => n.includes(x));
		if (found) idx[field] = n.indexOf(found);
	}
	return idx;
}
function parseWorkbook(buf) {
	const wb = readSync(buf, {
		type: "array",
		cellDates: true
	});
	const sheets = wb.SheetNames;
	const name = sheets.find((n) => /خام|داده/.test(n)) ?? sheets[0];
	const warnings = [];
	if (!name) return {
		rows: [],
		warnings: ["برگه‌ای در فایل نیست."],
		sheets
	};
	const aoa = utils.sheet_to_json(wb.Sheets[name], {
		header: 1,
		defval: "",
		raw: true
	});
	if (aoa.length < 2) return {
		rows: [],
		warnings: ["برگه داده ردیف ندارد."],
		sheets
	};
	const idx = mapHeaders((aoa[0] ?? []).map((h) => fa(h)));
	if (idx.product == null && idx.ticket == null) warnings.push("ستون‌های پذیرش/محصول پیدا نشد. از الگوی رصد استفاده کنید.");
	const rows = [];
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
			repeatCost: num(idx.repeatCost != null ? row[idx.repeatCost] : 0)
		});
	});
	if (rows.length === 0) warnings.push("هیچ ردیف خدماتی خوانده نشد.");
	return {
		rows,
		warnings,
		sheets
	};
}
var HEADERS = [
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
	"هزینه ضرر تکرار (تومان)"
];
function toAoa(rows) {
	return [HEADERS, ...rows.map((r) => [
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
		r.repeatCost
	])];
}
function exportWorkbook(rows, filename) {
	const wb = utils.book_new();
	utils.book_append_sheet(wb, utils.aoa_to_sheet(toAoa(rows)), "داده خام");
	writeFileSync(wb, filename);
}
function downloadTemplate(rows) {
	const wb = utils.book_new();
	utils.book_append_sheet(wb, utils.aoa_to_sheet([
		["سامانه رصد — الگوی خدمات پس از فروش آرتا"],
		["برگه «داده خام» را برای ماه جدید پر کنید. نام ستون‌ها را تغییر ندهید."],
		["ماه را با نام شمسی بنویسید: فروردین، اردیبهشت، …"],
		["تاریخ‌ها به صورت 1405/05/12"]
	]), "راهنما");
	utils.book_append_sheet(wb, utils.aoa_to_sheet(toAoa(rows.slice(0, 25))), "داده خام");
	writeFileSync(wb, "rasad-arta-template.xlsx");
}
function DataPage() {
	const all = useReportStore((s) => s.rows);
	const source = useReportStore((s) => s.source);
	const fileName = useReportStore((s) => s.fileName);
	const lastImportAt = useReportStore((s) => s.lastImportAt);
	const importLog = useReportStore((s) => s.importLog);
	const importExcel = useReportStore((s) => s.importExcel);
	const resetSeed = useReportStore((s) => s.resetSeed);
	const { rows, month } = useView();
	const [mode, setMode] = (0, import_react.useState)("merge-months");
	const [drag, setDrag] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(0);
	const inputRef = (0, import_react.useRef)(null);
	const pageSize = 12;
	const months = monthsOf(all);
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim();
		if (!query) return rows;
		return rows.filter((r) => [
			r.ticket,
			r.serial,
			r.model,
			r.product,
			r.cause,
			r.failure,
			r.part
		].some((v) => v.includes(query)));
	}, [rows, q]);
	const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
	const slice = filtered.slice(page * pageSize, page * pageSize + pageSize);
	async function handleFile(file) {
		setBusy(true);
		try {
			const parsed = parseWorkbook(await file.arrayBuffer());
			if (parsed.rows.length === 0) {
				toast.error("هیچ ردیف خدماتی در فایل پیدا نشد.");
				return;
			}
			importExcel(parsed.rows, file.name, mode);
			toast.success(`${faNum(parsed.rows.length, 0)} ردیف وارد شد`);
		} catch {
			toast.error("خواندن فایل اکسل ناموفق بود.");
		} finally {
			setBusy(false);
			setDrag(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "داده و اکسل",
			kicker: "چرخه ماهانه",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => downloadTemplate(SEED_RECORDS),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "دانلود الگو"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => exportWorkbook(all, `arta-export.xlsx`),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-3.5" }), "خروجی کامل"]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-lg p-4 lg:col-span-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "بارگذاری ماه جدید" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "فایل ‎.xlsx / ‎.xlsm با برگه «داده خام» و همان ستون‌های گزارش آرتا." })] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onDragOver: (e) => {
							e.preventDefault();
							setDrag(true);
						},
						onDragLeave: () => setDrag(false),
						onDrop: (e) => {
							e.preventDefault();
							const f = e.dataTransfer.files[0];
							if (f) handleFile(f);
						},
						className: cn("flex min-h-44 flex-col items-center justify-center rounded-md border border-dashed border-border-strong bg-bg px-4 py-8 text-center", drag && "bg-bg-subtle"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-6 text-fg-muted" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm",
								children: "فایل اکسل را اینجا رها کنید"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-4",
								size: "sm",
								disabled: busy,
								onClick: () => inputRef.current?.click(),
								children: busy ? "در حال خواندن…" : "انتخاب فایل"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "file",
								accept: ".xlsx,.xls,.xlsm",
								className: "hidden",
								onChange: (e) => {
									const f = e.target.files?.[0];
									if (f) handleFile(f);
									e.target.value = "";
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm text-fg-muted",
							children: ["شیوه ورود", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								className: "h-9 text-xs",
								value: mode,
								onChange: (e) => setMode(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "merge-months",
									children: "ادغام ماه‌های فایل"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "replace-all",
									children: "جایگزینی کل داده"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => resetSeed(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "بازگشت به فایل آرتا"]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-lg p-4 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "وضعیت منبع" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-fg-muted",
									children: "منبع"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: source === "excel" ? "pine" : "muted",
									children: source === "excel" ? "اکسل جدید" : "فایل آرتا"
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-fg-muted",
									children: "فایل"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "truncate text-left",
									children: fileName ?? "—"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-fg-muted",
									children: "ردیف"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular",
									children: faNum(all.length, 0)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-fg-muted",
									children: "ماه‌ها"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular",
									children: faNum(months.length, 0)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-fg-muted",
									children: "آخرین ورود"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-left text-xs",
									children: lastImportAt ? new Date(lastImportAt).toLocaleString("fa-IR") : "—"
								})]
							})
						]
					}),
					importLog.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 border-t border-border pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs text-fg-muted",
							children: "تاریخچه ورود"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2 text-xs",
							children: importLog.slice(0, 5).map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-2 text-fg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: log.fileName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular",
									children: [faNum(log.rows, 0), " ردیف"]
								})]
							}, log.at))
						})]
					}) : null
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-5 rounded-lg p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, { children: ["کاوش ردیف‌ها", month === "all" ? "" : ` — ${formatMonth(month)}`] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHint, { children: [faNum(filtered.length, 0), " ردیف"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "h-9 max-w-xs",
					placeholder: "جستجوی پذیرش، سریال، مدل، علت…",
					value: q,
					onChange: (e) => {
						setQ(e.target.value);
						setPage(0);
					}
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[56rem] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs text-fg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-right font-medium",
									children: "پذیرش"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-right font-medium",
									children: "تاریخ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-right font-medium",
									children: "دستگاه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-right font-medium",
									children: "مدل"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-right font-medium",
									children: "علت"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-left font-medium",
									children: "عمر"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-left font-medium",
									children: "هزینه"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: slice.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 tabular text-xs",
									children: r.ticket
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 text-xs",
									children: formatJalaliDate(r.acceptDate)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5",
									children: r.product
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 text-xs",
									children: r.model
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 text-xs",
									children: r.cause
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 text-left tabular",
									children: faNum(r.ageMonths, 0)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2.5 text-left tabular",
									children: formatMoney(r.totalCost)
								})
							]
						}, r.id)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between text-xs text-fg-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"صفحه ",
						faNum(page + 1, 0),
						" از ",
						faNum(pages, 0)
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page === 0,
							onClick: () => setPage((p) => Math.max(0, p - 1)),
							children: "قبلی"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: page >= pages - 1,
							onClick: () => setPage((p) => p + 1),
							children: "بعدی"
						})]
					})]
				})
			]
		})
	] });
}
//#endregion
export { DataPage as component };
