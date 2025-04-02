import { NextApiRequest, NextApiResponse } from "next";

import register from "@/pages/api/auth/register";
import login from "@/pages/api/auth/login";
import logout from "@/pages/api/auth/logout";
import profile from "@/pages/api/auth/profile";

// import addExpense from "@/pages/api/expense/add";
import addExpense from "@/pages/api/transactions/add";

// import deleteExpense from "@/pages/api/expense/delete";
import deleteExpense from "@/pages/api/transactions/delete";

// import editExpense from "@/pages/api/expense/edit";
import editExpense from "@/pages/api/transactions/edit";

// import addIncome from "@/pages/api/income/add";
import addIncome from "@/pages/api/transactions/add";

// import deleteIncome from "@/pages/api/income/delete";
import deleteIncome from "@/pages/api/transactions/delete";

// import editIncome from "@/pages/api/income/edit";
import editIncome from "@/pages/api/transactions/edit";

import addTask from "@/pages/api/tasks/add";
import deleteTask from "@/pages/api/tasks/delete";
import editTask from "@/pages/api/tasks/edit";

const apiRouter = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, url } = req;

  if (url) {
    if (url.startsWith("/api/auth")) {
      if (method === "POST" && url === "/api/auth/register") {
        return register(req, res);
      } else if (method === "POST" && url === "/api/auth/login") {
        return login(req, res);
      } else if (method === "POST" && url === "/api/auth/logout") {
        return logout(req, res);
      } else if (method === "GET" && url === "/api/auth/profile") {
        return profile(req, res);
      }

      if (url.startsWith("/api/expense")) {
        if (method === "POST" && url === "/api/expense/add") {
          return addExpense(req, res);
        } else if (method === "DELETE" && url === "/api/expense/delete") {
          return deleteExpense(req, res);
        } else if (method === "PUT" && url === "/api/expense/edit") {
          return editExpense(req, res);
        }
      } else if (url.startsWith("/api/income")) {
        if (method === "POST" && url === "/api/income/add") {
          return addIncome(req, res);
        } else if (method === "DELETE" && url === "/api/income/delete") {
          return deleteIncome(req, res);
        } else if (method === "PUT" && url === "/api/income/edit") {
          return editIncome(req, res);
        }
      } else if (url.startsWith("/api/tasks")) {
        if (method === "POST" && url === "/api/tasks/add") {
          return addTask(req, res);
        } else if (method === "DELETE" && url === "/api/tasks/delete") {
          return deleteTask(req, res);
        } else if (method === "PUT" && url === "/api/tasks/edit") {
          return editTask(req, res);
        }
      }
    }
  }

  res.status(404).json({ error: "Not found" });
};

export default apiRouter;
