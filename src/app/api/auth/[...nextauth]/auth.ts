import NextAuth from "next-auth";
import NodemailerProvider from "next-auth/providers/nodemailer";
import Google from "next-auth/providers/google";
import { sendVerificationRequest } from "@/lib/authSendRequest";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";

const login = async (credentials: Partial<Record<string, unknown>>) => {
  if (!credentials.email || !credentials.password)
    throw new Error("Wrong credentials!");
  if (credentials?.email && credentials?.password) {
    try {
      const foundUser = await prisma.user.findUnique({
        where: {
          email: credentials.email as string,
        },
      });
      if (!foundUser) throw new Error("Wrong credentials!");
      if (!foundUser.password) throw new Error("Wrong credentials!");

      const isPasswordCorrect = await bcrypt.compare(
        credentials.password as string,
        foundUser.password,
      );
      if (!isPasswordCorrect) throw new Error("Wrong credentials!");
      return foundUser;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to login!");
    }
  }
};
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    NodemailerProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
      sendVerificationRequest,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          if (user && user.email) {
            return { id: user.email, email: user.email };
          }
          return null;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  pages: {
    verifyRequest: "/verifyRequest",
    signIn: "/login",
    newUser: "/register",
    error: "/error",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.image = token.img as string | null;
      }
      return session;
    },

    async jwt({ token }) {
      if (token?.email) {
        const foundUser = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });
        if (foundUser) {
          token.id = foundUser.id;
          token.role = foundUser.role;
          token.img = foundUser.image;
        }
      }
      return token;
    },
  },
});
