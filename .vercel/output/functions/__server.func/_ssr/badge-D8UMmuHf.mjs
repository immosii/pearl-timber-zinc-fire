import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as cn } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-D8UMmuHf.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium", {
	variants: { tone: {
		muted: "bg-bg-subtle text-fg-muted",
		good: "bg-success-bg text-success",
		bad: "bg-danger-bg text-danger",
		warn: "bg-warn-bg text-warn",
		ink: "bg-bg-ink text-fg-on-ink",
		pine: "bg-primary text-primary-fg"
	} },
	defaultVariants: { tone: "muted" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({
			tone,
			className
		})),
		...props
	});
}
//#endregion
export { Badge as t };
