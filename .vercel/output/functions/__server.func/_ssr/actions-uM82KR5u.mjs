import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as ClientChart, r as tooltipStyle, t as CHART } from "./theme-DZ3tRnO9.mjs";
import { t as Badge } from "./badge-BLKPyyZJ.mjs";
import { a as PageHeader, i as CardTitle, n as CardHeader, r as CardHint, s as faNum, t as Card } from "./page-header-BPv5tnG7.mjs";
import { t as KpiCard } from "./kpi-card-BSEtLcW4.mjs";
import { t as actionTone } from "./cohort-kSBQ6Va8.mjs";
import { c as ResponsiveContainer, i as XAxis, l as Tooltip, o as CartesianGrid, r as YAxis, s as Bar, t as BarChart } from "../_libs/recharts+[...].mjs";
import { E as toFaDigits } from "./router-kAfEf0Nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-uM82KR5u.js
var import_jsx_runtime = require_jsx_runtime();
var ACTIONS = [];
function formatDate(v) {
	if (!v || v === "-") return "—";
	return toFaDigits(v);
}
function ActionsPage() {
	const totalCases = ACTIONS.reduce((s, a) => s + a.count, 0);
	const inProgress = ACTIONS.filter((a) => a.result.includes("اقدام")).length;
	const improving = ACTIONS.filter((a) => a.result.includes("بهبود")).length;
	const chart = [...ACTIONS].sort((a, b) => b.count - a.count).map((a) => ({
		name: a.part,
		count: a.count
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "اقدامات اصلاحی خدمات",
			kicker: "پیگیری کیفیت",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-xs leading-relaxed text-fg-muted",
				children: "فهرست قطعه، میانگین ماه مصرف، تعداد و وضعیت اقدام — عیناً از فایل «اقدامات اصلاحی خدمات»."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid grid-cols-2 gap-3 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "قطعه در فهرست",
					value: faNum(ACTIONS.length, 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "مجموع موارد",
					value: faNum(totalCases, 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "در دست اقدام",
					value: faNum(inProgress, 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "در حال بهبود",
					value: faNum(improving, 0)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-5 rounded-lg p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "تعداد به تفکیک قطعه" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "همان ستون «تعداد» فایل اکسل" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, {
				height: 320,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[320px] w-full",
					dir: "ltr",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: chart,
							layout: "vertical",
							margin: {
								left: 8,
								right: 12,
								top: 4,
								bottom: 4
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: CHART.grid,
									horizontal: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									type: "number",
									tick: {
										fill: CHART.tick,
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									type: "category",
									dataKey: "name",
									width: 148,
									tick: {
										fill: CHART.tick,
										fontSize: 10
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: tooltipStyle,
									formatter: (v) => [faNum(Number(v), 0), "تعداد"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "count",
									fill: CHART[1],
									radius: [
										0,
										3,
										3,
										0
									]
								})
							]
						})
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-5 overflow-hidden rounded-lg p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[52rem] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-bg-subtle text-xs text-fg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-right font-medium",
								children: "قطعه"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-left font-medium",
								children: "میانگین ماه مصرف"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-left font-medium",
								children: "تعداد"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-right font-medium",
								children: "نظرات / اقدامات"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-left font-medium",
								children: "زمان اقدام"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-right font-medium",
								children: "نتیجه"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ACTIONS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: a.part
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-left tabular",
								children: faNum(a.avgMonths, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-left tabular",
								children: faNum(a.count, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-xs leading-6 text-fg-muted",
								children: a.action
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-left tabular text-xs",
								children: formatDate(a.actionDate)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: actionTone(a.result),
									children: a.result === "-" ? "—" : a.result
								})
							})
						]
					}, a.part)) })]
				})
			})
		})
	] });
}
//#endregion
export { ActionsPage as component };
