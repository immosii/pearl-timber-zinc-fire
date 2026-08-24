import { formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Delta({ value, invert }: { value: number; invert?: boolean }) {
  const v = invert ? -value : value;
  const tone = Math.abs(value) < 0.05 ? "flat" : v > 0 ? "up" : "down";
  return (
    <span
      className={cn(
        "tabular text-xs",
        tone === "up" && "text-success",
        tone === "down" && "text-danger",
        tone === "flat" && "text-fg-muted",
      )}
    >
      {formatPct(value)}
    </span>
  );
}
