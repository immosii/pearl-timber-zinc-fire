import { Link } from "@tanstack/react-router";
import { NAV } from "@/components/layout/nav";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-5 pb-4">
        <p className="text-[11px] tracking-[0.18em] text-fg-subtle">RASAD DESK</p>
        <p className="mt-1 font-display text-2xl font-medium leading-none tracking-tight">رصد</p>
        <p className="mt-2 text-xs text-fg-muted">خدمات پس از فروش آرتا</p>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            activeOptions={{ exact: item.to === "/" }}
            className="flex h-11 items-center gap-2.5 rounded-md px-2.5 text-sm text-fg-muted transition-colors duration-150 hover:bg-bg-subtle hover:text-fg"
            activeProps={{
              className:
                "flex h-11 items-center gap-2.5 rounded-md px-2.5 text-sm bg-bg-ink text-fg-on-ink hover:bg-bg-ink hover:text-fg-on-ink",
            }}
          >
            <item.icon className="size-4 shrink-0" strokeWidth={1.75} />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
