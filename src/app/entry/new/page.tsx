import prisma from '@/lib/prisma';
import { NewParkForm } from './new-park-form';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';

export default async function NewParkPage() {
  const session = await auth();
  const customers = await prisma.customer.findMany();

  return (
    <main className="h-full flex-1 flex-col p-2 lg:p-6 md:flex items-center">
      <PageHeader>
        <PageHeaderHeading>Parka Araç Girişi</PageHeaderHeading>
        <PageHeaderDescription>
          Bu sayfadan parka araç girişi yapabilirsiniz.
        </PageHeaderDescription>
      </PageHeader>
      <NewParkForm user={session?.user} customers={customers} />
    </main>
  );
}
