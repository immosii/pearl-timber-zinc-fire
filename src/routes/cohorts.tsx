import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClientChart } from "@/components/charts/client-chart";
import { CHART, tooltipStyle } from "@/components/charts/theme";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import installRaw from "@/data/install-cohort.json";
import produceRaw from "@/data/production-cohort.json";
import trendRaw from "@/data/cohort-trend.json";
import {
  formatRate,
  productsOf,
  ratePct,
  slashMonthLabel,
  type CohortPack,
  type CohortRow,
  type CohortTotal,
  type CohortTrendRow,
} from "@/lib/cohort";
import { faNum } from "@/lib/format";
import { toFaDigits } from "@/lib/jalali";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cohorts")({ component: CohortsPage });

const INSTALL = installRaw as CohortPack;
const PRODUCE = produceRaw as CohortPack;
const TREND = trendRaw as { title: string; basis: string; rows: CohortTrendRow[] };

type Tab = "compare" | "install" | "produce";

const TABS: { id: Tab; label: string }[] = [
  { id: "compare", label: "مقایسه ۳ماهه" },
  { id: "install", label: "کوهورت نصب" },
  { id: "produce", label: "کوهورت تولید" },
];

function CohortsPage() {
  const [tab, setTab] = useState<Tab>("compare");

  return (
    <div>
      <PageHeader title="کوهورت نصب و تولید" kicker="نرخ خرابی تجمعی">
        <p className="max-w-md text-xs leading-relaxed text-fg-muted">
          جداول و نمودارها فقط از شیت‌های «کوهورت نصب»، «کوهورت تولید» و بخش ۰۲ داشبورد بازسازی‌شده هستند.
        </p>
      </PageHeader>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex h-11 shrink-0 items-center rounded-md px-3 text-sm transition-colors duration-150",
              tab === t.id
                ? "bg-bg-ink text-fg-on-ink"
                : "bg-bg-elevated text-fg-muted shadow-[var(--shadow-border)] hover:text-fg",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "compare" ? <CompareSection /> : null}
      {tab === "install" ? <PackSection pack={INSTALL} /> : null}
      {tab === "produce" ? <PackSection pack={PRODUCE} /> : null}
    </div>
  );
}

