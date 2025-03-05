export interface FilterParams {
  year: number | "";
  month: number | "";
  type: string;
  page: number;
}

export interface FilterPanelProps {
  selectedYear: number | "";
  selectedMonth: number | "";
  selectedType: string;
  onYearChange: (year: number | "") => void;
  onMonthChange: (month: number | "") => void;
  onTypeChange: (type: string) => void;
  onApplyFilters: () => void;
}
