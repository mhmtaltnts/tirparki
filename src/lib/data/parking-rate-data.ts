"use server";
import prisma from "@/lib/prisma";

export const getParkingRate = async (id: string) => {
  try {
    /* const ParkingRate = await db
      .select()
      .from(parkingRate)
      .where(eq(parkingRate.id, id));
       */
    const ParkingRate = await prisma.parkingRate.findUnique({
      where: {
        id,
      },
    });
    return ParkingRate;
  } catch (error) {
    return { error: "Parklama oranı alınırken hata oluştu" };
  }
};

export async function getParkingRates() {
  const parkingRates = prisma.parkingRate.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return parkingRates;
}

export async function getRate() {
  const rate = await prisma.parkingRate.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });

  return rate;
}
