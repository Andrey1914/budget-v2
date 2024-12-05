import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await new Promise((resolve, reject) => {
      upload.single("file")(req as any, res as any, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });

    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "user_avatars",
        },
        (error: any, result: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(file.buffer);
    });

    return res.status(200).json({ secure_url: (result as any).secure_url });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return res.status(500).json({ error: "Error uploading file" });
  }
};

export default uploadImage;

// import { NextApiRequest, NextApiResponse } from "next";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const upload = multer({
//   storage: multer.memoryStorage(),
// }).single("file");

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadImage = (req: NextApiRequest, res: NextApiResponse) => {
//   return new Promise((resolve, reject) => {
//     upload(req, res, async (err: any) => {
//       if (err) {
//         console.error("Multer upload error:", err);
//         return res.status(500).json({ error: "Error during file upload" });
//       }

//       const file = req.file;
//       if (!file) {
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       try {
//         if (!cloudinary || !cloudinary.uploader) {
//           console.error("Cloudinary uploader is undefined");
//           return res
//             .status(500)
//             .json({ error: "Cloudinary uploader not found" });
//         }

//         const result = await new Promise<any>((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             {
//               resource_type: "auto",
//               folder: "user_avatars",
//             },
//             (error: any, result: any) => {
//               if (error) {
//                 console.error("Cloudinary upload error:", error);
//                 reject(error);
//               } else {
//                 resolve(result);
//               }
//             }
//           );

//           stream.end(file.buffer);
//         });

//         return res.status(200).json({ secure_url: result.secure_url });
//       } catch (error) {
//         console.error("Error uploading image to Cloudinary:", error);
//         return res.status(500).json({ error: "Error uploading file" });
//       }
//     });
//   });
// };

// export default uploadImage;

// import { NextApiRequest, NextApiResponse } from "next";
// import multer from "multer";
// // import cloudinary from "cloudinary";
// import { v2 as cloudinary } from "cloudinary";

// // Настройка Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Настройка Multer для загрузки файлов
// const upload = multer({
//   storage: multer.memoryStorage(), // Используем память для хранения файла в процессе
// }).single("file");

// export const config = {
//   api: {
//     bodyParser: false, // Отключаем стандартный парсер тела для загрузки файлов
//   },
// };

// const uploadImage = (req: NextApiRequest, res: NextApiResponse) => {
//   return new Promise((resolve, reject) => {
//     upload(req, res, async (err: any) => {
//       if (err) {
//         console.error("Multer upload error", err); // Логирование ошибки
//         return res.status(500).json({ error: "Error during file upload" });
//       }

//       const file = req.file;
//       if (!file) {
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       try {
//         // Загрузка файла в Cloudinary
//         const result = await new Promise<any>((resolve, reject) => {
//           const stream = cloudinary.v2.uploader.upload_stream(
//             {
//               resource_type: "auto", // Cloudinary автоматически определит тип ресурса
//               folder: "user_avatars", // Указываем папку
//             },
//             (error: any, result: any) => {
//               if (error) {
//                 console.error("Cloudinary upload error", error);
//                 reject(error);
//               } else {
//                 resolve(result);
//               }
//             }
//           );

//           // Пишем файл в Cloudinary
//           stream.end(file.buffer);
//         });

//         return res.status(200).json({ secure_url: result.secure_url });
//       } catch (error) {
//         console.error("Error uploading image to Cloudinary", error);
//         return res.status(500).json({ error: "Error uploading file" });
//       }
//     });
//   });
// };

// export default uploadImage;

// import { NextApiRequest, NextApiResponse } from "next";
// import { v2 as cloudinary } from "cloudinary";
// import multer from "multer";
// import { Readable } from "stream";

// const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
//   process.env;

// cloudinary.config({
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET,
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// const runMiddleware = (
//   req: NextApiRequest,
//   res: NextApiResponse,
//   fn: Function
// ) => {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// };

// const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   await runMiddleware(req, res, upload.single("file"));

//   const file = req.file;
//   if (!file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   try {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { folder: "user_avatars" },
//       (error: any, result: any) => {
//         if (error) {
//           console.error("Error uploading to Cloudinary:", error);
//           return res.status(500).json({ error: "Error uploading file" });
//         }

//         return res.status(200).json({ url: result.secure_url });
//       }
//     );

//     Readable.from(file.buffer).pipe(uploadStream);
//   } catch (error) {
//     console.error("Error processing upload:", error);
//     return res.status(500).json({ error: "Error processing upload" });
//   }
// };

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default uploadImage;

// import { NextApiRequest, NextApiResponse } from "next";
// import { v2 as cloudinary } from "cloudinary";
// import multer from "multer";
// import { Readable } from "stream";

// const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
//   process.env;

// // Конфигурация Cloudinary
// cloudinary.config({
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET,
// });

// // Настраиваем multer для хранения файлов в памяти
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Обёртка для работы с middleware в API-обработчиках Next.js
// const runMiddleware = (
//   req: NextApiRequest,
//   res: NextApiResponse,
//   fn: Function
// ) => {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// };

// const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   // Применяем multer для обработки файла
//   await runMiddleware(req, res, upload.single("file"));

//   //   const file = req.file; // Получаем файл из запроса
//   const { file } = JSON.parse(req.body);
//   if (!file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   try {
//     // Загрузка файла в Cloudinary
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { folder: "user_avatars" },
//       (error, result) => {
//         if (error) {
//           console.error("Error uploading to Cloudinary:", error);
//           return res.status(500).json({ error: "Error uploading file" });
//         }

//         // Успешный ответ с URL
//         return res.status(200).json({ url: result.secure_url });
//       }
//     );

//     // Преобразуем буфер файла в поток и передаём в Cloudinary
//     Readable.from(file.buffer).pipe(uploadStream);
//   } catch (error) {
//     console.error("Error processing file upload:", error);
//     return res.status(500).json({ error: "Error processing upload" });
//   }
// };

// export const config = {
//   api: {
//     bodyParser: false, // Отключаем встроенный парсер body
//   },
// };

// export default uploadImage;

// import { NextApiRequest, NextApiResponse } from "next";
// import { v2 as cloudinary } from "cloudinary";

// const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
//   process.env;

// cloudinary.config({
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET,
// });

// const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { file, folder } = JSON.parse(req.body);

//     if (!file) {
//       return res.status(400).json({ error: "No file provided" });
//     }

//     const result = await cloudinary.uploader.upload(file, {
//       folder: folder || "user_avatars",
//     });

//     return res.status(200).json({ url: result.secure_url });
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     return res.status(500).json({ error: "Error uploading file" });
//   }
// };

// export default uploadImage;
