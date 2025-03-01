import { Box, Select, MenuItem } from "@mui/material";
import { FilterPanelProps } from "@/interfaces";
import {
  FilterContainer,
  StyledSelect,
  StyledButton,
} from "@/components/FilterPanel/FilterPanel.styled";

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
    <FilterContainer>
      <Box sx={{ display: "flex", gap: 3 }}>
        <StyledSelect
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value as number)}
          displayEmpty
        >
          <MenuItem value="">Все годы</MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </StyledSelect>
        <StyledSelect
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value as number)}
          displayEmpty
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
        </StyledSelect>

        <StyledSelect
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value as string)}
          displayEmpty
        >
          <MenuItem value="all">Все</MenuItem>
          <MenuItem value="income">Доходы</MenuItem>
          <MenuItem value="expense">Расходы</MenuItem>
        </StyledSelect>
      </Box>
      <StyledButton variant="contained" onClick={onApplyFilters}>
        Применить фильтр
      </StyledButton>
    </FilterContainer>
  );
};

export default FilterPanel;
