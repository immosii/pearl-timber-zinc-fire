import { E as useReportStore, c as applyFilters, y as inMonth } from "./router-CUgUnQdz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-view-CKpncG6R.js
function useView() {
	const rowsAll = useReportStore((s) => s.rows);
	const filters = useReportStore((s) => s.filters);
	const month = useReportStore((s) => s.selectedMonth);
	const setMonth = useReportStore((s) => s.setMonth);
	const filtered = applyFilters(rowsAll, filters);
	return {
		rowsAll,
		filtered,
		rows: inMonth(filtered, month),
		month,
		setMonth,
		filters
	};
}
//#endregion
export { useView as t };
