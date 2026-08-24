export type ServiceRow = {
  id: string;
  ticket: string;
  monthName: string;
  month: string;
  product: string;
  model: string;
  serial: string;
  complaint: string;
  failure: string;
  acceptDate: string;
  produceDate: string;
  installDate: string;
  ageMonths: number;
  cause: string;
  part: string;
  travelPayer: string;
  partCost: number;
  laborCost: number;
  totalCost: number;
  repeat: boolean;
  repeatCost: number;
};

export type ImportLog = {
  at: string;
  fileName: string;
  months: string[];
  rows: number;
  mode: "replace-all" | "merge-months";
};

export type DataSource = "seed" | "excel";

export type GlobalFilters = {
  product: string | null;
  cause: string | null;
  model: string | null;
};

export const ALL_MONTHS = "all";
