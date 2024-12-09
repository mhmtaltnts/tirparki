import prisma from "../prisma";

export async function getBilling(customerId: string) {
  try {
    const customerParkingRecords = await prisma.entry.findMany({
      where: {
        customerId: customerId,
      },
      select: {
        trailer: true,
        createdAt: true,

        exit: {
          select: {
            createdAt: true,
          },
        },
        invoice: {
          select: {
            amount: true,
            status: true,
          },
        },
      },
    });

    return customerParkingRecords;
  } catch (error) {
    console.error("Error fetching customer parking records:", error);
    throw new Error("Failed to fetch customer parking records");
  }
}
