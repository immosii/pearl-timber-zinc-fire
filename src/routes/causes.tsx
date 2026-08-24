import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { causePriority, groupBy } from "@/lib/analytics";
import { faNum, formatMoney, formatPctPlain } from "@/lib/format";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/causes")({ component: CausesPage });

function CausesPage() {
  const { rows } = useView();
  const causes = groupBy(rows, (r) => r.cause);

  return (
    <div>
      <PageHeader title="دسته‌بندی علت خرابی" kicker="بازبینی کیفیت">
        <p className="max-w-sm text-xs leading-relaxed text-fg-muted">
          اولویت بر اساس حجم و میانگین ماه تا خرابی محاسبه می‌شود. علت‌های زودهنگام و پرحجم بالای جدول‌اند.
        </p>
      </PageHeader>

      <Card className="overflow-hidden rounded-lg p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-sm">
            <thead className="bg-bg-subtle text-xs text-fg-muted">
              <tr>
                <th className="px-4 py-2.5 text-right font-medium">دسته دقیق علت</th>
                <th className="px-4 py-2.5 text-left font-medium">تعداد</th>
                <th className="px-4 py-2.5 text-left font-medium">سهم</th>
                <th className="px-4 py-2.5 text-left font-medium">میانگین ماه</th>
                <th className="px-4 py-2.5 text-left font-medium">هزینه</th>
                <th className="px-4 py-2.5 text-right font-medium">اولویت</th>
              </tr>
            </thead>
            <tbody>
              {causes.map((c) => {
                const p = causePriority(c, rows.length);
                return (
                  <tr key={c.name} className="border-t border-border">
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="px-4 py-3 text-left tabular">{faNum(c.count, 0)}</td>
                    <td className="px-4 py-3 text-left tabular">{formatPctPlain(c.share, 1)}</td>
                    <td className="px-4 py-3 text-left tabular">{faNum(c.avgAge, 1)}</td>
                    <td className="px-4 py-3 text-left tabular">{formatMoney(c.cost)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-end gap-1">
                        <Badge tone={p.tone}>{p.label}</Badge>
                        <span className="max-w-[16rem] text-left text-[11px] text-fg-subtle">{p.note}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
