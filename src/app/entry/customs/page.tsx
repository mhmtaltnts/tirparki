import CreateCustomsForm from './create-customs-form';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';

export default async function CustomPage({ searchParams }) {
  const id = searchParams?.id;
  const session = await auth();

  return (
    <main className="h-full flex-1 flex-col p-2 lg:p-6 md:flex items-center">
      <PageHeader>
        <PageHeaderHeading>Gümrük İşlemi</PageHeaderHeading>
        <PageHeaderDescription>
          Bu sayfadan aracın gümrük girişini yapabilirsiniz.
        </PageHeaderDescription>
      </PageHeader>
      <CreateCustomsForm userId={session?.user.id} entryId={id} />{' '}
    </main>
  );
}
