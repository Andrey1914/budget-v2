import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n/request";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
  // The locale in the URL must be authoritative. Otherwise next-intl can
  // use the stale NEXT_LOCALE/browser locale and redirect /en back to /uk.
  localeDetection: false,
});

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}/landing`, req.url));
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const isLocalePresent = locales.includes(firstSegment as any);

  const currentLocale = isLocalePresent ? firstSegment : defaultLocale;

  const pathWithoutLocale = isLocalePresent
    ? `/${segments.slice(1).join("/")}`
    : pathname;

  if (pathWithoutLocale === "/" || pathWithoutLocale === "") {
    return NextResponse.redirect(new URL(`/${currentLocale}/landing`, req.url));
  }

  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route),
  );

  if (isProtectedRoute) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
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

// // import { getToken } from "next-auth/jwt";
// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";

// // export async function middleware(req: NextRequest) {
// //   const token = await getToken({ req, secret: process.env.JWT_SECRET });

// //   if (!token) {
// //     return NextResponse.redirect(new URL("/auth/login", req.url));
// //   }

// //   const now = Math.floor(Date.now() / 1000);
// //   if (token.exp && token.exp < now) {
// //     return NextResponse.redirect(new URL("/auth/login", req.url));
// //   }

// //   return NextResponse.next();
// // }

// // // export const config = {
// // //   matcher: ["/dashboard/:path*", "/profile/:path*"],
// // // };

// // import createMiddleware from "next-intl/middleware";
// // import { locales, defaultLocale } from "./i18n/request";

// // export default createMiddleware({
// //   locales,
// //   defaultLocale,
// //   localePrefix: "always",
// // });

// // export const config = {
// //   matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
// // };
