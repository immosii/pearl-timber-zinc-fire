import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
  {
    variants: {
      tone: {
        muted: "bg-bg-subtle text-fg-muted",
        good: "bg-success-bg text-success",
        bad: "bg-danger-bg text-danger",
        warn: "bg-warn-bg text-warn",
        ink: "bg-bg-ink text-fg-on-ink",
        pine: "bg-primary text-primary-fg",
      },
    },
    defaultVariants: { tone: "muted" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone, className }))} {...props} />;
}
