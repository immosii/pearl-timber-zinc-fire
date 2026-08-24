import { faNum, formatMoney, formatPctPlain } from "@/lib/format";
import { cn } from "@/lib/utils";

export function RankTable({
  rows,
  nameLabel = "عنوان",
  value = "count",
}: {
  rows: { name: string; count: number; cost?: number; share?: number; avgAge?: number }[];
  nameLabel?: string;
  value?: "count" | "cost";
}) {
  const max = Math.max(1, ...rows.map((r) => (value === "cost" ? r.cost ?? 0 : r.count)));
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[18rem] text-sm">
        <thead>
          <tr className="text-xs text-fg-muted">
            <th className="pb-2 text-right font-medium">{nameLabel}</th>
            <th className="pb-2 text-left font-medium">{value === "cost" ? "هزینه" : "تعداد"}</th>
            <th className="w-[28%] pb-2 font-medium" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const v = value === "cost" ? r.cost ?? 0 : r.count;
            return (
              <tr key={r.name} className="border-t border-border">
                <td className="py-2.5">
                  <span className="text-fg-subtle tabular">{i + 1}.</span> {r.name}
                  {r.share != null ? (
                    <span className="mr-2 text-[11px] text-fg-subtle">{formatPctPlain(r.share, 0)}</span>
                  ) : null}
                </td>
                <td className="py-2.5 text-left tabular">
                  {value === "cost" ? formatMoney(v) : faNum(v, 0)}
                </td>
                <td className="py-2.5">
                  <div className="h-1.5 overflow-hidden rounded-full bg-bg-subtle">
                    <div
                      className={cn("h-full rounded-full bg-primary")}
                      style={{ width: `${Math.max(4, (v / max) * 100)}%` }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
