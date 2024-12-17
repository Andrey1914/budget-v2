import { Box, Select, MenuItem, Button } from "@mui/material";

interface FilterPanelProps {
  selectedYear: number | "";
  selectedMonth: number | "";
  selectedType: string;
  onYearChange: (year: number | "") => void;
  onMonthChange: (month: number | "") => void;
  onTypeChange: (type: string) => void;
  onApplyFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedYear,
  selectedMonth,
  selectedType,
  onYearChange,
  onMonthChange,
  onTypeChange,
  onApplyFilters,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem", p: 5 }}>
      <Select
        value={selectedYear}
        onChange={(e) => onYearChange(e.target.value as number)}
        displayEmpty
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">Все годы</MenuItem>
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value as number)}
        displayEmpty
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">Все месяцы</MenuItem>
        <MenuItem value={1}>Январь</MenuItem>
        <MenuItem value={2}>Февраль</MenuItem>
        <MenuItem value={3}>Март</MenuItem>
        <MenuItem value={4}>Апрель</MenuItem>
        <MenuItem value={5}>Май</MenuItem>
        <MenuItem value={6}>Июнь</MenuItem>
        <MenuItem value={7}>Июль</MenuItem>
        <MenuItem value={8}>Август</MenuItem>
        <MenuItem value={9}>Сентябрь</MenuItem>
        <MenuItem value={10}>Октябрь</MenuItem>
        <MenuItem value={11}>Ноябрь</MenuItem>
        <MenuItem value={12}>Декабрь</MenuItem>
      </Select>

      <Select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        displayEmpty
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="all">Все</MenuItem>
        <MenuItem value="income">Доходы</MenuItem>
        <MenuItem value="expense">Расходы</MenuItem>
      </Select>

      <Button variant="contained" onClick={onApplyFilters}>
        Применить фильтр
      </Button>
    </Box>
  );
};

export default FilterPanel;
