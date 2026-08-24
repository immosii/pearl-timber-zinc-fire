import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as PageHeader, c as formatMoney, i as CardTitle, n as CardHeader, r as CardHint, s as faNum, t as Card, u as formatPctPlain } from "./page-header-BS7rdco_.mjs";
import { t as useView } from "./use-view-CKpncG6R.mjs";
import { t as RankTable } from "./rank-table-DBvAGHau.mjs";
import { _ as groupBy, d as cn, v as heatmap } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/devices-Da9otNUM.js
var import_jsx_runtime = require_jsx_runtime();
function DevicesPage() {
	const { rows } = useView();
	const products = groupBy(rows, (r) => r.product);
	const models = groupBy(rows, (r) => r.model).slice(0, 12);
	const topCauses = groupBy(rows, (r) => r.cause).slice(0, 9);
	const heat = heatmap(rows, topCauses.map((c) => c.name));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "دستگاه و مدل",
			kicker: "ماتریس خرابی",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-xs leading-relaxed text-fg-muted",
				children: "نقشه حرارتی نشان می‌دهد کدام علت روی کدام خانواده محصول متمرکز است."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
			children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-lg p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-fg-muted",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-2xl tabular",
						children: faNum(p.count, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[11px] text-fg-muted",
						children: [
							formatPctPlain(p.share, 0),
							" · ",
							formatMoney(p.cost),
							" · عمر ",
							faNum(p.avgAge, 1),
							" ماه"
						]
					})
				]
			}, p.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-5 overflow-hidden rounded-lg p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "ماتریس دستگاه × علت" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, {
					className: "mt-1",
					children: "نه علت پرتکرار"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[52rem] text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-fg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-medium",
							children: "دستگاه"
						}), heat.causes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "max-w-[6.5rem] px-1 py-2 text-center font-medium leading-4",
							children: c.split(" - ")[0]
						}, c))]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: heat.cells.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-sm",
							children: row.product
						}), row.vals.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("inline-flex min-w-8 justify-center rounded-sm px-1.5 py-1 tabular", v === 0 ? "text-fg-subtle" : "text-primary-fg"),
								style: {
									background: v === 0 ? "transparent" : `color-mix(in oklab, var(--color-primary) ${Math.max(18, v / heat.max * 100)}%, transparent)`,
									color: v === 0 ? void 0 : "var(--color-fg)"
								},
								children: v ? faNum(v, 0) : "—"
							})
						}, heat.causes[i]))]
					}, row.product)) })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-5 rounded-lg p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "پرتکرارترین مدل‌ها" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankTable, {
				rows: models,
				nameLabel: "مدل"
			})]
		})
	] });
}
//#endregion
export { DevicesPage as component };
