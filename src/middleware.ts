import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const user = session?.user;
  const { pathname } = request.nextUrl;

  const isAdmin =
    user?.role === "ADMIN" ||
    user?.role === "MANAGER" ||
    user?.role === "EMPLOYEE" ||
    user?.role === "OFFICIAL";
  const isOnDashboardPanel = pathname.startsWith("/dashboard");
  const isOnParkPage = pathname.startsWith("/park");
  const isOnEntryPage = pathname.startsWith("/entry");
  const isOnExitPage = pathname.startsWith("/entry/exit");
  const isOnCustomsPage = pathname.startsWith("/entry/customs");
  const isOnLoginPage = pathname.startsWith("/login");

  // ONLY ADMIN CAN REACH THE ADMIN dashboardBOARD

  /* if (
    isOnDashboardPanel &&
    !(user?.role === "MANAGER") &&
    !(user?.role === "ADMIN")
  ) {
    return new NextResponse("Access Denied", { status: 403 });
  } */

  // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

  if (
    (isOnEntryPage && !isAdmin) ||
    (isOnExitPage && !isAdmin) ||
    (isOnCustomsPage && !isAdmin)
  ) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  if (isOnParkPage && !user) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

  if (isOnLoginPage && user) {
    return Response.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
