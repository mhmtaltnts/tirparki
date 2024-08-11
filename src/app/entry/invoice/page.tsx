import React from 'react';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { InvoiceForm } from './invoice-form';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getInvoice } from '@/lib/data/invoice-data';
export default async function invoicePage({ searchParams }) {
  const id = searchParams.id;
  const invoice = await getInvoice(id);
  const session = await auth();
  return (
    <main className="h-full flex-1 flex-col p-2 lg:p-6 md:flex items-center">
      <PageHeader>
        <PageHeaderHeading>Park Ödeme</PageHeaderHeading>
        <PageHeaderDescription>
          Bu sayfadan araçların park ödeme girişini yapabilirsiniz.
        </PageHeaderDescription>
      </PageHeader>
      <InvoiceForm entryId={id} userId={session.user.id} invoice={invoice} />
    </main>
  );
}
