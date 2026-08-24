import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-D8UMmuHf.mjs";
import { a as PageHeader, c as formatMoney, s as faNum, t as Card, u as formatPctPlain } from "./page-header-BS7rdco_.mjs";
import { t as useView } from "./use-view-CKpncG6R.mjs";
import { _ as groupBy, u as causePriority } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/causes-PNAEfMDO.js
var import_jsx_runtime = require_jsx_runtime();
function CausesPage() {
	const { rows } = useView();
	const causes = groupBy(rows, (r) => r.cause);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "دسته‌بندی علت خرابی",
		kicker: "بازبینی کیفیت",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-sm text-xs leading-relaxed text-fg-muted",
			children: "اولویت بر اساس حجم و میانگین ماه تا خرابی محاسبه می‌شود. علت‌های زودهنگام و پرحجم بالای جدول‌اند."
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "overflow-hidden rounded-lg p-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[44rem] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-bg-subtle text-xs text-fg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-right font-medium",
							children: "دسته دقیق علت"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "تعداد"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "سهم"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "میانگین ماه"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "هزینه"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-right font-medium",
							children: "اولویت"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: causes.map((c) => {
					const p = causePriority(c, rows.length);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-left tabular",
								children: faNum(c.count, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-left tabular",
								children: formatPctPlain(c.share, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-left tabular",
								children: faNum(c.avgAge, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-left tabular",
								children: formatMoney(c.cost)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: p.tone,
										children: p.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "max-w-[16rem] text-left text-[11px] text-fg-subtle",
										children: p.note
									})]
								})
							})
						]
					}, c.name);
				}) })]
			})
		})
	})] });
}
//#endregion
export { CausesPage as component };
