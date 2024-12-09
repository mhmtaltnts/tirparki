"use server";
import prisma from "../prisma";
export const getEntry = async (id: string) => {
  try {
    const entry = await prisma.entry.findUnique({
      where: { id },
      include: { customs: { select: { desc: true } } },
    });
    return entry;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch note!");
  }
};

export const getInPark = async () => {
  try {
    const entryWithoutExit = await prisma.entry.findMany({
      where: {
        exit: null,
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
        customs: {
          select: {
            desc: true,
          },
        },
        invoice: {
          select: {
            status: true,
          },
        },
      },
    });
    if (!entryWithoutExit?.length) {
      return { message: "Parkta Araç Yoktur. Araç Girişi Yapabilirsiniz" };
    }
    return entryWithoutExit;
  } catch (err) {
    console.log(err);
    throw new Error("Veriye ulaşılamadı!");
  }
};

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ParkEntryType = Awaited<ReturnType<typeof getInPark>>;
export type EntryType = Awaited<ReturnType<typeof getEntry>>
