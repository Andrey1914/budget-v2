import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import clientPromise from "@/lib/db";
import sendConfirmationEmail from "@/pages/api/confirmEmail/sendConfirmationEmail";

// Функция для генерации 6-значного кода подтверждения
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      // Проверяем, существует ли пользователь с таким email
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = generateVerificationCode();

      // Создаем нового пользователя в базе данных
      const result = await db.collection("users").insertOne({
        name,
        email,
        password: hashedPassword,
        verificationCode,
        isVerified: false,
        createdAt: new Date(),
      });

      console.log("User created:", result);

      // Отправляем код подтверждения на email пользователя
      await sendConfirmationEmail(email, verificationCode);

      res.status(201).json({
        message:
          "User created successfully. Please check your email for the verification code.",
        success: true,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "User creation failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default register;

// ---------------рабочий код---------------
// import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid"; // Импортируем UUID для генерации токена
// import clientPromise from "@/lib/db";
// import sendConfirmationEmail from "@/pages/api/confirmEmail/sendConfirmationEmail";

// const register = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { name, email, password } = req.body;

//     const client = await clientPromise;
//     const db = client.db("budget-v2");

//     try {
//       // Проверяем, существует ли пользователь с таким email
//       const existingUser = await db.collection("users").findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: "Email already in use" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       const token = uuidv4(); // Генерируем уникальный токен для подтверждения

//       const result = await db.collection("users").insertOne({
//         name,
//         email,
//         password: hashedPassword,
//         token,
//         isVerified: false,
//       });

//       console.log("User created:", result);

//       await sendConfirmationEmail(email, token);

//       res.status(201).json({
//         message:
//           "User created successfully. Please check your email to confirm.",
//         success: true,
//       });
//     } catch (error) {
//       console.error("Error creating user:", error);
//       res.status(500).json({ error: "User creation failed" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// };

// export default register;

// import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcrypt";
// import { getToken } from "next-auth/jwt";
// import { v4 as uuidv4 } from "uuid";
// import clientPromise from "@/lib/db";
// import sendConfirmationEmail from "@/pages/api/confirmEmail/sendConfirmationEmail";

// const secret = process.env.JWT_SECRET;

// const register = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { name, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // const emailToken = uuidv4();
//     const token = await getToken({ req, secret });

//     const client = await clientPromise;
//     const db = client.db("budget-v2");

//     try {
//       const result = await db.collection("users").insertOne({
//         name,
//         email,
//         password: hashedPassword,
//         token: token,
//         isVerified: false,
//       });

//       console.log("Users object:", result);

//       await sendConfirmationEmail(email, token);

//       res.status(201).json({
//         message:
//           "User created successfully. Please check your email to confirm.",
//         success: true,
//       });
//     } catch (error) {
//       console.error("Error creating user:", error);
//       res.status(500).json({ error: "User creation failed" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// };

// export default register;

// import { v4 as uuidv4 } from "uuid";
// import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcrypt";
// import clientPromise from "@/lib/db";
// // import sendConfirmationEmail from "@/utils/sendConfirmationEmail"; // Правильный путь к функции
// import sendConfirmationEmail from "@/pages/api/confirmEmail/sendConfirmationEmail"

// const register = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { name, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const client = await clientPromise;
//     const db = client.db("budget-v2");

//     try {
//       // Проверяем, существует ли пользователь с таким email
//       const existingUser = await db.collection("users").findOne({ email });

//       if (existingUser) {
//         return res
//           .status(400)
//           .json({ error: "User with this email already exists" });
//       }

//       // Генерируем токен для подтверждения email
//       const emailToken = uuidv4();

//       // Создаем пользователя с полями name, email, password, токеном и флагом isVerified
//       const user = await db.collection("users").insertOne({
//         name,
//         email,
//         password: hashedPassword,
//         token: emailToken,
//         isVerified: false, // Устанавливаем флаг верификации как false
//       });

//       // Отправляем письмо с подтверждением email
//       await sendConfirmationEmail(email, emailToken);

//       res.status(201).json({
//         message:
//           "User created successfully. Please check your email to confirm.",
//       });
//     } catch (error) {
//       console.error("Error during user registration:", error);
//       res.status(500).json({ error: "User creation failed" });
//     }
//   } else {
//     res.status(405).end();
//   }
// };

// export default register;

// рабочий код..
//import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcrypt";

// import clientPromise from "@/lib/db";

// const register = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { name, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const client = await clientPromise;
//     const db = client.db("budget-v2");

//     try {
//       const user = await db.collection("users").insertOne({
//         name,
//         email,
//         password: hashedPassword,
//       });
//       res.status(201).json(user);
//     } catch (error) {
//       res.status(500).json({ error: "User creation failed" });
//     }
//   } else {
//     res.status(405).end();
//   }
// };

// export default register;