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
          <MenuItem value="">Всі роки</MenuItem>
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
          <MenuItem value="">Всі місяці</MenuItem>
          <MenuItem value={1}>Січень</MenuItem>
          <MenuItem value={2}>Лютий</MenuItem>
          <MenuItem value={3}>Березень</MenuItem>
          <MenuItem value={4}>Квітень</MenuItem>
          <MenuItem value={5}>Травень</MenuItem>
          <MenuItem value={6}>Червень</MenuItem>
          <MenuItem value={7}>Липень</MenuItem>
          <MenuItem value={8}>Серпень</MenuItem>
          <MenuItem value={9}>Вересень</MenuItem>
          <MenuItem value={10}>Жовтень</MenuItem>
          <MenuItem value={11}>Листопад</MenuItem>
          <MenuItem value={12}>Грудень</MenuItem>
        </StyledSelect>

        <StyledSelect
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value as string)}
          displayEmpty
        >
          <MenuItem value="all">Всі трансакції</MenuItem>
          <MenuItem value="income">Доходи</MenuItem>
          <MenuItem value="expense">Витрати</MenuItem>
        </StyledSelect>
      </Box>
      <StyledButton variant="contained" onClick={onApplyFilters}>
        Застосувати фільтри.
      </StyledButton>
    </FilterContainer>
  );
};

export default FilterPanel;
