import { applyFilters, inMonth } from "@/lib/analytics";
import { useReportStore } from "@/lib/store";

export function useView() {
  const rowsAll = useReportStore((s) => s.rows);
  const filters = useReportStore((s) => s.filters);
  const month = useReportStore((s) => s.selectedMonth);
  const setMonth = useReportStore((s) => s.setMonth);
  const filtered = applyFilters(rowsAll, filters);
  const rows = inMonth(filtered, month);
  return { rowsAll, filtered, rows, month, setMonth, filters };
}
