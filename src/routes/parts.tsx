import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { groupBy } from "@/lib/analytics";
import { faNum, formatMoney } from "@/lib/format";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/parts")({ component: PartsPage });

function PartsPage() {
  const { rows } = useView();
  const parts = groupBy(
    rows.filter((r) => r.part),
    (r) => r.part,
  );

  return (
    <div>
      <PageHeader title="قطعه تعویضی و عمر" kicker="اقدام اصلاحی">
        <p className="max-w-sm text-xs leading-relaxed text-fg-muted">
          میانگین ماه مصرف تا خرابی به تفکیک قطعه. ردیف‌های با عمر کوتاه و تعداد بالا را اول بازبینی کنید.
        </p>
      </PageHeader>

      <Card className="overflow-hidden rounded-lg p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-sm">
            <thead className="bg-bg-subtle text-xs text-fg-muted">
              <tr>
                <th className="px-4 py-2.5 text-right font-medium">قطعه</th>
                <th className="px-4 py-2.5 text-left font-medium">تعداد</th>
                <th className="px-4 py-2.5 text-left font-medium">میانگین ماه</th>
                <th className="px-4 py-2.5 text-left font-medium">هزینه</th>
                <th className="px-4 py-2.5 text-right font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p) => {
                const early = p.avgAge <= 5 && p.count >= 3;
                const watch = p.avgAge <= 3;
                return (
                  <tr key={p.name} className="border-t border-border">
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3 text-left tabular">{faNum(p.count, 0)}</td>
                    <td className="px-4 py-3 text-left tabular">{faNum(p.avgAge, 1)}</td>
                    <td className="px-4 py-3 text-left tabular">{formatMoney(p.cost)}</td>
                    <td className="px-4 py-3 text-left">
                      {early ? (
                        <Badge tone="bad">زودهنگام</Badge>
                      ) : watch ? (
                        <Badge tone="warn">پایش</Badge>
                      ) : (
                        <Badge tone="muted">عادی</Badge>
                      )}
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
