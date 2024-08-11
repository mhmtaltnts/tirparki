import EntryEditForm from './entry-edit-form';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getEntry } from '@/lib/data/entry-data';
import prisma from '@/lib/prisma';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';

export default async function ExitPage({ searchParams }) {
  const id = searchParams?.id;
  const session = await auth();
  const entry = await getEntry(id);
  const customers = await prisma.customer.findMany();

  return (
    <main className="h-full flex-1 flex-col p-2 lg:p-6 md:flex items-center">
      <PageHeader className="px-2 py-4 md:py-6 md:pb-2 lg:py-6 lg:pb-5">
        <PageHeaderHeading>Güncelleme İşlemi</PageHeaderHeading>
        <PageHeaderDescription>
          Bu sayfadan araç bilgilerini güncelleyebilirsiniz.
        </PageHeaderDescription>
      </PageHeader>
      <EntryEditForm
        userId={session?.user.id}
        entry={entry}
        customers={customers}
      />
    </main>
  );
}
