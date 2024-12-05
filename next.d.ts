import { NextApiRequest } from "next";
import { Multer } from "multer";

declare module "next" {
  interface NextApiRequest {
    file: Multer.File;
  }
}
