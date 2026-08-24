import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClientChart } from "@/components/charts/client-chart";
import { CHART, tooltipStyle } from "@/components/charts/theme";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import { RankTable } from "@/components/rank-table";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import { computeKpis, groupBy, monthlySeries } from "@/lib/analytics";
import { faNum, formatMoney, formatPctPlain } from "@/lib/format";
import { formatMonth, formatMonthShort } from "@/lib/jalali";
import { compareMonthOf } from "@/lib/store";
import { ALL_MONTHS } from "@/lib/types";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/cost")({ component: CostPage });

function CostPage() {
  const { filtered, rows, month } = useView();
  const k = computeKpis(filtered, month, compareMonthOf(month));
  const byProduct = groupBy(rows, (r) => r.product).sort((a, b) => b.cost - a.cost);
  const byCause = groupBy(rows, (r) => r.cause).sort((a, b) => b.cost - a.cost).slice(0, 12);
  const series = monthlySeries(filtered);
  const showDelta = month !== ALL_MONTHS;
  const costShare = k.cost || 1;

  return (
    <div>
      <PageHeader title="هزینه گارانتی" kicker="تحلیل مالی تقریبی">
        <p className="max-w-sm text-xs leading-relaxed text-fg-muted">
          ارقام از ستون‌های هزینه قطعه، اجرت و ایاب‌وذهاب فایل اکسل خوانده شده‌اند.
        </p>
      </PageHeader>

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard label="کل گارانتی" value={formatMoney(k.cost)} delta={showDelta ? k.costDelta : undefined} />
        <KpiCard label="قطعه" value={formatMoney(k.partCost)} hint={formatPctPlain((k.partCost / costShare) * 100, 0)} />
        <KpiCard
          label="اجرت + ایاب‌وذهاب"
          value={formatMoney(k.laborCost)}
          hint={formatPctPlain((k.laborCost / costShare) * 100, 0)}
        />
        <KpiCard
          label="ضرر مراجعه تکراری"
          value={formatMoney(k.repeatCost)}
          hint={`${faNum(k.repeats, 0)} ردیف تکراری`}
        />
      </section>

      <section className="mt-5 grid gap-3 lg:grid-cols-5">
        <Card className="rounded-lg p-4 lg:col-span-2">
          <CardHeader>
            <CardTitle>هزینه به تفکیک دستگاه</CardTitle>
          </CardHeader>
          <ul className="space-y-3">
            {byProduct.map((p) => (
              <li key={p.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className="tabular text-fg-muted">
                    {formatMoney(p.cost)} · {formatPctPlain((p.cost / costShare) * 100, 0)}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-bg-subtle">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(p.cost / costShare) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-fg-subtle">
                  {faNum(p.count, 0)} مراجعه · میانگین {formatMoney(p.avgCost)}
                </p>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="rounded-lg p-4 lg:col-span-3">
          <CardHeader>
            <div>
              <CardTitle>روند هزینه ماهانه</CardTitle>
              <CardHint>میلیون تومان</CardHint>
            </div>
          </CardHeader>
          <ClientChart>
            <div className="h-[280px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={series}>
                  <CartesianGrid stroke={CHART.grid} vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickFormatter={formatMonthShort}
                    tick={{ fill: CHART.tick, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `${Math.round(Number(v) / 1_000_000)}`}
                    tick={{ fill: CHART.tick, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={36}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v) => [formatMoney(Number(v)), "هزینه"]}
                    labelFormatter={(l) => formatMonth(String(l))}
                  />
                  <Bar dataKey="cost" fill={CHART[1]} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ClientChart>
        </Card>
      </section>

      <Card className="mt-5 rounded-lg p-4">
        <CardHeader>
          <CardTitle>پرهزینه‌ترین علت‌ها</CardTitle>
        </CardHeader>
        <RankTable rows={byCause} nameLabel="علت" value="cost" />
      </Card>
    </div>
  );
}
