import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-D8UMmuHf.mjs";
import { l as formatPct, o as deltaTone, t as Card } from "./page-header-BS7rdco_.mjs";
import { d as cn } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kpi-card-B0ExL-Es.js
var import_jsx_runtime = require_jsx_runtime();
function KpiCard({ label, value, delta, hint, invert }) {
	const tone = delta == null ? "flat" : deltaTone(delta, invert);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex min-h-[7.5rem] flex-col justify-between rounded-lg p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-fg-muted",
					children: label
				}), delta != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: tone === "up" ? "good" : tone === "down" ? "bad" : "muted",
					children: formatPct(delta)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-3 font-display text-2xl font-medium tracking-tight tabular sm:text-[1.7rem]"),
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-fg-subtle",
				children: hint
			}) : null
		]
	});
}
//#endregion
export { KpiCard as t };
