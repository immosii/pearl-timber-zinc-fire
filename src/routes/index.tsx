import { createFileRoute, Link } from "@tanstack/react-router";
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
import { MonthRail } from "@/components/month-rail";
import { PageHeader } from "@/components/page-header";
import { RankTable } from "@/components/rank-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import {
  buildInsights,
  computeKpis,
  groupBy,
  monthlySeries,
  monthsOf,
} from "@/lib/analytics";
import { COMPANY } from "@/lib/company";
import { faNum, formatMoney, formatPctPlain } from "@/lib/format";
import { formatMonth, formatMonthShort } from "@/lib/jalali";
import { compareMonthOf } from "@/lib/store";
import { ALL_MONTHS } from "@/lib/types";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { filtered, rows, month, setMonth } = useView();
  const months = monthsOf(filtered);
  const k = computeKpis(filtered, month, compareMonthOf(month));
  const insights = buildInsights(rows);
  const series = monthlySeries(filtered);
  const products = groupBy(rows, (r) => r.product);
  const causes = groupBy(rows, (r) => r.cause).slice(0, 8);
  const topProduct = products[0];
  const topCause = causes[0];
  const showDelta = month !== ALL_MONTHS;

  return (
    <div>
      <PageHeader kicker="میز فرمان گارانتی" title="خلاصه خدمات پس از فروش">
        <p className="max-w-sm text-xs leading-relaxed text-fg-muted">
          {COMPANY.legal} · {month === ALL_MONTHS ? COMPANY.periodLabel : formatMonth(month)} ·{" "}
          {faNum(rows.length, 0)} رکورد تعمیر
        </p>
      </PageHeader>

      <MonthRail months={months} selected={month} onSelect={setMonth} />

      <section className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard
          label="کل مراجعات"
          value={faNum(k.visits, 0)}
          delta={showDelta ? k.visitDelta : undefined}
          hint={`${faNum(k.products, 0)} نوع دستگاه / ${faNum(k.models, 0)} مدل`}
        />
        <KpiCard
          label="هزینه گارانتی"
          value={formatMoney(k.cost)}
          delta={showDelta ? k.costDelta : undefined}
          hint={`میانگین ${formatMoney(k.avgCost)} هر مراجعه`}
        />
        <KpiCard
          label="پرتکرارترین دستگاه"
          value={topProduct?.name ?? "—"}
          hint={topProduct ? `${faNum(topProduct.count, 0)} مورد — ${formatPctPlain(topProduct.share, 0)}` : undefined}
        />
        <KpiCard
          label="علت غالب"
          value={topCause ? topCause.name.split(" - ")[0]! : "—"}
          hint={topCause ? `${faNum(topCause.count, 0)} مورد — میانگین ${faNum(topCause.avgAge, 1)} ماه` : undefined}
        />
      </section>

      <section className="mt-5 grid gap-3 lg:grid-cols-2">
        {insights.map((ins) => (
          <article
            key={ins.title}
            className="rounded-lg bg-bg-elevated p-4 shadow-[var(--shadow-border)]"
          >
            <div className="mb-2 flex items-center gap-2">
              <Badge
                tone={
                  ins.tone === "good"
                    ? "good"
                    : ins.tone === "bad"
                      ? "bad"
                      : ins.tone === "warn"
                        ? "warn"
                        : "muted"
                }
              >
                {ins.tone === "good"
                  ? "مثبت"
                  : ins.tone === "bad"
                    ? "هشدار"
                    : ins.tone === "warn"
                      ? "توجه"
                      : "یادداشت"}
              </Badge>
              <h2 className="text-sm font-medium">{ins.title}</h2>
            </div>
            <p className="text-sm leading-7 text-fg-muted">{ins.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-5 grid gap-3 xl:grid-cols-5">
        <Card className="rounded-lg p-4 xl:col-span-3">
          <CardHeader>
            <div>
              <CardTitle>روند ماهانه مراجعات</CardTitle>
              <CardHint>تعداد پذیرش در هر ماه شمسی</CardHint>
            </div>
          </CardHeader>
          <ClientChart>
            <div className="h-[260px] w-full" dir="ltr">
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
                  <YAxis tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v, name) => [
                      faNum(Number(v), 0),
                      name === "visits" ? "مراجعه" : "تکراری",
                    ]}
                    labelFormatter={(l) => formatMonth(String(l))}
                  />
                  <Bar dataKey="visits" fill={CHART[1]} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ClientChart>
        </Card>
        <Card className="rounded-lg p-4 xl:col-span-2">
          <CardHeader>
            <CardTitle>توزیع دستگاه</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/devices">جزئیات</Link>
            </Button>
          </CardHeader>
          <RankTable rows={products} nameLabel="دستگاه" />
        </Card>
      </section>

      <Card className="mt-5 rounded-lg p-4">
        <CardHeader>
          <CardTitle>علت‌های پرتکرار</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/causes">همه علت‌ها</Link>
          </Button>
        </CardHeader>
        <RankTable rows={causes} nameLabel="دسته علت" />
      </Card>
    </div>
  );
}
