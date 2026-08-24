import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl bg-bg-elevated p-4 text-fg shadow-[var(--shadow-border)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-3 flex items-start justify-between gap-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-sm font-medium text-fg", className)} {...props} />;
}

export function CardHint({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-xs text-fg-muted", className)} {...props} />;
}
