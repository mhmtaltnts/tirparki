import prisma from '../prisma';

export const getUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch user!');
  }
};

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    if (!users?.length) {
      return [];
    }

    return users;
  } catch (err) {
    console.log(err);
    throw new Error('Kullanıcı bulunamadı!');
  }
}
