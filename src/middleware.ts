import NextAuth from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/auth.config";

import { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {});

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
