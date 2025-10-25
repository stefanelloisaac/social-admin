import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/auth/sign-in", "/auth/sign-up"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);

  // Get session from better-auth
  const sessionResponse = await fetch(
    new URL("/api/auth/get-session", request.url),
    {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  const sessionData = await sessionResponse.json();
  const isAuthenticated = !!sessionData?.user;

  // If authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If not authenticated and trying to access protected routes, redirect to login
  if (!isAuthenticated && (pathname.startsWith("/dashboard") || pathname === "/")) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
