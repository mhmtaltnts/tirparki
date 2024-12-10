import prisma from "../prisma";

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

    if (entryWithoutExit?.length === 0) {
      return { message: "Parktan çıkışı yapılan araç yoktur. " };
    }

    return entryWithoutExit;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch data!");
  }
};
export type ParkEntryType = Awaited<ReturnType<typeof getInPark>>;
export type ParkEntryDataT = Exclude<ParkEntryType, { message: string }>;
