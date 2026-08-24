import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as ClientChart, r as tooltipStyle, t as CHART } from "./theme-DZ3tRnO9.mjs";
import { a as PageHeader, c as formatMoney, i as CardTitle, n as CardHeader, r as CardHint, s as faNum, t as Card, u as formatPctPlain } from "./page-header-BS7rdco_.mjs";
import { t as KpiCard } from "./kpi-card-B0ExL-Es.mjs";
import { c as ResponsiveContainer, i as XAxis, l as Tooltip, o as CartesianGrid, r as YAxis, s as Bar, t as BarChart } from "../_libs/recharts+[...].mjs";
import { t as useView } from "./use-view-CKpncG6R.mjs";
import { t as RankTable } from "./rank-table-DBvAGHau.mjs";
import { _ as groupBy, b as monthlySeries, f as compareMonthOf, g as formatMonthShort, h as formatMonth, p as computeKpis } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cost-y93rE5Ne.js
var import_jsx_runtime = require_jsx_runtime();
function CostPage() {
	const { filtered, rows, month } = useView();
	const k = computeKpis(filtered, month, compareMonthOf(month));
	const byProduct = groupBy(rows, (r) => r.product).sort((a, b) => b.cost - a.cost);
	const byCause = groupBy(rows, (r) => r.cause).sort((a, b) => b.cost - a.cost).slice(0, 12);
	const series = monthlySeries(filtered);
	const showDelta = month !== "all";
	const costShare = k.cost || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "هزینه گارانتی",
			kicker: "تحلیل مالی تقریبی",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-xs leading-relaxed text-fg-muted",
				children: "ارقام از ستون‌های هزینه قطعه، اجرت و ایاب‌وذهاب فایل اکسل خوانده شده‌اند."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid grid-cols-2 gap-3 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "کل گارانتی",
					value: formatMoney(k.cost),
					delta: showDelta ? k.costDelta : void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "قطعه",
					value: formatMoney(k.partCost),
					hint: formatPctPlain(k.partCost / costShare * 100, 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "اجرت + ایاب‌وذهاب",
					value: formatMoney(k.laborCost),
					hint: formatPctPlain(k.laborCost / costShare * 100, 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "ضرر مراجعه تکراری",
					value: formatMoney(k.repeatCost),
					hint: `${faNum(k.repeats, 0)} ردیف تکراری`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-5 grid gap-3 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-lg p-4 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "هزینه به تفکیک دستگاه" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: byProduct.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular text-fg-muted",
								children: [
									formatMoney(p.cost),
									" · ",
									formatPctPlain(p.cost / costShare * 100, 0)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 overflow-hidden rounded-full bg-bg-subtle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary",
								style: { width: `${p.cost / costShare * 100}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[11px] text-fg-subtle",
							children: [
								faNum(p.count, 0),
								" مراجعه · میانگین ",
								formatMoney(p.avgCost)
							]
						})
					] }, p.name))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-lg p-4 lg:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "روند هزینه ماهانه" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "میلیون تومان" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[280px] w-full",
					dir: "ltr",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: series,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: CHART.grid,
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "month",
									tickFormatter: formatMonthShort,
									tick: {
										fill: CHART.tick,
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tickFormatter: (v) => `${Math.round(Number(v) / 1e6)}`,
									tick: {
										fill: CHART.tick,
										fontSize: 11
									},
									axisLine: false,
									tickLine: false,
									width: 36
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: tooltipStyle,
									formatter: (v) => [formatMoney(Number(v)), "هزینه"],
									labelFormatter: (l) => formatMonth(String(l))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "cost",
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
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-5 rounded-lg p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "پرهزینه‌ترین علت‌ها" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankTable, {
				rows: byCause,
				nameLabel: "علت",
				value: "cost"
			})]
		})
	] });
}
//#endregion
export { CostPage as component };
