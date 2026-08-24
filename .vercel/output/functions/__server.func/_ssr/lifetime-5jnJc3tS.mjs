import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as ClientChart, r as tooltipStyle, t as CHART } from "./theme-DZ3tRnO9.mjs";
import { a as PageHeader, i as CardTitle, n as CardHeader, r as CardHint, s as faNum, t as Card } from "./page-header-BS7rdco_.mjs";
import { c as ResponsiveContainer, i as XAxis, l as Tooltip, o as CartesianGrid, r as YAxis, s as Bar, t as BarChart } from "../_libs/recharts+[...].mjs";
import { t as useView } from "./use-view-CKpncG6R.mjs";
import { _ as groupBy, s as ageBuckets } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lifetime-5jnJc3tS.js
var import_jsx_runtime = require_jsx_runtime();
function LifetimePage() {
	const { rows } = useView();
	const buckets = ageBuckets(rows);
	const byProduct = groupBy(rows, (r) => r.product);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "زمان‌بندی خرابی",
			kicker: "عمر تا اولین مراجعه",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-xs leading-relaxed text-fg-muted",
				children: "مدت مصرف از تاریخ نصب تا پذیرش. بازه ۰ تا ۳ ماه یعنی خرابی زودهنگام."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-lg p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "توزیع مدت مصرف" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "هیستوگرام ماه تا خرابی" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-[280px] w-full",
				dir: "ltr",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: buckets,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: CHART.grid,
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								tick: {
									fill: CHART.tick,
									fontSize: 11
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: CHART.tick,
									fontSize: 11
								},
								axisLine: false,
								tickLine: false,
								width: 28
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: tooltipStyle,
								formatter: (v) => [faNum(Number(v), 0), "تعداد"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "count",
								fill: CHART[1],
								radius: [
									3,
									3,
									0,
									0
								]
							})
						]
					})
				})
			}) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-5 rounded-lg p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "میانگین عمر به تفکیک دستگاه" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 sm:grid-cols-2",
				children: byProduct.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-md bg-bg-subtle px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular",
							children: [faNum(p.avgAge, 1), " ماه"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[11px] text-fg-muted",
						children: [faNum(p.count, 0), " مراجعه"]
					})]
				}, p.name))
			})]
		})
	] });
}
//#endregion
export { LifetimePage as component };
