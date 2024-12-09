"use server";
import { CreateParkingRateSchema } from "@/lib/schemas/parking-rate-schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createParkingRate = async (
  prevData: { error: string; message: string } = { error: "", message: "" },
  formData: FormData,
) => {
  console.log(formData.get("rate"));
  const validatedData = CreateParkingRateSchema.safeParse({
    rate: formData.get("rate"),
  });
  console.log(validatedData.data?.rate);

  if (!validatedData.success) {
    return { error: "Saat ücreti belirlenirken hata oluştu" };
  }

  const rate = Number(validatedData.data?.rate);

  try {
    await prisma.parkingRate.create({
      data: {
        rate,
      },
    });
    return {
      message: "Parklama oranı oluşturuldu",
      error: "",
    };
  } catch (error) {
    throw error;
  }
};

type PrevDataType = {
  id: string;
  error: string;
};

export const updateParkingRate = async (
  prevData: PrevDataType,
  formData: FormData,
) => {
  const validatedData = CreateParkingRateSchema.safeParse({
    rate: formData.get("rate"),
  });
  try {
    await prisma.parkingRate.update({
      where: {
        id: prevData.id,
      },
      data: {
        rate: Number(validatedData.data.rate),
      },
    });
    return {
      message: "Parklama oranı güncellendi",
      error: "",
      id: prevData.id,
    };
  } catch (error) {
    return {
      message: "",
      error: "Parklama oranı güncellenirken hata oluştu",
      id: prevData.id,
    };
  }
};

export const deleteParkingRate = async (id: string) => {
  try {
    await prisma.parkingRate.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/parkingrate");
  } catch (error) {
    console.error(error);
  }
};
