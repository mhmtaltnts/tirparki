import ExitForm from "./exit-form";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { getEntry } from "@/lib/data/entry-data";
import { getInvoice } from "@/lib/data/invoice-data";
import { getRate } from "@/lib/data/parking-rate-data";

export default async function ExitPage({ searchParams }) {
  const id = searchParams?.id;
  const entry = await getEntry(id);
  const session = await auth();
  const data = await getRate();
  const invoice = await getInvoice(id);

  return (
    <main className="h-full flex-1 flex-col items-center p-2 md:flex lg:p-6">
      {/* <PageHeader>
        <PageHeaderHeading>Çıkış İşlemi</PageHeaderHeading>
        <PageHeaderDescription>
          Bu sayfadan aracın çıkış çıkış yapabilirsiniz.
        </PageHeaderDescription>
      </PageHeader> */}
      <ExitForm
        userId={session?.user.id}
        entry={entry}
        entryTime={entry.createdAt}
        hourlyRate={data.rate}
        invoice={invoice}
      />
    </main>
  );
}
