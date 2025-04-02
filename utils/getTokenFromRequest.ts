import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

export const getTokenFromRequest = async (req: NextApiRequest) => {
  return await getToken({ req, secret });
};
