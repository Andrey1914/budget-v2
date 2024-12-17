import { Box, Typography } from "@mui/material";
import { BalanceComparisonProps } from "@/interfaces";

const BalanceComparison: React.FC<BalanceComparisonProps> = ({
  totalIncome,
  totalExpense,
}) => {
  const balance = totalIncome - totalExpense;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        borderRadius: "0.3rem",
        backgroundColor: balance >= 0 ? "lightgreen" : "lightcoral",
        color: "white",
        textAlign: "center",
        marginTop: "1rem",
      }}
    >
      <Typography variant="h4">Total Income: {totalIncome}</Typography>
      <Typography variant="h4">Total Expense: {totalExpense}</Typography>
      <Typography variant="h4" component="p">
        {balance >= 0 ? "Balance: " : "Deficit: "}
        {balance}
      </Typography>
    </Box>
  );
};

export default BalanceComparison;
