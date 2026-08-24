import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as formatMoney, s as faNum, u as formatPctPlain } from "./page-header-BS7rdco_.mjs";
import { d as cn } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rank-table-DBvAGHau.js
var import_jsx_runtime = require_jsx_runtime();
function RankTable({ rows, nameLabel = "عنوان", value = "count" }) {
	const max = Math.max(1, ...rows.map((r) => value === "cost" ? r.cost ?? 0 : r.count));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[18rem] text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "text-xs text-fg-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 text-right font-medium",
						children: nameLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "pb-2 text-left font-medium",
						children: value === "cost" ? "هزینه" : "تعداد"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-[28%] pb-2 font-medium" })
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r, i) => {
				const v = value === "cost" ? r.cost ?? 0 : r.count;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-fg-subtle tabular",
									children: [i + 1, "."]
								}),
								" ",
								r.name,
								r.share != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-2 text-[11px] text-fg-subtle",
									children: formatPctPlain(r.share, 0)
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 text-left tabular",
							children: value === "cost" ? formatMoney(v) : faNum(v, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 overflow-hidden rounded-full bg-bg-subtle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("h-full rounded-full bg-primary"),
									style: { width: `${Math.max(4, v / max * 100)}%` }
								})
							})
						})
					]
				}, r.name);
			}) })]
		})
	});
}
//#endregion
export { RankTable as t };
