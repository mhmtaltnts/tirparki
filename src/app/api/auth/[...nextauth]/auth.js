import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';

import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

//import NodemailerProvider from 'next-auth/providers/nodemailer';

const login = async (credentials) => {
  try {
    const foundUser = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!foundUser) throw new Error('Wrong credentials!');

    if (!foundUser.password) throw new Error('Wrong credentials!');
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      foundUser.password
    );

    if (!isPasswordCorrect) throw new Error('Wrong credentials!');

    return foundUser;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to login!');
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    /* NodemailerProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }), */

    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      const user = await prisma.user.findUnique({
        where: { email: token?.email },
      });
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.img = user.image;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          const user = await prisma.user.findUnique({
            where: { email: profile.email },
          });
          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                name: profile.name,
                email: profile.email,
                image: profile.picture,
                role: 'USER',
              },
            });
            console.log(newUser);
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },

    ...authConfig.callbacks,
  },
});
