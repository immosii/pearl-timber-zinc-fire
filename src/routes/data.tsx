import { createFileRoute } from "@tanstack/react-router";
import { Download, FileSpreadsheet, RotateCcw, Upload } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { monthsOf } from "@/lib/analytics";
import { SEED_RECORDS } from "@/lib/company";
import { downloadTemplate, exportWorkbook, parseWorkbook } from "@/lib/excel";
import { faNum, formatMoney } from "@/lib/format";
import { formatJalaliDate, formatMonth } from "@/lib/jalali";
import { useReportStore } from "@/lib/store";
import { ALL_MONTHS } from "@/lib/types";
import { useView } from "@/lib/use-view";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/data")({ component: DataPage });

function DataPage() {
  const all = useReportStore((s) => s.rows);
  const source = useReportStore((s) => s.source);
  const fileName = useReportStore((s) => s.fileName);
  const lastImportAt = useReportStore((s) => s.lastImportAt);
  const importLog = useReportStore((s) => s.importLog);
  const importExcel = useReportStore((s) => s.importExcel);
  const resetSeed = useReportStore((s) => s.resetSeed);
  const { rows, month } = useView();

  const [mode, setMode] = useState<"merge-months" | "replace-all">("merge-months");
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const pageSize = 12;
  const months = monthsOf(all);

  const filtered = useMemo(() => {
    const query = q.trim();
    if (!query) return rows;
    return rows.filter((r) =>
      [r.ticket, r.serial, r.model, r.product, r.cause, r.failure, r.part].some((v) => v.includes(query)),
    );
  }, [rows, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const slice = filtered.slice(page * pageSize, page * pageSize + pageSize);

  async function handleFile(file: File) {
    setBusy(true);
    try {
      const buf = await file.arrayBuffer();
      const parsed = parseWorkbook(buf);
      if (parsed.rows.length === 0) {
        toast.error("هیچ ردیف خدماتی در فایل پیدا نشد.");
        return;
      }
      importExcel(parsed.rows, file.name, mode);
      toast.success(`${faNum(parsed.rows.length, 0)} ردیف وارد شد`);
    } catch {
      toast.error("خواندن فایل اکسل ناموفق بود.");
    } finally {
      setBusy(false);
      setDrag(false);
    }
  }

  return (
    <div>
      <PageHeader title="داده و اکسل" kicker="چرخه ماهانه">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => downloadTemplate(SEED_RECORDS)}>
            <Download className="size-3.5" />
            دانلود الگو
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportWorkbook(all, `arta-export.xlsx`)}
          >
            <FileSpreadsheet className="size-3.5" />
            خروجی کامل
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-3 lg:grid-cols-5">
        <Card className="rounded-lg p-4 lg:col-span-3">
          <CardHeader>
            <div>
              <CardTitle>بارگذاری ماه جدید</CardTitle>
              <CardHint>
                فایل ‎.xlsx / ‎.xlsm با برگه «داده خام» و همان ستون‌های گزارش آرتا.
              </CardHint>
            </div>
          </CardHeader>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) void handleFile(f);
            }}
            className={cn(
              "flex min-h-44 flex-col items-center justify-center rounded-md border border-dashed border-border-strong bg-bg px-4 py-8 text-center",
              drag && "bg-bg-subtle",
            )}
          >
            <Upload className="size-6 text-fg-muted" />
            <p className="mt-3 text-sm">فایل اکسل را اینجا رها کنید</p>
            <Button className="mt-4" size="sm" disabled={busy} onClick={() => inputRef.current?.click()}>
              {busy ? "در حال خواندن…" : "انتخاب فایل"}
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept=".xlsx,.xls,.xlsm"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleFile(f);
                e.target.value = "";
              }}
            />
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 text-sm text-fg-muted">
              شیوه ورود
              <Select className="h-9 text-xs" value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}>
                <option value="merge-months">ادغام ماه‌های فایل</option>
                <option value="replace-all">جایگزینی کل داده</option>
              </Select>
            </label>
            <Button variant="ghost" size="sm" onClick={() => resetSeed()}>
              <RotateCcw className="size-3.5" />
              بازگشت به فایل آرتا
            </Button>
          </div>
        </Card>

        <Card className="rounded-lg p-4 lg:col-span-2">
          <CardHeader>
            <CardTitle>وضعیت منبع</CardTitle>
          </CardHeader>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-fg-muted">منبع</dt>
              <dd>
                <Badge tone={source === "excel" ? "pine" : "muted"}>
                  {source === "excel" ? "اکسل جدید" : "فایل آرتا"}
                </Badge>
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-fg-muted">فایل</dt>
              <dd className="truncate text-left">{fileName ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-fg-muted">ردیف</dt>
              <dd className="tabular">{faNum(all.length, 0)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-fg-muted">ماه‌ها</dt>
              <dd className="tabular">{faNum(months.length, 0)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-fg-muted">آخرین ورود</dt>
              <dd className="text-left text-xs">
                {lastImportAt ? new Date(lastImportAt).toLocaleString("fa-IR") : "—"}
              </dd>
            </div>
          </dl>
          {importLog.length > 0 ? (
            <div className="mt-4 border-t border-border pt-3">
              <p className="mb-2 text-xs text-fg-muted">تاریخچه ورود</p>
              <ul className="space-y-2 text-xs">
                {importLog.slice(0, 5).map((log) => (
                  <li key={log.at} className="flex justify-between gap-2 text-fg-muted">
                    <span className="truncate">{log.fileName}</span>
                    <span className="tabular">{faNum(log.rows, 0)} ردیف</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Card>
      </div>

      <Card className="mt-5 rounded-lg p-4">
        <CardHeader>
          <div>
            <CardTitle>
              کاوش ردیف‌ها
              {month === ALL_MONTHS ? "" : ` — ${formatMonth(month)}`}
            </CardTitle>
            <CardHint>{faNum(filtered.length, 0)} ردیف</CardHint>
          </div>
          <Input
            className="h-9 max-w-xs"
            placeholder="جستجوی پذیرش، سریال، مدل، علت…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(0);
            }}
          />
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[56rem] text-sm">
            <thead className="text-xs text-fg-muted">
              <tr>
                <th className="pb-2 text-right font-medium">پذیرش</th>
                <th className="pb-2 text-right font-medium">تاریخ</th>
                <th className="pb-2 text-right font-medium">دستگاه</th>
                <th className="pb-2 text-right font-medium">مدل</th>
                <th className="pb-2 text-right font-medium">علت</th>
                <th className="pb-2 text-left font-medium">عمر</th>
                <th className="pb-2 text-left font-medium">هزینه</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="py-2.5 tabular text-xs">{r.ticket}</td>
                  <td className="py-2.5 text-xs">{formatJalaliDate(r.acceptDate)}</td>
                  <td className="py-2.5">{r.product}</td>
                  <td className="py-2.5 text-xs">{r.model}</td>
                  <td className="py-2.5 text-xs">{r.cause}</td>
                  <td className="py-2.5 text-left tabular">{faNum(r.ageMonths, 0)}</td>
                  <td className="py-2.5 text-left tabular">{formatMoney(r.totalCost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-fg-muted">
          <span>
            صفحه {faNum(page + 1, 0)} از {faNum(pages, 0)}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>
              قبلی
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              بعدی
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
