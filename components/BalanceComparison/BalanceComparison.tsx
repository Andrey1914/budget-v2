import { useSession } from "next-auth/react";
import { Box, Typography } from "@mui/material";
import { Session, BalanceComparisonProps } from "@/interfaces";

const BalanceComparison: React.FC<BalanceComparisonProps> = ({
  totalIncome,
  totalExpense,
}) => {
  const { data: session } = useSession() as {
    data: Session | null;
  };

  const userCurrency = session?.user?.currency;

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
      <Typography variant="h4">
        Total Income: {totalIncome} {userCurrency}
      </Typography>
      <Typography variant="h4">
        Total Expense: {totalExpense} {userCurrency}
      </Typography>
      <Typography variant="h4" component="p">
        {balance >= 0 ? "Balance: " : "Deficit: "}
        {balance} {userCurrency}
      </Typography>
    </Box>
  );
};

export default BalanceComparison;
