import CreateCustomsForm from "./create-customs-form";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { getEntry } from "@/lib/data/entry-data";

export default async function CustomPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = searchParams?.id;
  const entry = await getEntry(id as string);
  const session = await auth();

  return (
    <main className="h-full flex-1 flex-col items-center p-2 md:flex lg:p-6">
      <PageHeader>
        <PageHeaderHeading>Gümrük İşlemi</PageHeaderHeading>
        <PageHeaderDescription>
          Bu sayfadan aracın gümrük girişini yapabilirsiniz.
        </PageHeaderDescription>
      </PageHeader>
      <CreateCustomsForm userId={session?.user.id as string} entry={entry} />{" "}
    </main>
  );
}
