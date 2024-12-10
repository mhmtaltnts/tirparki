export const authConfig = {
  providers: [],
  // FOR MORE DETAIL ABOUT OPTIONS CHECK https://next-auth.js.org/configuration/options
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.img;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isAdmin =
        user?.role === "ADMIN" ||
        user?.role === "MANAGER" ||
        user?.role === "EMPLOYEE" ||
        user?.role === "OFFICIAL";
      const isOnDashPanel = request.nextUrl?.pathname.startsWith("/dash");
      const isOnParkPage = request.nextUrl?.pathname.startsWith("/park");
      const isOnEntryPage = request.nextUrl?.pathname.startsWith("/entry");
      const isOnExitPage = request.nextUrl?.pathname.startsWith("/entry/exit");
      const isOnCustomsPage =
        request.nextUrl?.pathname.startsWith("/entry/customs");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

      if (
        isOnDashPanel &&
        !(user?.role === "MANAGER") &&
        !(user?.role === "ADMIN")
      ) {
        return false;
      }

      // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

      if (
        (isOnEntryPage && !isAdmin) ||
        (isOnExitPage && !isAdmin) ||
        (isOnCustomsPage && !isAdmin)
      ) {
        return false;
      }

      if (isOnParkPage && !user) {
        return false;
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
