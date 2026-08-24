import { formatMonthShort, parseMonthKey, toFaDigits } from "@/lib/jalali";
import { ALL_MONTHS } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MonthRail({
  months,
  selected,
  onSelect,
}: {
  months: string[];
  selected: string;
  onSelect: (m: string) => void;
}) {
  const items = [ALL_MONTHS, ...months];
  return (
    <div className="flex gap-1 overflow-x-auto pb-1">
      {items.map((m) => {
        const active = m === selected;
        if (m === ALL_MONTHS) {
          return (
            <button
              key={m}
              type="button"
              onClick={() => onSelect(m)}
              className={cn(
                "flex h-14 min-w-[4.8rem] shrink-0 flex-col items-center justify-center rounded-md px-2 text-center transition-colors duration-150",
                active
                  ? "bg-bg-ink text-fg-on-ink"
                  : "bg-bg-elevated text-fg-muted shadow-[var(--shadow-border)] hover:text-fg",
              )}
            >
              <span className="text-[11px] font-medium">کل دوره</span>
              <span className="text-[10px] opacity-70">سه ماه</span>
            </button>
          );
        }
        const { year } = parseMonthKey(m);
        return (
          <button
            key={m}
            type="button"
            onClick={() => onSelect(m)}
            className={cn(
              "flex h-14 min-w-[4.4rem] shrink-0 flex-col items-center justify-center rounded-md px-2 text-center transition-colors duration-150",
              active
                ? "bg-bg-ink text-fg-on-ink"
                : "bg-bg-elevated text-fg-muted shadow-[var(--shadow-border)] hover:text-fg",
            )}
          >
            <span className="text-[11px] font-medium">{formatMonthShort(m)}</span>
            <span className="text-[10px] opacity-70 tabular">{toFaDigits(year)}</span>
          </button>
        );
      })}
    </div>
  );
}
