import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const { pathname } = req.nextUrl;

  const isAuth = !!token;
  const isProtectedRoutes = ["/dashboard"].includes(pathname);
  const isPublicRoutes = ["/"].includes(pathname);
  const isAuthRoutes = pathname.startsWith("/auth");

  if (!isAuth && (isProtectedRoutes || isAuthRoutes)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAuth && isPublicRoutes) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/auth/:path*"],
};
