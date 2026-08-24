import { create } from "zustand";
import { monthsOf } from "@/lib/analytics";
import { COMPANY, SEED_RECORDS } from "@/lib/company";
import { prevMonth } from "@/lib/jalali";
import { ALL_MONTHS, type DataSource, type GlobalFilters, type ImportLog, type ServiceRow } from "@/lib/types";

const STORAGE_KEY = "rasad-arta-v2";

type Persisted = {
  rows: ServiceRow[];
  source: DataSource;
  fileName: string | null;
  lastImportAt: string | null;
  importLog: ImportLog[];
};

type ReportState = {
  ready: boolean;
  rows: ServiceRow[];
  source: DataSource;
  fileName: string | null;
  lastImportAt: string | null;
  importLog: ImportLog[];
  selectedMonth: string;
  filters: GlobalFilters;
  company: string;
  hydrate: () => void;
  setMonth: (month: string) => void;
  setFilter: (key: keyof GlobalFilters, value: string | null) => void;
  importExcel: (rows: ServiceRow[], fileName: string, mode: "replace-all" | "merge-months") => void;
  resetSeed: () => void;
};

function persist(part: Persisted) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(part));
  } catch {
    /* quota */
  }
}

export const useReportStore = create<ReportState>((set, get) => ({
  ready: false,
  rows: SEED_RECORDS,
  source: "seed",
  fileName: "خدمات_پس_از_فروش_ارتا.xlsm",
  lastImportAt: null,
  importLog: [],
  selectedMonth: ALL_MONTHS,
  filters: { product: null, cause: null, model: null },
  company: COMPANY.name,
  hydrate: () => {
    if (get().ready) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as Persisted;
        if (Array.isArray(data.rows) && data.rows.length > 0) {
          set({
            rows: data.rows,
            source: data.source ?? "excel",
            fileName: data.fileName ?? null,
            lastImportAt: data.lastImportAt ?? null,
            importLog: data.importLog ?? [],
            ready: true,
          });
          return;
        }
      }
    } catch {
      /* ignore */
    }
    set({ ready: true });
  },
  setMonth: (month) => set({ selectedMonth: month }),
  setFilter: (key, value) => set((s) => ({ filters: { ...s.filters, [key]: value } })),
  importExcel: (incoming, fileName, mode) => {
    const now = new Date().toISOString();
    const incomingMonths = monthsOf(incoming);
    set((s) => {
      let next = incoming;
      if (mode === "merge-months") {
        const monthSet = new Set(incomingMonths);
        next = [...s.rows.filter((r) => !monthSet.has(r.month)), ...incoming];
      }
      const state: ReportState = {
        ...s,
        rows: next,
        source: "excel",
        fileName,
        lastImportAt: now,
        selectedMonth: ALL_MONTHS,
        importLog: [
          { at: now, fileName, months: incomingMonths, rows: incoming.length, mode },
          ...s.importLog,
        ].slice(0, 12),
      };
      persist({
        rows: state.rows,
        source: state.source,
        fileName: state.fileName,
        lastImportAt: state.lastImportAt,
        importLog: state.importLog,
      });
      return state;
    });
  },
  resetSeed: () => {
    const next: Persisted = {
      rows: SEED_RECORDS,
      source: "seed",
      fileName: "خدمات_پس_از_فروش_ارتا.xlsm",
      lastImportAt: null,
      importLog: [],
    };
    persist(next);
    set({ ...next, selectedMonth: ALL_MONTHS });
  },
}));

export function compareMonthOf(month: string): string {
  if (month === ALL_MONTHS) return ALL_MONTHS;
  return prevMonth(month);
}
