import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { RankTable } from "@/components/rank-table";
import { Card, CardHeader, CardHint, CardTitle } from "@/components/ui/card";
import { groupBy, heatmap } from "@/lib/analytics";
import { faNum, formatMoney, formatPctPlain } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/devices")({ component: DevicesPage });

function DevicesPage() {
  const { rows } = useView();
  const products = groupBy(rows, (r) => r.product);
  const models = groupBy(rows, (r) => r.model).slice(0, 12);
  const topCauses = groupBy(rows, (r) => r.cause).slice(0, 9);
  const heat = heatmap(
    rows,
    topCauses.map((c) => c.name),
  );

  return (
    <div>
      <PageHeader title="دستگاه و مدل" kicker="ماتریس خرابی">
        <p className="max-w-sm text-xs leading-relaxed text-fg-muted">
          نقشه حرارتی نشان می‌دهد کدام علت روی کدام خانواده محصول متمرکز است.
        </p>
      </PageHeader>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {products.map((p) => (
          <Card key={p.name} className="rounded-lg p-4">
            <p className="text-xs text-fg-muted">{p.name}</p>
            <p className="mt-2 font-display text-2xl tabular">{faNum(p.count, 0)}</p>
            <p className="mt-1 text-[11px] text-fg-muted">
              {formatPctPlain(p.share, 0)} · {formatMoney(p.cost)} · عمر {faNum(p.avgAge, 1)} ماه
            </p>
          </Card>
        ))}
      </section>

      <Card className="mt-5 overflow-hidden rounded-lg p-0">
        <div className="p-4">
          <CardTitle>ماتریس دستگاه × علت</CardTitle>
          <CardHint className="mt-1">نه علت پرتکرار</CardHint>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] text-xs">
            <thead>
              <tr className="text-fg-muted">
                <th className="px-3 py-2 text-right font-medium">دستگاه</th>
                {heat.causes.map((c) => (
                  <th key={c} className="max-w-[6.5rem] px-1 py-2 text-center font-medium leading-4">
                    {c.split(" - ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heat.cells.map((row) => (
                <tr key={row.product} className="border-t border-border">
                  <td className="px-3 py-2 text-sm">{row.product}</td>
                  {row.vals.map((v, i) => (
                    <td key={heat.causes[i]} className="px-1 py-1 text-center">
                      <span
                        className={cn(
                          "inline-flex min-w-8 justify-center rounded-sm px-1.5 py-1 tabular",
                          v === 0 ? "text-fg-subtle" : "text-primary-fg",
                        )}
                        style={{
                          background:
                            v === 0
                              ? "transparent"
                              : `color-mix(in oklab, var(--color-primary) ${Math.max(18, (v / heat.max) * 100)}%, transparent)`,
                          color: v === 0 ? undefined : "var(--color-fg)",
                        }}
                      >
                        {v ? faNum(v, 0) : "—"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-5 rounded-lg p-4">
        <CardHeader>
          <CardTitle>پرتکرارترین مدل‌ها</CardTitle>
        </CardHeader>
        <RankTable rows={models} nameLabel="مدل" />
      </Card>
    </div>
  );
}
