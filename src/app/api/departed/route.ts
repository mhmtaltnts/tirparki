import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function DELETE(request: Request) {
  const dataToDelete = (await request.json()) as string[];
  await prisma.entry.deleteMany({
    where: {
      id: {
        in: dataToDelete,
      },
    },
  });
  revalidatePath("/dashboard/departed");
  redirect("/dashboard/departed");
  //return new Response('deleted', { status: 200 });
}
