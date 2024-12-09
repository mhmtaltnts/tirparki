import prisma from "../prisma";
export const getOutOfPark = async () => {
  try {
    const entryWithExit = await prisma.entry.findMany({
      where: {
        exit: {
          isNot: undefined,
        },
      },
      select: {
        id: true,
        trailer: true,
        truck: true,
        createdAt: true,
        customer: {
          select: {
            name: true,
          },
        },
        exit: {
          select: {
            truck: true,
            createdAt: true,
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

    if (entryWithExit?.length === 0) {
      return { message: "Parktan çıkışı yapılan araç yoktur. " };
    }

    return entryWithExit;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch notes!");
  }
};

export type EntryWithExit = Awaited<ReturnType<typeof getOutOfPark>>;

export type DepartedDataT = Exclude<EntryWithExit, { message: string }>;
