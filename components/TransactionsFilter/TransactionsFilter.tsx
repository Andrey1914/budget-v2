// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// const TransactionsFilter = () => {
//   const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
//   const [type, setType] = useState<string>("both");
//   const [transactions, setTransactions] = useState<any[]>([]);
//   const [totalSum, setTotalSum] = useState<number>(0);
//   const [page, setPage] = useState<number>(1);
//   const [limit] = useState<number>(10);

//   const fetchTransactions = useCallback(() => {
//     async () => {
//       try {
//         const response = await axios.get(
//           `/api/transactions/filterTransactions`,
//           {
//             params: { month, type, page, limit },
//           }
//         );

//         setTransactions(response.data.transactions);
//         setTotalSum(response.data.totalSum);
//       } catch (error) {
//         console.error("Error fetching transactions", error);
//       }
//     };
//   }, [month, type, page, limit]);

//   useEffect(() => {
//     fetchTransactions();
//   }, [fetchTransactions]);

//   return (
//     <div>
//       <h1>Filter Transactions</h1>

//       <label>
//         Month:
//         <select
//           value={month}
//           onChange={(e) => setMonth(parseInt(e.target.value))}
//         >
//           {Array.from({ length: 12 }, (_, i) => (
//             <option key={i + 1} value={i + 1}>
//               {new Date(0, i).toLocaleString("en", { month: "long" })}
//             </option>
//           ))}
//         </select>
//       </label>

//       <label>
//         Type:
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="both">Both</option>
//           <option value="income">Income</option>
//           <option value="expense">Expense</option>
//         </select>
//       </label>

//       <ul>
//         {transactions.map((transaction) => (
//           <li key={transaction._id}>
//             {transaction.date}: {transaction.type} - ${transaction.amount}
//           </li>
//         ))}
//       </ul>

//       <p>Total for selected period: ${totalSum}</p>

//       <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//         Previous
//       </button>
//       <button onClick={() => setPage(page + 1)}>Next</button>
//     </div>
//   );
// };

// export default TransactionsFilter;
