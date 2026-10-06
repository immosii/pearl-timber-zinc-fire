import {
  Activity,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  Package,
  Repeat,
  Timer,
  Wrench,
} from "lucide-react";

export const NAV = [
  { to: "/", label: "خلاصه دوره", icon: LayoutDashboard },
  { to: "/causes", label: "علت خرابی", icon: Wrench },
  { to: "/devices", label: "دستگاه و مدل", icon: Package },
  { to: "/parts", label: "قطعه و عمر", icon: Timer },
  { to: "/repeats", label: "مراجعه تکراری", icon: Repeat },
  { to: "/lifetime", label: "زمان‌بندی خرابی", icon: Activity },
  { to: "/data", label: "داده و اکسل", icon: FileSpreadsheet },
  { to: "/report", label: "گزارش چاپی", icon: FileText },
] as const;
