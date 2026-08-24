import type { ServiceRow } from "@/lib/types";
import raw from "@/data/arta-records.json";

export const COMPANY = {
  name: "آرتا گستر افق پارسیان",
  legal: "آرتا گستر افق پارسیان",
  desk: "خدمات پس از فروش",
  periodLabel: "سه ماهه اول ۱۴۰۵",
};

export const SEED_RECORDS = raw as ServiceRow[];
