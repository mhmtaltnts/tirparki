import { type AuthConfig } from "@auth/core";
import Google from "next-auth/providers/google";

export const authConfig: AuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.img as string | null;
      }
      return session;
    },
    
    

}
}
