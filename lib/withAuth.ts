import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { z, ZodError } from "zod";

export type AuthUser = NonNullable<Awaited<ReturnType<typeof getToken>>> & {
  userId: string;
};

export interface AuthenticatedNextApiRequest<T = any> extends NextApiRequest {
  user: AuthUser;
  validData?: T;
}

type AuthenticatedHandler<T = any> = (
  req: AuthenticatedNextApiRequest<T>,
  res: NextApiResponse,
) => Promise<void | NextApiResponse> | void | NextApiResponse;

const secret = process.env.JWT_SECRET;

export function withAuth<T = any>(
  handler: AuthenticatedHandler<T>,
  schema?: z.ZodType<T>,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = await getToken({ req, secret });

      if (!token || !token.sub) {
        return res
          .status(401)
          .json({ error: "Unauthorized: Invalid or missing token" });
      }

      const authReq = req as AuthenticatedNextApiRequest<T>;
      authReq.user = {
        ...token,
        userId: token.sub,
      };

      if (
        schema &&
        (req.method === "POST" ||
          req.method === "PUT" ||
          req.method === "PATCH")
      ) {
        const parseResult = schema.safeParse(req.body);
        if (!parseResult.success) {
          const firstError =
            parseResult.error.issues[0]?.message || "Validation failed";
          return res.status(400).json({ error: firstError });
        }
        authReq.validData = parseResult.data;
      }

      return await handler(authReq, res);
    } catch (error: any) {
      if (error instanceof ZodError) {
        const firstError = error.issues[0]?.message || "Validation error";
        return res.status(400).json({ error: firstError });
      }

      console.error(`API Error [${req.method}] ${req.url}:`, error);

      const statusCode = error.statusCode || error.status || 500;
      const message = error.message || "Internal Server Error";

      return res.status(statusCode).json({ error: message });
    }
  };
}
