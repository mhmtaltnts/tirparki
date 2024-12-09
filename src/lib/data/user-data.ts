import prisma from "../prisma";
import { db } from "@/db";
import { eq } from "drizzle-orm";
//import { users } from "@/db/schema";

export const getUser = async (id: string) => {
  try {
    /* const user = await db.select().from(users).where(eq(users.id, id)).limit(1); */

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export async function getUsers() {
  try {
    /* const Users = await db.select().from(users); */
    const users = await prisma.user.findMany();
    if (users?.length === 0) {
      return [];
    }

    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Kullanıcı bulunamadı!");
  }
}
