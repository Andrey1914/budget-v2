"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import TransactionsList from "@/components/Transactions/TransactionsList";
import TasksList from "@/components/Tasks/TasksList";
import CarryOverBalance from "@/components/CarryOverBalance/CarryOverBalance";
import { useFinancialSummary } from "@/hooks/useFinancialSummary";

import { Box, Grid2, Typography, CircularProgress } from "@mui/material";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: summary, isLoading } = useFinancialSummary();

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    } else if (!session.user.isVerified) {
      router.push("/auth/verify-email");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (summary) {
      setTotalIncome(summary.totalIncome);
      setTotalExpense(summary.totalExpense);
    }
  }, [summary]);

  const handleIncomesUpdate = (updatedIncomes: number) => {
    setTotalIncome(updatedIncomes);
  };

  const handleExpensesUpdate = (updatedExpenses: number) => {
    setTotalExpense(updatedExpenses);
  };

  if (!session || !session.user.isVerified) {
    return null;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Finance App, {session.user.name}
      </Typography>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid2 container spacing={4} direction={{ xs: "column", md: "row" }}>
          <Grid2
            container
            size={12}
            direction={{ xs: "column", md: "row" }}
            component="div"
          >
            <Grid2 size={{ xs: 12, md: 6 }} component="div">
              <Grid2 container direction="column" spacing={4}>
                <Grid2 size={6} component="div">
                  <TransactionsList
                    type="income"
                    totalAmount={totalIncome}
                    onUpdate={handleIncomesUpdate}
                  />
                </Grid2>
                <Grid2 size={6} component="div">
                  <TransactionsList
                    type="expense"
                    totalAmount={totalExpense}
                    onUpdate={handleExpensesUpdate}
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }} component="div">
              <Grid2 container direction="column" spacing={4}>
                <Grid2 size={6} component="div">
                  <CarryOverBalance />
                </Grid2>
                <Grid2 size={6} component="div">
                  <TasksList />
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      )}
    </Box>
  );
};

export default Dashboard;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// import ExpensesList from "@/components/Expense/ExpensesList";
// import IncomesList from "@/components/Income/IncomesList";
// import TasksList from "@/components/Tasks/TasksList";
// import CarryOverBalance from "@/components/CarryOverBalance/CarryOverBalance";
// import { useFinancialSummary } from "@/hooks/useFinancialSummary";

// import { Box, Grid2, Typography, CircularProgress } from "@mui/material";

// const Dashboard: React.FC = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const { data: summary, isLoading } = useFinancialSummary();

//   const [totalIncome, setTotalIncome] = useState<number>(0);
//   const [totalExpense, setTotalExpense] = useState<number>(0);

//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session) {
//       router.push("/auth/login");
//     } else if (!session.user.isVerified) {
//       router.push("/auth/verify-email");
//     }
//   }, [session, status, router]);

//   useEffect(() => {
//     if (summary) {
//       setTotalIncome(summary.totalIncome);
//       setTotalExpense(summary.totalExpense);
//     }
//   }, [summary]);

//   const handleIncomesUpdate = (updatedIncomes: number) => {
//     setTotalIncome(updatedIncomes);
//   };

//   const handleExpensesUpdate = (updatedExpenses: number) => {
//     setTotalExpense(updatedExpenses);
//   };

//   if (!session || !session.user.isVerified) {
//     return null;
//   }

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h3" component="h1" gutterBottom>
//         Welcome to Finance App, {session.user.name}
//       </Typography>

//       {isLoading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Grid2 container spacing={4} direction={{ xs: "column", md: "row" }}>
//           <Grid2
//             container
//             size={12}
//             direction={{ xs: "column", md: "row" }}
//             component="div"
//           >
//             <Grid2 size={{ xs: 12, md: 6 }} component="div">
//               <Grid2 container direction="column" spacing={4}>
//                 <Grid2 size={6} component="div">
//                   <IncomesList
//                     totalIncome={totalIncome}
//                     onUpdate={handleIncomesUpdate}
//                   />
//                 </Grid2>
//                 <Grid2 size={6} component="div">
//                   <ExpensesList
//                     totalExpense={totalExpense}
//                     onUpdate={handleExpensesUpdate}
//                   />
//                 </Grid2>
//               </Grid2>
//             </Grid2>

//             <Grid2 size={{ xs: 12, md: 6 }} component="div">
//               <Grid2 container direction="column" spacing={4}>
//                 <Grid2 size={6} component="div">
//                   <CarryOverBalance />
//                 </Grid2>
//                 <Grid2 size={6} component="div">
//                   <TasksList />
//                 </Grid2>
//               </Grid2>
//             </Grid2>
//           </Grid2>
//         </Grid2>
//       )}
//     </Box>
//   );
// };

// export default Dashboard;
