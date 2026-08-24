import { createFileRoute } from "@tanstack/react-router";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { computeKpis, repeatSerials } from "@/lib/analytics";
import { faNum, formatMoney, formatPctPlain } from "@/lib/format";
import { compareMonthOf } from "@/lib/store";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/repeats")({ component: RepeatsPage });

function RepeatsPage() {
  const { filtered, rows, month } = useView();
  const k = computeKpis(filtered, month, compareMonthOf(month));
  const serials = repeatSerials(rows);

  return (
    <div>
      <PageHeader title="مراجعه تکراری" kicker="سریال‌های چندباره">
        <p className="max-w-sm text-xs leading-relaxed text-fg-muted">
          سریال‌هایی که بیش از یک پذیرش دارند. هزینه ضرر تکرار از فایل اکسل آمده است.
        </p>
      </PageHeader>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <KpiCard label="ردیف تکراری" value={faNum(k.repeats, 0)} hint={`${formatPctPlain(k.repeatShare, 0)} از مراجعات`} />
        <KpiCard label="سریال یکتا تکراری" value={faNum(serials.length, 0)} />
        <KpiCard label="هزینه ضرر تکرار" value={formatMoney(k.repeatCost)} />
      </section>

      <Card className="mt-5 overflow-hidden rounded-lg p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-sm">
            <thead className="bg-bg-subtle text-xs text-fg-muted">
              <tr>
                <th className="px-4 py-2.5 text-right font-medium">شماره سریال</th>
                <th className="px-4 py-2.5 text-right font-medium">دستگاه</th>
                <th className="px-4 py-2.5 text-right font-medium">مدل</th>
                <th className="px-4 py-2.5 text-left font-medium">تعداد مراجعه</th>
                <th className="px-4 py-2.5 text-left font-medium">ضرر تکرار</th>
              </tr>
            </thead>
            <tbody>
              {serials.map((s) => (
                <tr key={s.serial} className="border-t border-border">
                  <td className="px-4 py-2.5 font-mono text-xs">{s.serial}</td>
                  <td className="px-4 py-2.5">{s.product}</td>
                  <td className="px-4 py-2.5">{s.model}</td>
                  <td className="px-4 py-2.5 text-left tabular">{faNum(s.count, 0)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{formatMoney(s.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
