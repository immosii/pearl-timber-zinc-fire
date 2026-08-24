import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-DZ3tRnO9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientChart({ children, height = 260 }) {
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setOn(true), []);
	if (!on) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full animate-pulse rounded-md bg-bg-subtle",
		style: { height },
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CHART = {
	1: "var(--color-chart-1)",
	2: "var(--color-chart-2)",
	3: "var(--color-chart-3)",
	4: "var(--color-chart-4)",
	5: "var(--color-chart-5)",
	grid: "var(--color-border)",
	tick: "var(--color-fg-muted)",
	ink: "var(--color-fg)"
};
var tooltipStyle = {
	background: "var(--color-bg-elevated)",
	border: "1px solid var(--color-border)",
	borderRadius: 8,
	fontSize: 12,
	color: "var(--color-fg)",
	direction: "rtl"
};
//#endregion
export { ClientChart as n, tooltipStyle as r, CHART as t };
