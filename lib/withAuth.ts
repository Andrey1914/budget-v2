import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export type AuthUser = NonNullable<Awaited<ReturnType<typeof getToken>>> & {
  userId: string;
};

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user: AuthUser;
}

type AuthenticatedHandler = (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) => Promise<void | NextApiResponse> | void | NextApiResponse;

const secret = process.env.JWT_SECRET;

export function withAuth(handler: AuthenticatedHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = await getToken({ req, secret });

      if (!token || !token.sub) {
        return res
          .status(401)
          .json({ error: "Unauthorized: Invalid or missing token" });
      }

      const authReq = req as AuthenticatedNextApiRequest;
      authReq.user = {
        ...token,
        userId: token.sub,
      };

      return await handler(authReq, res);
    } catch (error: any) {
      console.error(`API Error [${req.method}] ${req.url}:`, error);

      const statusCode = error.statusCode || error.status || 500;
      const message = error.message || "Internal Server Error";

      return res.status(statusCode).json({ error: message });
    }
  };
}
