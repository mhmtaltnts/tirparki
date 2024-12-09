import prisma from "@/lib/prisma";
import { NewParkForm } from "./new-park-form";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default async function NewParkPage() {
  const session = await auth();

  const customers = await prisma.user.findMany();

  return (
    <main className="h-full flex-1 flex-col items-center p-2 md:flex lg:p-6">
      {/* <PageHeader>
        <PageHeaderHeading>Parka Araç Girişi</PageHeaderHeading>
        <PageHeaderDescription>
          Bu sayfadan parka araç girişi yapabilirsiniz.
        </PageHeaderDescription>
      </PageHeader> */}
      <NewParkForm user={session?.user} customers={customers} />
    </main>
  );
}
