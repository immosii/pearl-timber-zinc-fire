import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-bg-ink/40" />
      <DialogPrimitive.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(20rem,100%)] flex-col bg-bg-elevated p-4 text-fg shadow-[var(--shadow-border)]",
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Close className="absolute top-3 left-3 flex size-10 items-center justify-center rounded-sm text-fg-muted hover:bg-bg-subtle">
          <X className="size-4" />
          <span className="sr-only">بستن</span>
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
