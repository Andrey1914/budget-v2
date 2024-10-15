import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const addExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const token = await getToken({ req, secret }); // Получаем токен с использованием секретной строки

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Проверяем наличие необходимых данных в запросе
      const { amount, description, category, date } = req.body;
      if (!amount || !description || !category || !date) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Проверяем, что идентификатор пользователя в токене корректен
      if (typeof token.sub !== "string") {
        return res.status(400).json({ error: "Invalid user ID type in token" });
      }

      const userId = new ObjectId(token); // Преобразуем userId в ObjectId для использования в MongoDB

      // Подключаемся к базе данных
      const client = await clientPromise;
      const db = client.db("budget-v2");

      // Преобразуем дату в объект Date
      const expenseDate = new Date(date);

      // Добавляем запись о расходе в базу данных
      const expense = await db.collection("expense").insertOne({
        userId: userId,
        amount: parseFloat(amount), // Убеждаемся, что сумма преобразована в число
        description,
        category,
        date: expenseDate,
        createdAt: new Date(),
      });

      // Возвращаем успешный ответ с данными о новом расходе
      res.status(201).json(expense);
    } catch (error) {
      console.error("Error adding expense:", error);
      res.status(500).json({ error: "Failed to add expense" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default addExpense;

// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "@/lib/db";
// import { getToken } from "next-auth/jwt";
// import { ObjectId } from "mongodb";

// const secret = process.env.JWT_SECRET;
// // const secret = process.env.NEXT_AUTH_SECRET;

// const addExpense = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const token = await getToken({ req, secret: secret });

//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const { amount, description, category, date } = req.body;

//     if (!amount || !description || !category || !date) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     try {
//       const userId = new ObjectId(token.sub); // Преобразуем userId в ObjectId

//       const client = await clientPromise;
//       const db = client.db("budget-v2");

//       const expenseDate = new Date(date);

//       const expense = await db.collection("expense").insertOne({
//         // _id: new ObjectId(),
//         userId: userId, // Сохраняем строку userId в базе данных
//         amount: parseFloat(amount),
//         description,
//         category,
//         date: expenseDate,
//         createdAt: new Date(),
//       });
//       res.status(201).json(expense);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to add expense" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// };

// export default addExpense;
