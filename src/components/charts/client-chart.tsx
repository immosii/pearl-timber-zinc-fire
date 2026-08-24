import { useEffect, useState, type ReactNode } from "react";

export function ClientChart({
  children,
  height = 260,
}: {
  children: ReactNode;
  height?: number;
}) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);
  if (!on) {
    return (
      <div
        className="w-full animate-pulse rounded-md bg-bg-subtle"
        style={{ height }}
        aria-hidden
      />
    );
  }
  return <>{children}</>;
}
