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
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import actionsRaw from "@/data/corrective-actions.json";
import { actionTone, type CorrectiveAction } from "@/lib/cohort";
import { faNum } from "@/lib/format";
import { toFaDigits } from "@/lib/jalali";

export const Route = createFileRoute("/actions")({ component: ActionsPage });

const ACTIONS = actionsRaw as CorrectiveAction[];

function formatDate(v: string): string {
  if (!v || v === "-") return "—";
  return toFaDigits(v);
}

function ActionsPage() {
  const totalCases = ACTIONS.reduce((s, a) => s + a.count, 0);
  const inProgress = ACTIONS.filter((a) => a.result.includes("اقدام")).length;
  const improving = ACTIONS.filter((a) => a.result.includes("بهبود")).length;
  const chart = [...ACTIONS].sort((a, b) => b.count - a.count).map((a) => ({
    name: a.part,
    count: a.count,
  }));

  return (
    <div>
      <PageHeader title="اقدامات اصلاحی خدمات" kicker="پیگیری کیفیت">
        <p className="max-w-sm text-xs leading-relaxed text-fg-muted">
          فهرست قطعه، میانگین ماه مصرف، تعداد و وضعیت اقدام — عیناً از فایل «اقدامات اصلاحی خدمات».
        </p>
      </PageHeader>

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard label="قطعه در فهرست" value={faNum(ACTIONS.length, 0)} />
        <KpiCard label="مجموع موارد" value={faNum(totalCases, 0)} />
        <KpiCard label="در دست اقدام" value={faNum(inProgress, 0)} />
        <KpiCard label="در حال بهبود" value={faNum(improving, 0)} />
      </section>

      <Card className="mt-5 rounded-lg p-4">
        <CardHeader>
          <div>
            <CardTitle>تعداد به تفکیک قطعه</CardTitle>
            <CardHint>همان ستون «تعداد» فایل اکسل</CardHint>
          </div>
        </CardHeader>
        <ClientChart height={320}>
          <div className="h-[320px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart} layout="vertical" margin={{ left: 8, right: 12, top: 4, bottom: 4 }}>
                <CartesianGrid stroke={CHART.grid} horizontal={false} />
                <XAxis type="number" tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={148}
                  tick={{ fill: CHART.tick, fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [faNum(Number(v), 0), "تعداد"]}
                />
                <Bar dataKey="count" fill={CHART[1]} radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ClientChart>
      </Card>

      <Card className="mt-5 overflow-hidden rounded-lg p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] text-sm">
            <thead className="bg-bg-subtle text-xs text-fg-muted">
              <tr>
                <th className="px-4 py-2.5 text-right font-medium">قطعه</th>
                <th className="px-4 py-2.5 text-left font-medium">میانگین ماه مصرف</th>
                <th className="px-4 py-2.5 text-left font-medium">تعداد</th>
                <th className="px-4 py-2.5 text-right font-medium">نظرات / اقدامات</th>
                <th className="px-4 py-2.5 text-left font-medium">زمان اقدام</th>
                <th className="px-4 py-2.5 text-right font-medium">نتیجه</th>
              </tr>
            </thead>
            <tbody>
              {ACTIONS.map((a) => (
                <tr key={a.part} className="border-t border-border">
                  <td className="px-4 py-3">{a.part}</td>
                  <td className="px-4 py-3 text-left tabular">{faNum(a.avgMonths, 1)}</td>
                  <td className="px-4 py-3 text-left tabular">{faNum(a.count, 0)}</td>
                  <td className="px-4 py-3 text-xs leading-6 text-fg-muted">{a.action}</td>
                  <td className="px-4 py-3 text-left tabular text-xs">{formatDate(a.actionDate)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={actionTone(a.result)}>{a.result === "-" ? "—" : a.result}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
