"use server";

import { redirect } from "next/navigation";
import prisma from "../prisma";
import { CreateInvoiceSchema } from "../schemas/invoice-schemas";

type PrevState = {
  entryId: string;
  userId: string;
  error: string;
};

export async function updateInvoice(prevSate: PrevState, formData: FormData) {
  const { entryId, userId, error } = prevSate;
  const validatedFields = CreateInvoiceSchema.safeParse({
    amount: Number(formData.get("amount")),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      error: "Araç çıkışı yapılamadı. Veri tütü hatası",
      entryId,
      userId,
    };
  }

  const amount = formData.get("amount") as string;
  const status = formData.get("status") as string;

  try {
    await prisma.invoice.update({
      where: { entryId },
      data: { registrarId: userId, amount: Number(amount), status },
    });
  } catch (error) {
    console.log(error);
    return { error: "Veri tabanına yazılırken hata oluştu.", entryId, userId };
  }
  redirect("/entry");
}

export async function getStaffSales() {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const staffSales = await prisma.invoice.groupBy({
    by: ["registrarId"],
    _sum: {
      amount: true,
    },
    where: {
      createdAt: {
        gte: threeMonthsAgo,
      },
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });

  const staffDetails = await prisma.user.findMany({
    where: {
      id: {
        in: staffSales.map((staff) => staff.registrarId),
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return staffSales.map((sale) => ({
    amount: sale._sum.amount,
    registrar: staffDetails.find((staff) => staff.id === sale.registrarId),
  }));
}

export async function getCustomersTotalInvoice() {
  const lastMonthStart = new Date();
  lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
  lastMonthStart.setDate(1);
  lastMonthStart.setHours(0, 0, 0, 0);

  const customerTotalInvoices = await prisma.user.findMany({
    where: {
      role: "USER", // Assuming customers have the role "USER"
    },
    select: {
      id: true,
      name: true,
      entries: {
        select: {
          invoice: {
            where: {
              createdAt: {
                gte: lastMonthStart,
              },
            },
            select: {
              amount: true,
            },
          },
        },
      },
    },
  });

  const result = customerTotalInvoices.map((customer) => ({
    id: customer.id,
    name: customer.name,
    totalInvoice: customer.entries.reduce(
      (sum, entry) => sum + (entry.invoice?.amount || 0),
      0,
    ),
  }));

  return result;
}

export async function getLastYearMonthlyIncome() {
  const turkishMonths = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const monthlyIncome = await prisma.$queryRaw`
    SELECT
      ${turkishMonths}[EXTRACT(MONTH FROM "createdAt")::integer] AS month,
      CAST(SUM(amount) AS FLOAT) AS total_amount
    FROM "Invoice"
    WHERE "status" = 'PAID' AND "createdAt" >= ${oneYearAgo}
    GROUP BY EXTRACT(MONTH FROM "createdAt"), DATE_TRUNC('month', "createdAt")
    ORDER BY DATE_TRUNC('month', "createdAt") ASC
  `;

  return monthlyIncome;
}
