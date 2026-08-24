import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as ClientChart, r as tooltipStyle, t as CHART } from "./theme-DZ3tRnO9.mjs";
import { t as Badge } from "./badge-D8UMmuHf.mjs";
import { a as PageHeader, c as formatMoney, i as CardTitle, n as CardHeader, r as CardHint, s as faNum, t as Card, u as formatPctPlain } from "./page-header-BS7rdco_.mjs";
import { t as KpiCard } from "./kpi-card-B0ExL-Es.mjs";
import { c as ResponsiveContainer, i as XAxis, l as Tooltip, o as CartesianGrid, r as YAxis, s as Bar, t as BarChart } from "../_libs/recharts+[...].mjs";
import { t as useView } from "./use-view-CKpncG6R.mjs";
import { t as RankTable } from "./rank-table-DBvAGHau.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as parseMonthKey, T as toFaDigits, _ as groupBy, b as monthlySeries, d as cn, f as compareMonthOf, g as formatMonthShort, h as formatMonth, i as COMPANY, l as buildInsights, p as computeKpis, r as Button, x as monthsOf } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DIMECH27.js
var import_jsx_runtime = require_jsx_runtime();
function MonthRail({ months, selected, onSelect }) {
	const items = ["all", ...months];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-1 overflow-x-auto pb-1",
		children: items.map((m) => {
			const active = m === selected;
			if (m === "all") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelect(m),
				className: cn("flex h-14 min-w-[4.8rem] shrink-0 flex-col items-center justify-center rounded-md px-2 text-center transition-colors duration-150", active ? "bg-bg-ink text-fg-on-ink" : "bg-bg-elevated text-fg-muted shadow-[var(--shadow-border)] hover:text-fg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-medium",
					children: "کل دوره"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] opacity-70",
					children: "سه ماه"
				})]
			}, m);
			const { year } = parseMonthKey(m);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelect(m),
				className: cn("flex h-14 min-w-[4.4rem] shrink-0 flex-col items-center justify-center rounded-md px-2 text-center transition-colors duration-150", active ? "bg-bg-ink text-fg-on-ink" : "bg-bg-elevated text-fg-muted shadow-[var(--shadow-border)] hover:text-fg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-medium",
					children: formatMonthShort(m)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] opacity-70 tabular",
					children: toFaDigits(year)
				})]
			}, m);
		})
	});
}
function Home() {
	const { filtered, rows, month, setMonth } = useView();
	const months = monthsOf(filtered);
	const k = computeKpis(filtered, month, compareMonthOf(month));
	const insights = buildInsights(rows);
	const series = monthlySeries(filtered);
	const products = groupBy(rows, (r) => r.product);
	const causes = groupBy(rows, (r) => r.cause).slice(0, 8);
	const topProduct = products[0];
	const topCause = causes[0];
	const showDelta = month !== "all";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "میز فرمان گارانتی",
			title: "خلاصه خدمات پس از فروش",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "max-w-sm text-xs leading-relaxed text-fg-muted",
				children: [
					COMPANY.legal,
					" · ",
					month === "all" ? COMPANY.periodLabel : formatMonth(month),
					" ·",
					" ",
					faNum(rows.length, 0),
					" رکورد تعمیر"
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthRail, {
			months,
			selected: month,
			onSelect: setMonth
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "کل مراجعات",
					value: faNum(k.visits, 0),
					delta: showDelta ? k.visitDelta : void 0,
					hint: `${faNum(k.products, 0)} نوع دستگاه / ${faNum(k.models, 0)} مدل`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "هزینه گارانتی",
					value: formatMoney(k.cost),
					delta: showDelta ? k.costDelta : void 0,
					hint: `میانگین ${formatMoney(k.avgCost)} هر مراجعه`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "پرتکرارترین دستگاه",
					value: topProduct?.name ?? "—",
					hint: topProduct ? `${faNum(topProduct.count, 0)} مورد — ${formatPctPlain(topProduct.share, 0)}` : void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "علت غالب",
					value: topCause ? topCause.name.split(" - ")[0] : "—",
					hint: topCause ? `${faNum(topCause.count, 0)} مورد — میانگین ${faNum(topCause.avgAge, 1)} ماه` : void 0
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-5 grid gap-3 lg:grid-cols-2",
			children: insights.map((ins) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-lg bg-bg-elevated p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: ins.tone === "good" ? "good" : ins.tone === "bad" ? "bad" : ins.tone === "warn" ? "warn" : "muted",
						children: ins.tone === "good" ? "مثبت" : ins.tone === "bad" ? "هشدار" : ins.tone === "warn" ? "توجه" : "یادداشت"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: ins.title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-7 text-fg-muted",
					children: ins.body
				})]
			}, ins.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-5 grid gap-3 xl:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-lg p-4 xl:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "روند ماهانه مراجعات" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "تعداد پذیرش در هر ماه شمسی" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[260px] w-full",
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
									formatter: (v, name) => [faNum(Number(v), 0), name === "visits" ? "مراجعه" : "تکراری"],
									labelFormatter: (l) => formatMonth(String(l))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "visits",
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-lg p-4 xl:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "توزیع دستگاه" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/devices",
						children: "جزئیات"
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankTable, {
					rows: products,
					nameLabel: "دستگاه"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-5 rounded-lg p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "علت‌های پرتکرار" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/causes",
					children: "همه علت‌ها"
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankTable, {
				rows: causes,
				nameLabel: "دسته علت"
			})]
		})
	] });
}
//#endregion
export { Home as component };
