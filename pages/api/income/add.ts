import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET; // Убедитесь, что секретная строка установлена

if (!secret) {
  console.error("JWT_SECRET is not defined");
}

const addIncome = async (req: NextApiRequest, res: NextApiResponse) => {
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
      const incomeDate = new Date(date);

      // Добавляем запись о расходе в базу данных
      const income = await db.collection("income").insertOne({
        userId: userId,
        amount: parseFloat(amount), // Убеждаемся, что сумма преобразована в число
        description,
        category,
        date: incomeDate,
        createdAt: new Date(),
      });

      // Возвращаем успешный ответ с данными о новом расходе
      res.status(201).json(income);
    } catch (error) {
      console.error("Error adding income:", error);
      res.status(500).json({ error: "Failed to add income" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default addIncome;

// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "@/lib/db";
// import { getToken } from "next-auth/jwt";
// import { ObjectId } from "mongodb";

// const secret = process.env.JWT_SECRET;

// const addIncome = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const token = await getToken({ req, secret });
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const { amount, description, category, date } = req.body;

//     const client = await clientPromise;
//     const db = client.db("budget-v2");

//     try {
//       const expenseDate = new Date(date);

//       const income = await db.collection("income").insertOne({
//         userId: new ObjectId(token),
//         amount: parseFloat(amount),
//         description,
//         category,
//         date: expenseDate,
//         createdAt: new Date(),
//       });
//       res.status(201).json(income);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to add income" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// };

// export default addIncome;
