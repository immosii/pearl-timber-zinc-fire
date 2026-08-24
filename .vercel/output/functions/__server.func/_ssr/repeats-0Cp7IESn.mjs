import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as PageHeader, c as formatMoney, s as faNum, t as Card, u as formatPctPlain } from "./page-header-BS7rdco_.mjs";
import { t as KpiCard } from "./kpi-card-B0ExL-Es.mjs";
import { t as useView } from "./use-view-CKpncG6R.mjs";
import { f as compareMonthOf, p as computeKpis, w as repeatSerials } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/repeats-0Cp7IESn.js
var import_jsx_runtime = require_jsx_runtime();
function RepeatsPage() {
	const { filtered, rows, month } = useView();
	const k = computeKpis(filtered, month, compareMonthOf(month));
	const serials = repeatSerials(rows);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "مراجعه تکراری",
			kicker: "سریال‌های چندباره",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-xs leading-relaxed text-fg-muted",
				children: "سریال‌هایی که بیش از یک پذیرش دارند. هزینه ضرر تکرار از فایل اکسل آمده است."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid grid-cols-2 gap-3 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "ردیف تکراری",
					value: faNum(k.repeats, 0),
					hint: `${formatPctPlain(k.repeatShare, 0)} از مراجعات`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "سریال یکتا تکراری",
					value: faNum(serials.length, 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "هزینه ضرر تکرار",
					value: formatMoney(k.repeatCost)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-5 overflow-hidden rounded-lg p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[36rem] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-bg-subtle text-xs text-fg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-right font-medium",
								children: "شماره سریال"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-right font-medium",
								children: "دستگاه"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-right font-medium",
								children: "مدل"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-left font-medium",
								children: "تعداد مراجعه"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-left font-medium",
								children: "ضرر تکرار"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: serials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 font-mono text-xs",
								children: s.serial
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5",
								children: s.product
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5",
								children: s.model
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 text-left tabular",
								children: faNum(s.count, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 text-left tabular",
								children: formatMoney(s.cost)
							})
						]
					}, s.serial)) })]
				})
			})
		})
	] });
}
//#endregion
export { RepeatsPage as component };
