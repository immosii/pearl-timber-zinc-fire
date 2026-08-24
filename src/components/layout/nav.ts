import {
  Activity,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  LineChart,
  Package,
  Repeat,
  Timer,
  Wallet,
  Wrench,
} from "lucide-react";

export const NAV = [
  { to: "/", label: "خلاصه دوره", icon: LayoutDashboard },
  { to: "/causes", label: "علت خرابی", icon: Wrench },
  { to: "/devices", label: "دستگاه و مدل", icon: Package },
  { to: "/parts", label: "قطعه و عمر", icon: Timer },
  { to: "/actions", label: "اقدامات اصلاحی خدمات", icon: ClipboardList },
  { to: "/cost", label: "هزینه گارانتی", icon: Wallet },
  { to: "/repeats", label: "مراجعه تکراری", icon: Repeat },
  { to: "/lifetime", label: "زمان‌بندی خرابی", icon: Activity },
  { to: "/cohorts", label: "کوهورت نصب و تولید", icon: LineChart },
  { to: "/data", label: "داده و اکسل", icon: FileSpreadsheet },
  { to: "/report", label: "گزارش چاپی", icon: FileText },
] as const;
