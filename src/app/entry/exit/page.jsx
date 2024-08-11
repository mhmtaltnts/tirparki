import ExitForm from './exit-form';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
export default async function ExitPage({ searchParams }) {
  const id = searchParams?.id;
  const session = await auth();

  return (
    <main className="h-full flex-1 flex-col p-2 lg:p-6 md:flex items-center">
      <PageHeader>
        <PageHeaderHeading>Çıkış İşlemi</PageHeaderHeading>
        <PageHeaderDescription>
          Bu sayfadan aracın çıkış çıkış yapabilirsiniz.
        </PageHeaderDescription>
      </PageHeader>
      <ExitForm userId={session?.user.id} entryId={id} />
    </main>
  );
}
