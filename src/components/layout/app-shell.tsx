import { Link } from "@tanstack/react-router";
import { Menu, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { monthsOf, uniqueValues } from "@/lib/analytics";
import { COMPANY } from "@/lib/company";
import { formatMonth } from "@/lib/jalali";
import { useReportStore } from "@/lib/store";
import { ALL_MONTHS } from "@/lib/types";

export function AppShell({ children }: { children: React.ReactNode }) {
  const hydrate = useReportStore((s) => s.hydrate);
  const rows = useReportStore((s) => s.rows);
  const filters = useReportStore((s) => s.filters);
  const selectedMonth = useReportStore((s) => s.selectedMonth);
  const setMonth = useReportStore((s) => s.setMonth);
  const setFilter = useReportStore((s) => s.setFilter);
  const source = useReportStore((s) => s.source);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const months = monthsOf(rows);
  const products = uniqueValues(rows, "product");
  const causes = uniqueValues(rows, "cause");
  const models = uniqueValues(rows, "model");

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <Toaster position="top-center" dir="rtl" richColors={false} />
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-3 py-2.5 sm:px-5">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-sm hover:bg-bg-subtle lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="منو"
          >
            <Menu className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="truncate text-sm font-medium">{COMPANY.legal}</span>
              <span className="hidden text-[11px] text-fg-subtle sm:inline">{COMPANY.desk}</span>
            </div>
            <p className="text-[11px] text-fg-muted">
              {source === "seed" ? "فایل خدمات پس از فروش آرتا" : "داده بارگذاری‌شده از اکسل"}
            </p>
          </div>
          <Select
            className="hidden w-[9.5rem] sm:block"
            value={selectedMonth}
            onChange={(e) => setMonth(e.target.value)}
            aria-label="ماه"
          >
            <option value={ALL_MONTHS}>کل دوره</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {formatMonth(m)}
              </option>
            ))}
          </Select>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/data">
              <Upload className="size-3.5" />
              به‌روزرسانی اکسل
            </Link>
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto border-t border-border px-3 py-2 sm:px-5">
          <Select
            className="h-9 min-w-[8rem] text-xs"
            value={filters.product ?? ""}
            onChange={(e) => setFilter("product", e.target.value || null)}
          >
            <option value="">همه دستگاه‌ها</option>
            {products.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
          <Select
            className="h-9 min-w-[9rem] text-xs"
            value={filters.cause ?? ""}
            onChange={(e) => setFilter("cause", e.target.value || null)}
          >
            <option value="">همه علت‌ها</option>
            {causes.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
          <Select
            className="h-9 min-w-[8rem] text-xs"
            value={filters.model ?? ""}
            onChange={(e) => setFilter("model", e.target.value || null)}
          >
            <option value="">همه مدل‌ها</option>
            {models.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
          <Select
            className="h-9 min-w-[8rem] text-xs sm:hidden"
            value={selectedMonth}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value={ALL_MONTHS}>کل دوره</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {formatMonth(m)}
              </option>
            ))}
          </Select>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <aside className="sticky top-[6.35rem] hidden h-[calc(100dvh-6.35rem)] w-56 shrink-0 border-l border-border lg:block">
          <Sidebar />
        </aside>
        <main className="min-w-0 flex-1 px-3 py-5 sm:px-6 sm:py-6">{children}</main>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <Sidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
