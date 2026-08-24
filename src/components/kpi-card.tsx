import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { deltaTone, formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  delta,
  hint,
  invert,
}: {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  invert?: boolean;
}) {
  const tone = delta == null ? "flat" : deltaTone(delta, invert);
  return (
    <Card className="flex min-h-[7.5rem] flex-col justify-between rounded-lg p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-fg-muted">{label}</p>
        {delta != null && (
          <Badge tone={tone === "up" ? "good" : tone === "down" ? "bad" : "muted"}>
            {formatPct(delta)}
          </Badge>
        )}
      </div>
      <p
        className={cn(
          "mt-3 font-display text-2xl font-medium tracking-tight tabular sm:text-[1.7rem]",
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-[11px] text-fg-subtle">{hint}</p> : null}
    </Card>
  );
}
