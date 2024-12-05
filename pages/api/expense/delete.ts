// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "@/lib/db";
// import { getToken } from "next-auth/jwt";
// import { ObjectId } from "mongodb";

// const secret = process.env.JWT_SECRET; // Убедитесь, что секретная строка установлена

// const deleteExpense = async (req: NextApiRequest, res: NextApiResponse) => {
//   // Разрешаем все источники для тестирования (в реальной среде нужно ограничить доступ)
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "DELETE, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   // Обрабатываем CORS preflight-запрос
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   // Разрешаем только DELETE-запросы
//   if (req.method !== "DELETE") {
//     return res.status(405).end();
//   }

//   try {
//     // Получаем токен из запроса
//     const token = await getToken({ req, secret });

//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // Проверяем корректность userId в токене
//     if (typeof token.sub !== "string") {
//       return res.status(400).json({ error: "Invalid user ID type in token" });
//     }

//     const userId = new ObjectId(token.sub); // Преобразуем userId в ObjectId для использования в MongoDB

//     // Извлекаем ID расхода из тела запроса
//     const { id } = req.body;

//     if (!id) {
//       return res.status(400).json({ error: "Missing expense ID" });
//     }

//     // Подключаемся к базе данных
//     const client = await clientPromise;
//     const db = client.db("budget-v2");

//     // Удаляем запись о расходе, проверяя принадлежность пользователю
//     const result = await db.collection("expense").deleteOne({
//       _id: new ObjectId(id),
//       userId: userId,
//     });

//     // Проверяем, удалена ли запись
//     if (result.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ error: "Expense not found or not authorized" });
//     }

//     // Возвращаем успешный ответ
//     res.status(200).json({ message: "Expense deleted successfully" });
//   } catch (error) {
//     console.error("Failed to delete expense:", error);
//     res.status(500).json({ error: "Failed to delete expense" });
//   }
// };

// export default deleteExpense;

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;
// const secret = process.env.NEXTAUTH_SECRET;

const deleteExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = new ObjectId(token);

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing expense ID" });
  }

  const client = await clientPromise;
  const db = client.db("budget-v2");

  try {
    const result = await db.collection("expense").deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });
    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Expense not found or not authorized" });
    }

    res.status(200).json({ result, message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Failed to delete expense:", error);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

export default deleteExpense;
