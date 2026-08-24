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
import { PageHeader } from "@/components/page-header";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import { ageBuckets, groupBy } from "@/lib/analytics";
import { faNum } from "@/lib/format";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/lifetime")({ component: LifetimePage });

function LifetimePage() {
  const { rows } = useView();
  const buckets = ageBuckets(rows);
  const byProduct = groupBy(rows, (r) => r.product);

  return (
    <div>
      <PageHeader title="زمان‌بندی خرابی" kicker="عمر تا اولین مراجعه">
        <p className="max-w-sm text-xs leading-relaxed text-fg-muted">
          مدت مصرف از تاریخ نصب تا پذیرش. بازه ۰ تا ۳ ماه یعنی خرابی زودهنگام.
        </p>
      </PageHeader>

      <Card className="rounded-lg p-4">
        <CardHeader>
          <div>
            <CardTitle>توزیع مدت مصرف</CardTitle>
            <CardHint>هیستوگرام ماه تا خرابی</CardHint>
          </div>
        </CardHeader>
        <ClientChart>
          <div className="h-[280px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buckets}>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [faNum(Number(v), 0), "تعداد"]}
                />
                <Bar dataKey="count" fill={CHART[1]} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ClientChart>
      </Card>

      <Card className="mt-5 rounded-lg p-4">
        <CardHeader>
          <CardTitle>میانگین عمر به تفکیک دستگاه</CardTitle>
        </CardHeader>
        <ul className="grid gap-3 sm:grid-cols-2">
          {byProduct.map((p) => (
            <li key={p.name} className="rounded-md bg-bg-subtle px-3 py-3">
              <div className="flex justify-between text-sm">
                <span>{p.name}</span>
                <span className="tabular">{faNum(p.avgAge, 1)} ماه</span>
              </div>
              <p className="mt-1 text-[11px] text-fg-muted">{faNum(p.count, 0)} مراجعه</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
