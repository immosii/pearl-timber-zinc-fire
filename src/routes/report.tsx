import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildInsights, computeKpis, groupBy } from "@/lib/analytics";
import { COMPANY } from "@/lib/company";
import { faNum, formatMoney, formatPctPlain } from "@/lib/format";
import { formatMonth } from "@/lib/jalali";
import { compareMonthOf } from "@/lib/store";
import { ALL_MONTHS } from "@/lib/types";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/report")({ component: ReportPage });

function ReportPage() {
  const { filtered, rows, month } = useView();
  const k = computeKpis(filtered, month, compareMonthOf(month));
  const insights = buildInsights(rows);
  const products = groupBy(rows, (r) => r.product);
  const causes = groupBy(rows, (r) => r.cause).slice(0, 10);
  const parts = groupBy(
    rows.filter((r) => r.part),
    (r) => r.part,
  ).slice(0, 8);
  const period = month === ALL_MONTHS ? COMPANY.periodLabel : formatMonth(month);

  return (
    <div>
      <PageHeader title="گزارش دوره" kicker="نسخه چاپی">
        <Button className="no-print" size="sm" onClick={() => window.print()}>
          <Printer className="size-3.5" />
          چاپ / PDF
        </Button>
      </PageHeader>

      <Card className="rounded-lg p-5 sm:p-8">
        <header className="border-b border-border pb-4">
          <p className="text-[11px] tracking-[0.16em] text-fg-subtle">RASAD AFTER-SALES BRIEF</p>
          <h2 className="mt-1 font-display text-2xl font-medium">{COMPANY.legal}</h2>
          <p className="mt-1 text-sm text-fg-muted">
            داشبورد تعمیرات و خدمات پس از فروش · {period} · {faNum(k.visits, 0)} رکورد
          </p>
        </header>

        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["مراجعات", faNum(k.visits, 0)],
            ["هزینه گارانتی", formatMoney(k.cost)],
            ["میانگین هر مراجعه", formatMoney(k.avgCost)],
            ["ضرر تکرار", formatMoney(k.repeatCost)],
          ].map(([l, v]) => (
            <div key={l} className="rounded-md bg-bg-subtle px-3 py-3">
              <p className="text-[11px] text-fg-muted">{l}</p>
              <p className="mt-1 text-lg font-medium tabular">{v}</p>
            </div>
          ))}
        </section>

        <section className="mt-6">
          <h3 className="text-sm font-medium">جمع‌بندی مدیریتی</h3>
          <ol className="mt-3 space-y-2 text-sm leading-7 text-fg-muted">
            {insights.map((ins) => (
              <li key={ins.title}>
                <span className="text-fg">{ins.title}.</span> {ins.body}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium">دستگاه</h3>
            <table className="mt-2 w-full text-sm">
              <tbody>
                {products.map((p) => (
                  <tr key={p.name} className="border-t border-border">
                    <td className="py-2">{p.name}</td>
                    <td className="py-2 text-left tabular">{faNum(p.count, 0)}</td>
                    <td className="py-2 text-left tabular">{formatMoney(p.cost)}</td>
                    <td className="py-2 text-left tabular text-fg-muted">{formatPctPlain(p.share, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-sm font-medium">علت‌های پرتکرار</h3>
            <table className="mt-2 w-full text-sm">
              <tbody>
                {causes.map((c) => (
                  <tr key={c.name} className="border-t border-border">
                    <td className="py-2">{c.name}</td>
                    <td className="py-2 text-left tabular">{faNum(c.count, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-sm font-medium">قطعات با بیشترین تعویض</h3>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {parts.map((p) => (
                <tr key={p.name} className="border-t border-border">
                  <td className="py-2">{p.name}</td>
                  <td className="py-2 text-left tabular">{faNum(p.count, 0)}</td>
                  <td className="py-2 text-left tabular">{faNum(p.avgAge, 1)} ماه</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="mt-8 border-t border-border pt-3 text-[11px] text-fg-subtle">
          تهیه شده در سامانه رصد از گزارش نصب و تعمیر خدمات پس از فروش. ارقام به تومان.
        </footer>
      </Card>
    </div>
  );
}
