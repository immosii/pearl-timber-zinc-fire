import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as ClientChart, r as tooltipStyle, t as CHART } from "./theme-DZ3tRnO9.mjs";
import { t as Badge } from "./badge-BLKPyyZJ.mjs";
import { a as PageHeader, i as CardTitle, n as CardHeader, r as CardHint, s as faNum, t as Card } from "./page-header-BPv5tnG7.mjs";
import { a as slashMonthLabel, i as ratePct, n as formatRate, r as productsOf } from "./cohort-kSBQ6Va8.mjs";
import { a as Line, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as LineChart, o as CartesianGrid, r as YAxis, s as Bar, t as BarChart, u as Legend } from "../_libs/recharts+[...].mjs";
import { E as toFaDigits, d as cn } from "./router-kAfEf0Nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cohorts-djsRGUrM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var install_cohort_default = {
	title: "کوهورت نصب",
	basis: "",
	volumeLabel: "نصب",
	rows: [],
	totals: [],
	notes: []
};
var production_cohort_default = {
	title: "کوهورت تولید",
	basis: "",
	volumeLabel: "تولید",
	rows: [],
	totals: [],
	notes: []
};
var cohort_trend_default = {
	title: "مقایسه نصب و تولید",
	basis: "",
	rows: []
};
var INSTALL = install_cohort_default;
var PRODUCE = production_cohort_default;
var TREND = cohort_trend_default;
var TABS = [
	{
		id: "compare",
		label: "مقایسه ۳ماهه"
	},
	{
		id: "install",
		label: "کوهورت نصب"
	},
	{
		id: "produce",
		label: "کوهورت تولید"
	}
];
function CohortsPage() {
	const [tab, setTab] = (0, import_react.useState)("compare");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "کوهورت نصب و تولید",
			kicker: "نرخ خرابی تجمعی",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-xs leading-relaxed text-fg-muted",
				children: "جداول و نمودارها فقط از شیت‌های «کوهورت نصب»، «کوهورت تولید» و بخش ۰۲ داشبورد بازسازی‌شده هستند."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1 overflow-x-auto pb-1",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTab(t.id),
				className: cn("flex h-11 shrink-0 items-center rounded-md px-3 text-sm transition-colors duration-150", tab === t.id ? "bg-bg-ink text-fg-on-ink" : "bg-bg-elevated text-fg-muted shadow-[var(--shadow-border)] hover:text-fg"),
				children: t.label
			}, t.id))
		}),
		tab === "compare" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareSection, {}) : null,
		tab === "install" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackSection, { pack: INSTALL }) : null,
		tab === "produce" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackSection, { pack: PRODUCE }) : null
	] });
}
function CompareSection() {
	const chart = TREND.rows.map((r) => ({
		cohort: r.cohort,
		نصب: ratePct(r.installRate3),
		تولید: ratePct(r.produceRate3)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-lg p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: TREND.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
				className: "mt-1 max-w-3xl leading-6",
				children: TREND.basis
			})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, {
				height: 300,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[300px] w-full",
					dir: "ltr",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: chart,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: CHART.grid,
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "cohort",
									tickFormatter: slashMonthLabel,
									tick: {
										fill: CHART.tick,
										fontSize: 10
									},
									axisLine: false,
									tickLine: false,
									interval: 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
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
									labelFormatter: (l) => slashMonthLabel(String(l)),
									formatter: (v, name) => [`${faNum(Number(v), 2)}٪`, String(name)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "نصب",
									stroke: CHART[1],
									strokeWidth: 2,
									dot: false,
									connectNulls: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "تولید",
									stroke: CHART[4],
									strokeWidth: 2,
									dot: false,
									connectNulls: false
								})
							]
						})
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-hidden rounded-lg p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[28rem] overflow-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[48rem] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "sticky top-0 bg-bg-subtle text-xs text-fg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-right font-medium",
								children: "کوهورت (ماه)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-left font-medium",
								children: "نصب: تعداد"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-left font-medium",
								children: "نصب: خرابی ۳ماهه"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-left font-medium",
								children: "نرخ کوهورت نصب"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-left font-medium",
								children: "تولید: تعداد"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-left font-medium",
								children: "تولید: خرابی ۳ماهه"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-2.5 text-left font-medium",
								children: "نرخ کوهورت تولید"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: TREND.rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 tabular",
								children: slashMonthLabel(r.cohort)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 text-left tabular",
								children: faNum(r.installVolume, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 text-left tabular",
								children: faNum(r.installFail3, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 text-left tabular",
								children: formatRate(r.installRate3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 text-left tabular",
								children: faNum(r.produceVolume, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 text-left tabular",
								children: faNum(r.produceFail3, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 text-left tabular",
								children: formatRate(r.produceRate3)
							})
						]
					}, r.cohort)) })]
				})
			})
		})]
	});
}
function PackSection({ pack }) {
	const products = productsOf(pack.rows);
	const [product, setProduct] = (0, import_react.useState)("all");
	const rows = product === "all" ? pack.rows : pack.rows.filter((r) => r.product === product);
	const rateChart = (0, import_react.useMemo)(() => {
		const months = Array.from(new Set(pack.rows.map((r) => r.cohort)));
		const src = product === "all" ? pack.rows : pack.rows.filter((r) => r.product === product);
		const names = Array.from(new Set(pack.rows.map((r) => r.product)));
		return months.map((cohort) => {
			const subset = src.filter((r) => r.cohort === cohort);
			const point = { cohort };
			if (product === "all") for (const p of names) {
				const hit = subset.find((r) => r.product === p);
				point[p] = hit ? ratePct(hit.rate12) : void 0;
			}
			else {
				const hit = subset[0];
				point["نرخ ۱ماهه"] = hit ? ratePct(hit.rate1) : void 0;
				point["نرخ ۳ماهه"] = hit ? ratePct(hit.rate3) : void 0;
				point["نرخ ۶ماهه"] = hit ? ratePct(hit.rate6) : void 0;
				point["نرخ ۱۲ماهه"] = hit ? ratePct(hit.rate12) : void 0;
			}
			return point;
		});
	}, [pack.rows, product]);
	const totalBars = pack.totals.map((t) => ({
		name: t.product,
		"نرخ ۱۲ماهه": ratePct(t.rate12) ?? 0
	}));
	const lineKeys = product === "all" ? products : [
		"نرخ ۱ماهه",
		"نرخ ۳ماهه",
		"نرخ ۶ماهه",
		"نرخ ۱۲ماهه"
	];
	const lineColors = [
		CHART[1],
		CHART[5],
		CHART[4],
		CHART[2],
		CHART[3]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-lg p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: pack.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-6 text-fg-muted",
					children: pack.basis
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-lg p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "شاخص کل بر اساس نوع دستگاه" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: pack.volumeLabel === "نصب" ? "بر مبنای ماه نصب" : "بر مبنای ماه تولید" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[48rem] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs text-fg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-right font-medium",
									children: "نوع دستگاه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									className: "pb-2 text-left font-medium",
									children: ["تعداد ", pack.volumeLabel]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-left font-medium",
									children: "خرابی ۱ماهه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-left font-medium",
									children: "نرخ ۱ماهه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-left font-medium",
									children: "خرابی ۳ماهه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-left font-medium",
									children: "نرخ ۳ماهه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-left font-medium",
									children: "خرابی ۶ماهه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-left font-medium",
									children: "نرخ ۶ماهه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-left font-medium",
									children: "خرابی ۱۲ماهه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 text-left font-medium",
									children: "نرخ ۱۲ماهه"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: pack.totals.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TotalRow, { t }, t.product)) })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 xl:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-lg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "نرخ ۱۲ماهه به تفکیک دستگاه" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "از جدول شاخص کل همان شیت" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[260px] w-full",
						dir: "ltr",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: totalBars,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: CHART.grid,
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fill: CHART.tick,
											fontSize: 10
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
										width: 36
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										formatter: (v) => [`${faNum(Number(v), 2)}٪`, "نرخ ۱۲ماهه"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "نرخ ۱۲ماهه",
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
					className: "rounded-lg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: product === "all" ? "روند نرخ ۱۲ماهه هر دستگاه" : `روند نرخ‌ها — ${product}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "مقادیر نرخ همان شیت؛ سلول خالی اکسل در نمودار نیست" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[260px] w-full",
						dir: "ltr",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: rateChart,
								margin: {
									top: 8,
									right: 8,
									left: 0,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: CHART.grid,
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "cohort",
										tickFormatter: slashMonthLabel,
										tick: {
											fill: CHART.tick,
											fontSize: 10
										},
										axisLine: false,
										tickLine: false,
										interval: 3
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
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
										labelFormatter: (l) => slashMonthLabel(String(l)),
										formatter: (v, name) => [`${faNum(Number(v), 2)}٪`, String(name)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
									lineKeys.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: k,
										stroke: lineColors[i % lineColors.length],
										strokeWidth: 2,
										dot: false,
										connectNulls: false
									}, k))
								]
							})
						})
					}) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden rounded-lg p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "جدول ماهانه به تفکیک دستگاه"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-fg-muted",
						children: [faNum(rows.length, 0), " ردیف از شیت اکسل"]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
							active: product === "all",
							onClick: () => setProduct("all"),
							children: "همه"
						}), products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
							active: product === p,
							onClick: () => setProduct(p),
							children: p
						}, p))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[32rem] overflow-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[56rem] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "sticky top-0 bg-bg-subtle text-xs text-fg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 text-right font-medium",
									children: "کوهورت"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 text-right font-medium",
									children: "ماه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 text-right font-medium",
									children: "نوع دستگاه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									className: "px-4 py-2.5 text-left font-medium",
									children: ["تعداد ", pack.volumeLabel]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 text-left font-medium",
									children: "خرابی ۱م"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 text-left font-medium",
									children: "نرخ ۱م"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 text-left font-medium",
									children: "خرابی ۳م"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 text-left font-medium",
									children: "نرخ ۳م"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 text-left font-medium",
									children: "خرابی ۶م"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 text-left font-medium",
									children: "نرخ ۶م"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 text-left font-medium",
									children: "خرابی ۱۲م"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2.5 text-left font-medium",
									children: "نرخ ۱۲م"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, { r }, `${r.cohort}-${r.product}`)) })]
					})
				})]
			}),
			pack.notes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-lg p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "نکته اجرایی" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-xs leading-6 text-fg-muted",
					children: pack.notes.filter((n) => n !== "نکته اجرایی").map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: n }, n))
				})]
			}) : null
		]
	});
}
function TotalRow({ t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-t border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2.5",
				children: t.product
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2.5 text-left tabular",
				children: faNum(t.volume, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2.5 text-left tabular",
				children: faNum(t.fail1, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2.5 text-left tabular",
				children: formatRate(t.rate1)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2.5 text-left tabular",
				children: faNum(t.fail3, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2.5 text-left tabular",
				children: formatRate(t.rate3)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2.5 text-left tabular",
				children: faNum(t.fail6, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2.5 text-left tabular",
				children: formatRate(t.rate6)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2.5 text-left tabular",
				children: faNum(t.fail12, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2.5 text-left tabular",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: t.rate12 != null && t.rate12 >= .01 ? "warn" : "muted",
					children: formatRate(t.rate12)
				})
			})
		]
	});
}
function DetailRow({ r }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-t border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2 tabular text-xs",
				children: toFaDigits(r.cohort)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2",
				children: r.monthName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2",
				children: r.product
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2 text-left tabular",
				children: faNum(r.volume, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2 text-left tabular",
				children: faNum(r.fail1, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2 text-left tabular",
				children: formatRate(r.rate1)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2 text-left tabular",
				children: faNum(r.fail3, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2 text-left tabular",
				children: formatRate(r.rate3)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2 text-left tabular",
				children: faNum(r.fail6, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2 text-left tabular",
				children: formatRate(r.rate6)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2 text-left tabular",
				children: faNum(r.fail12, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2 text-left tabular",
				children: formatRate(r.rate12)
			})
		]
	});
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-8 rounded-md px-2.5 text-xs transition-colors duration-150", active ? "bg-bg-ink text-fg-on-ink" : "bg-bg-subtle text-fg-muted hover:text-fg"),
		children
	});
}
//#endregion
export { CohortsPage as component };