function CompareSection() {
  const chart = TREND.rows.map((r) => ({
    cohort: r.cohort,
    نصب: ratePct(r.installRate3),
    تولید: ratePct(r.produceRate3),
  }));

  return (
    <div className="mt-5 space-y-5">
      <Card className="rounded-lg p-4">
        <CardHeader>
          <div>
            <CardTitle>{TREND.title}</CardTitle>
            <CardHint className="mt-1 max-w-3xl leading-6">{TREND.basis}</CardHint>
          </div>
        </CardHeader>
        <ClientChart height={300}>
          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={CHART.grid} vertical={false} />
                <XAxis
                  dataKey="cohort"
                  tickFormatter={slashMonthLabel}
                  tick={{ fill: CHART.tick, fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  interval={2}
                />
                <YAxis tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelFormatter={(l) => slashMonthLabel(String(l))}
                  formatter={(v, name) => [`${faNum(Number(v), 2)}٪`, String(name)]}
                />
                <Legend />
                <Line type="monotone" dataKey="نصب" stroke={CHART[1]} strokeWidth={2} dot={false} connectNulls={false} />
                <Line type="monotone" dataKey="تولید" stroke={CHART[4]} strokeWidth={2} dot={false} connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ClientChart>
      </Card>

      <Card className="overflow-hidden rounded-lg p-0">
        <div className="max-h-[28rem] overflow-auto">
          <table className="w-full min-w-[48rem] text-sm">
            <thead className="sticky top-0 bg-bg-subtle text-xs text-fg-muted">
              <tr>
                <th className="px-4 py-2.5 text-right font-medium">کوهورت (ماه)</th>
                <th className="px-4 py-2.5 text-left font-medium">نصب: تعداد</th>
                <th className="px-4 py-2.5 text-left font-medium">نصب: خرابی ۳ماهه</th>
                <th className="px-4 py-2.5 text-left font-medium">نرخ کوهورت نصب</th>
                <th className="px-4 py-2.5 text-left font-medium">تولید: تعداد</th>
                <th className="px-4 py-2.5 text-left font-medium">تولید: خرابی ۳ماهه</th>
                <th className="px-4 py-2.5 text-left font-medium">نرخ کوهورت تولید</th>
              </tr>
            </thead>
            <tbody>
              {TREND.rows.map((r) => (
                <tr key={r.cohort} className="border-t border-border">
                  <td className="px-4 py-2.5 tabular">{slashMonthLabel(r.cohort)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{faNum(r.installVolume, 0)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{faNum(r.installFail3, 0)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{formatRate(r.installRate3)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{faNum(r.produceVolume, 0)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{faNum(r.produceFail3, 0)}</td>
                  <td className="px-4 py-2.5 text-left tabular">{formatRate(r.produceRate3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function PackSection({ pack }: { pack: CohortPack }) {
  const products = productsOf(pack.rows);
  const [product, setProduct] = useState<string>("all");
  const rows = product === "all" ? pack.rows : pack.rows.filter((r) => r.product === product);

  const rateChart = useMemo(() => {
    const months = Array.from(new Set(pack.rows.map((r) => r.cohort)));
    const src = product === "all" ? pack.rows : pack.rows.filter((r) => r.product === product);
    const names = Array.from(new Set(pack.rows.map((r) => r.product)));
    return months.map((cohort) => {
      const subset = src.filter((r) => r.cohort === cohort);
      const point: Record<string, string | number | undefined> = { cohort };
      if (product === "all") {
        for (const p of names) {
          const hit = subset.find((r) => r.product === p);
          point[p] = hit ? ratePct(hit.rate12) : undefined;
        }
      } else {
        const hit = subset[0];
        point["نرخ ۱ماهه"] = hit ? ratePct(hit.rate1) : undefined;
        point["نرخ ۳ماهه"] = hit ? ratePct(hit.rate3) : undefined;
        point["نرخ ۶ماهه"] = hit ? ratePct(hit.rate6) : undefined;
        point["نرخ ۱۲ماهه"] = hit ? ratePct(hit.rate12) : undefined;
      }
      return point;
    });
  }, [pack.rows, product]);

  const totalBars = pack.totals.map((t) => ({
    name: t.product,
    "نرخ ۱۲ماهه": ratePct(t.rate12) ?? 0,
  }));

  const lineKeys =
    product === "all" ? products : ["نرخ ۱ماهه", "نرخ ۳ماهه", "نرخ ۶ماهه", "نرخ ۱۲ماهه"];
  const lineColors = [CHART[1], CHART[5], CHART[4], CHART[2], CHART[3]];

  return (
    <div className="mt-5 space-y-5">
      <Card className="rounded-lg p-4">
        <p className="text-sm font-medium">{pack.title}</p>
        <p className="mt-2 text-xs leading-6 text-fg-muted">{pack.basis}</p>
      </Card>

      <Card className="rounded-lg p-4">
        <CardHeader>
          <div>
            <CardTitle>شاخص کل بر اساس نوع دستگاه</CardTitle>
            <CardHint>
              {pack.volumeLabel === "نصب" ? "بر مبنای ماه نصب" : "بر مبنای ماه تولید"}
            </CardHint>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[48rem] text-sm">
            <thead className="text-xs text-fg-muted">
              <tr>
                <th className="pb-2 text-right font-medium">نوع دستگاه</th>
                <th className="pb-2 text-left font-medium">تعداد {pack.volumeLabel}</th>
                <th className="pb-2 text-left font-medium">خرابی ۱ماهه</th>
                <th className="pb-2 text-left font-medium">نرخ ۱ماهه</th>
                <th className="pb-2 text-left font-medium">خرابی ۳ماهه</th>
                <th className="pb-2 text-left font-medium">نرخ ۳ماهه</th>
                <th className="pb-2 text-left font-medium">خرابی ۶ماهه</th>
                <th className="pb-2 text-left font-medium">نرخ ۶ماهه</th>
                <th className="pb-2 text-left font-medium">خرابی ۱۲ماهه</th>
                <th className="pb-2 text-left font-medium">نرخ ۱۲ماهه</th>
              </tr>
            </thead>
            <tbody>
              {pack.totals.map((t) => (
                <TotalRow key={t.product} t={t} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <section className="grid gap-3 xl:grid-cols-2">
        <Card className="rounded-lg p-4">
          <CardHeader>
            <div>
              <CardTitle>نرخ ۱۲ماهه به تفکیک دستگاه</CardTitle>
              <CardHint>از جدول شاخص کل همان شیت</CardHint>
            </div>
          </CardHeader>
          <ClientChart>
            <div className="h-[260px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={totalBars}>
                  <CartesianGrid stroke={CHART.grid} vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: CHART.tick, fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v) => [`${faNum(Number(v), 2)}٪`, "نرخ ۱۲ماهه"]}
                  />
                  <Bar dataKey="نرخ ۱۲ماهه" fill={CHART[1]} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ClientChart>
        </Card>

        <Card className="rounded-lg p-4">
          <CardHeader>
            <div>
              <CardTitle>
                {product === "all" ? "روند نرخ ۱۲ماهه هر دستگاه" : `روند نرخ‌ها — ${product}`}
              </CardTitle>
              <CardHint>مقادیر نرخ همان شیت؛ سلول خالی اکسل در نمودار نیست</CardHint>
            </div>
          </CardHeader>
          <ClientChart>
            <div className="h-[260px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rateChart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={CHART.grid} vertical={false} />
                  <XAxis
                    dataKey="cohort"
                    tickFormatter={slashMonthLabel}
                    tick={{ fill: CHART.tick, fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    interval={3}
                  />
                  <YAxis tick={{ fill: CHART.tick, fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelFormatter={(l) => slashMonthLabel(String(l))}
                    formatter={(v, name) => [`${faNum(Number(v), 2)}٪`, String(name)]}
                  />
                  <Legend />
                  {lineKeys.map((k, i) => (
                    <Line
                      key={k}
                      type="monotone"
                      dataKey={k}
                      stroke={lineColors[i % lineColors.length]}
                      strokeWidth={2}
                      dot={false}
                      connectNulls={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ClientChart>
        </Card>
      </section>

      <Card className="overflow-hidden rounded-lg p-0">
        <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">جدول ماهانه به تفکیک دستگاه</p>
            <p className="text-xs text-fg-muted">{faNum(rows.length, 0)} ردیف از شیت اکسل</p>
          </div>
          <div className="flex flex-wrap gap-1">
            <FilterChip active={product === "all"} onClick={() => setProduct("all")}>
              همه
            </FilterChip>
            {products.map((p) => (
              <FilterChip key={p} active={product === p} onClick={() => setProduct(p)}>
                {p}
              </FilterChip>
            ))}
          </div>
        </div>
        <div className="max-h-[32rem] overflow-auto">
          <table className="w-full min-w-[56rem] text-sm">
            <thead className="sticky top-0 bg-bg-subtle text-xs text-fg-muted">
              <tr>
                <th className="px-4 py-2.5 text-right font-medium">کوهورت</th>
                <th className="px-4 py-2.5 text-right font-medium">ماه</th>
                <th className="px-4 py-2.5 text-right font-medium">نوع دستگاه</th>
                <th className="px-4 py-2.5 text-left font-medium">تعداد {pack.volumeLabel}</th>
                <th className="px-4 py-2.5 text-left font-medium">خرابی ۱م</th>
                <th className="px-4 py-2.5 text-left font-medium">نرخ ۱م</th>
                <th className="px-4 py-2.5 text-left font-medium">خرابی ۳م</th>
                <th className="px-4 py-2.5 text-left font-medium">نرخ ۳م</th>
                <th className="px-4 py-2.5 text-left font-medium">خرابی ۶م</th>
                <th className="px-4 py-2.5 text-left font-medium">نرخ ۶م</th>
                <th className="px-4 py-2.5 text-left font-medium">خرابی ۱۲م</th>
                <th className="px-4 py-2.5 text-left font-medium">نرخ ۱۲م</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <DetailRow key={`${r.cohort}-${r.product}`} r={r} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {pack.notes.length > 0 ? (
        <Card className="rounded-lg p-4">
          <CardTitle>نکته اجرایی</CardTitle>
          <ul className="mt-3 space-y-2 text-xs leading-6 text-fg-muted">
            {pack.notes
              .filter((n) => n !== "نکته اجرایی")
              .map((n) => (
                <li key={n}>{n}</li>
              ))}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}

function TotalRow({ t }: { t: CohortTotal }) {
  return (
    <tr className="border-t border-border">
      <td className="py-2.5">{t.product}</td>
      <td className="py-2.5 text-left tabular">{faNum(t.volume, 0)}</td>
      <td className="py-2.5 text-left tabular">{faNum(t.fail1, 0)}</td>
      <td className="py-2.5 text-left tabular">{formatRate(t.rate1)}</td>
      <td className="py-2.5 text-left tabular">{faNum(t.fail3, 0)}</td>
      <td className="py-2.5 text-left tabular">{formatRate(t.rate3)}</td>
      <td className="py-2.5 text-left tabular">{faNum(t.fail6, 0)}</td>
      <td className="py-2.5 text-left tabular">{formatRate(t.rate6)}</td>
      <td className="py-2.5 text-left tabular">{faNum(t.fail12, 0)}</td>
      <td className="py-2.5 text-left tabular">
        <Badge tone={t.rate12 != null && t.rate12 >= 0.01 ? "warn" : "muted"}>{formatRate(t.rate12)}</Badge>
      </td>
    </tr>
  );
}

function DetailRow({ r }: { r: CohortRow }) {
  return (
    <tr className="border-t border-border">
      <td className="px-4 py-2 tabular text-xs">{toFaDigits(r.cohort)}</td>
      <td className="px-4 py-2">{r.monthName}</td>
      <td className="px-4 py-2">{r.product}</td>
      <td className="px-4 py-2 text-left tabular">{faNum(r.volume, 0)}</td>
      <td className="px-4 py-2 text-left tabular">{faNum(r.fail1, 0)}</td>
      <td className="px-4 py-2 text-left tabular">{formatRate(r.rate1)}</td>
      <td className="px-4 py-2 text-left tabular">{faNum(r.fail3, 0)}</td>
      <td className="px-4 py-2 text-left tabular">{formatRate(r.rate3)}</td>
      <td className="px-4 py-2 text-left tabular">{faNum(r.fail6, 0)}</td>
      <td className="px-4 py-2 text-left tabular">{formatRate(r.rate6)}</td>
      <td className="px-4 py-2 text-left tabular">{faNum(r.fail12, 0)}</td>
      <td className="px-4 py-2 text-left tabular">{formatRate(r.rate12)}</td>
    </tr>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 rounded-md px-2.5 text-xs transition-colors duration-150",
        active ? "bg-bg-ink text-fg-on-ink" : "bg-bg-subtle text-fg-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
