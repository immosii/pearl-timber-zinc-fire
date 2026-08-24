import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as useReportStore, T as toFaDigits, d as cn, h as formatMonth, i as COMPANY } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-BS7rdco_.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-bg-elevated p-4 text-fg shadow-[var(--shadow-border)]", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-3 flex items-start justify-between gap-3", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: cn("text-sm font-medium text-fg", className),
		...props
	});
}
function CardHint({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-xs text-fg-muted", className),
		...props
	});
}
function faNum(n, digits = 0) {
	return toFaDigits(n.toLocaleString("en-US", {
		maximumFractionDigits: digits,
		minimumFractionDigits: digits
	}));
}
function formatMoney(n) {
	const abs = Math.abs(n);
	const sign = n < 0 ? "−" : "";
	if (abs >= 1e9) return `${sign}${faNum(abs / 1e9, 1)} میلیارد`;
	if (abs >= 1e6) return `${sign}${faNum(abs / 1e6, 1)} میلیون`;
	if (abs >= 1e3) return `${sign}${faNum(abs / 1e3, 0)} هزار`;
	return `${sign}${faNum(abs, 0)}`;
}
function formatPct(n, digits = 1) {
	return `${n > 0 ? "+" : n < 0 ? "−" : ""}${faNum(Math.abs(n), digits)}٪`;
}
function formatPctPlain(n, digits = 1) {
	return `${faNum(n, digits)}٪`;
}
function deltaTone(n, invert = false) {
	const v = invert ? -n : n;
	if (Math.abs(n) < .05) return "flat";
	return v > 0 ? "up" : "down";
}
function PageHeader({ kicker, title, children }) {
	const month = useReportStore((s) => s.selectedMonth);
	const period = month === "all" ? COMPANY.periodLabel : formatMonth(month);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] tracking-[0.14em] text-fg-subtle",
			children: kicker ?? period
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-2xl font-medium tracking-tight sm:text-3xl",
			children: title
		})] }), children]
	});
}
//#endregion
export { PageHeader as a, formatMoney as c, CardTitle as i, formatPct as l, CardHeader as n, deltaTone as o, CardHint as r, faNum as s, Card as t, formatPctPlain as u };
