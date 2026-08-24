import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as PageHeader, c as formatMoney, s as faNum, t as Card, u as formatPctPlain } from "./page-header-BS7rdco_.mjs";
import { t as useView } from "./use-view-CKpncG6R.mjs";
import { l as Printer } from "../_libs/lucide-react.mjs";
import { _ as groupBy, f as compareMonthOf, h as formatMonth, i as COMPANY, l as buildInsights, p as computeKpis, r as Button } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-DRQRv3nu.js
var import_jsx_runtime = require_jsx_runtime();
function ReportPage() {
	const { filtered, rows, month } = useView();
	const k = computeKpis(filtered, month, compareMonthOf(month));
	const insights = buildInsights(rows);
	const products = groupBy(rows, (r) => r.product);
	const causes = groupBy(rows, (r) => r.cause).slice(0, 10);
	const parts = groupBy(rows.filter((r) => r.part), (r) => r.part).slice(0, 8);
	const period = month === "all" ? COMPANY.periodLabel : formatMonth(month);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "گزارش دوره",
		kicker: "نسخه چاپی",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			className: "no-print",
			size: "sm",
			onClick: () => window.print(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-3.5" }), "چاپ / PDF"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-lg p-5 sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.16em] text-fg-subtle",
						children: "RASAD AFTER-SALES BRIEF"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-medium",
						children: COMPANY.legal
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-fg-muted",
						children: [
							"داشبورد تعمیرات و خدمات پس از فروش · ",
							period,
							" · ",
							faNum(k.visits, 0),
							" رکورد"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					["مراجعات", faNum(k.visits, 0)],
					["هزینه گارانتی", formatMoney(k.cost)],
					["میانگین هر مراجعه", formatMoney(k.avgCost)],
					["ضرر تکرار", formatMoney(k.repeatCost)]
				].map(([l, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md bg-bg-subtle px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-fg-muted",
						children: l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-lg font-medium tabular",
						children: v
					})]
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "جمع‌بندی مدیریتی"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 space-y-2 text-sm leading-7 text-fg-muted",
					children: insights.map((ins) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-fg",
							children: [ins.title, "."]
						}),
						" ",
						ins.body
					] }, ins.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "دستگاه"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "mt-2 w-full text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-left tabular",
								children: faNum(p.count, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-left tabular",
								children: formatMoney(p.cost)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-left tabular text-fg-muted",
								children: formatPctPlain(p.share, 0)
							})
						]
					}, p.name)) })
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "علت‌های پرتکرار"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "mt-2 w-full text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: causes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 text-left tabular",
							children: faNum(c.count, 0)
						})]
					}, c.name)) })
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "قطعات با بیشترین تعویض"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "mt-2 w-full text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: parts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-left tabular",
								children: faNum(p.count, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 text-left tabular",
								children: [faNum(p.avgAge, 1), " ماه"]
							})
						]
					}, p.name)) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-8 border-t border-border pt-3 text-[11px] text-fg-subtle",
				children: "تهیه شده در سامانه رصد از گزارش نصب و تعمیر خدمات پس از فروش. ارقام به تومان."
			})
		]
	})] });
}
//#endregion
export { ReportPage as component };
