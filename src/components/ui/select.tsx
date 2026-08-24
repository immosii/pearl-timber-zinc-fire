import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-10 min-w-0 rounded-sm border border-border bg-bg-elevated px-2.5 text-sm text-fg outline-none transition-[box-shadow] duration-150 focus:border-border-strong",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
