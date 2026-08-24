import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-sm border border-border bg-bg-elevated px-3 text-sm text-fg placeholder:text-fg-subtle outline-none transition-[box-shadow] duration-150 focus:border-border-strong",
        className,
      )}
      {...props}
    />
  );
}
