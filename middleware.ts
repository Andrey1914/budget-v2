import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n/request";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
});

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  const isLocalePresent =
    !!firstSegment &&
    locales.includes(firstSegment as (typeof locales)[number]);

  if (!isLocalePresent) {
    return intlMiddleware(req);
  }

  const pathWithoutLocale =
    segments.length > 1 ? `/${segments.slice(1).join("/")}` : "/";

  const currentLocale = firstSegment;

  if (pathWithoutLocale === "/") {
    return NextResponse.redirect(new URL(`/${currentLocale}/landing`, req.url));
  }

  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route),
  );

  if (isProtectedRoute) {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
    });

    const now = Math.floor(Date.now() / 1000);

    if (!token || (token.exp && (token.exp as number) < now)) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/landing`, req.url),
      );
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|favicon.ico|.*\\..*).*)"],
};
