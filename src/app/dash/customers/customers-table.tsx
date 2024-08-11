'use client';
import React from 'react';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { lusitana } from '@/lib/fonts';
import SearchBar from '@/components/search-client';
import { useState } from 'react';
import { Customer } from '@/lib/types/customer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CustomersTable({
  customers,
}: {
  customers: Customer[];
}) {
  const [search, setSearch] = useState('');
  const data = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <main className="h-full flex-1 flex-col space-y-8 p-8 md:flex items-center">
      <PageHeader>
        <PageHeaderHeading>Müşterilerimiz</PageHeaderHeading>
        <PageHeaderDescription>
          Bu sayfada müşteri ekleyebilir ve düzenleyebilirsin.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link href="customers/create">Yeni Müşteri Ekle</Link>
          </Button>

          <SearchBar setSearch={setSearch} />
        </PageActions>
      </PageHeader>

      {data?.map((customer: Customer) => (
        <Card key={customer.id} className="w-full sm:max-w-[480px]  ">
          <CardHeader>
            <CardTitle>
              <p className="text-xl pt-2">{customer.name}</p>
              <p className="text-lg pb-2 text-muted">{customer.email}</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{customer.address}</p>
            <p>{customer.tel}</p>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
