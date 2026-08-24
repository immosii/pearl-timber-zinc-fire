import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-D8UMmuHf.mjs";
import { a as PageHeader, c as formatMoney, s as faNum, t as Card } from "./page-header-BS7rdco_.mjs";
import { t as useView } from "./use-view-CKpncG6R.mjs";
import { _ as groupBy } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parts-P6zkiXoC.js
var import_jsx_runtime = require_jsx_runtime();
function PartsPage() {
	const { rows } = useView();
	const parts = groupBy(rows.filter((r) => r.part), (r) => r.part);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "قطعه تعویضی و عمر",
		kicker: "اقدام اصلاحی",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-sm text-xs leading-relaxed text-fg-muted",
			children: "میانگین ماه مصرف تا خرابی به تفکیک قطعه. ردیف‌های با عمر کوتاه و تعداد بالا را اول بازبینی کنید."
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "overflow-hidden rounded-lg p-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[36rem] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-bg-subtle text-xs text-fg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-right font-medium",
							children: "قطعه"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-2.5 text-left font-medium",
							children: "تعداد"
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
							children: "وضعیت"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: parts.map((p) => {
					const early = p.avgAge <= 5 && p.count >= 3;
					const watch = p.avgAge <= 3;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-left tabular",
								children: faNum(p.count, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-left tabular",
								children: faNum(p.avgAge, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-left tabular",
								children: formatMoney(p.cost)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-left",
								children: early ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "bad",
									children: "زودهنگام"
								}) : watch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "warn",
									children: "پایش"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "muted",
									children: "عادی"
								})
							})
						]
					}, p.name);
				}) })]
			})
		})
	})] });
}
//#endregion
export { PartsPage as component };
