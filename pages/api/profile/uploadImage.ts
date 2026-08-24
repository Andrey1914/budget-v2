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
        },
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
