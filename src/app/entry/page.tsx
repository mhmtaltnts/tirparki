import { columns } from './table-components/columns';
import { getInPark } from '@/lib/data/entry-data';
import { DataTable } from './table-components/data-table';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { Tractor, Caravan, ContactRound } from 'lucide-react';

import { TLSign } from '@/components/svg-icons/money';

export default async function EntryPage() {
  const data = await getInPark();
  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="w-full px-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:hidden">
        {Array.isArray(data) &&
          data.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center">
                  <Caravan className="w-6 h-6 mr-2" />
                  <CardTitle>{item.trailer}</CardTitle>
                </div>
              </CardHeader>
              <Separator className="mb-4" />
              <CardContent>
                <div className="flex items-center">
                  <Tractor className="w-4 h-4" />
                  <p className="ml-2">{item.truck}</p>
                </div>
                <div className="flex items-center mt-2 gap-2 ">
                  <TLSign className="w-4 h-4" />
                  <p>{item.invoice.status}</p>
                </div>
                <div className="flex items-center mt-2">
                  <ContactRound className="w-4 h-4 mr-2" />
                  <p className="text-muted">{item.customer?.name}</p>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button asChild size="sm" variant="secondary">
                  <Link
                    href={`entry/customs?id=${item.id}`}
                    className="font-extralight text-xs"
                  >
                    Gümrük
                  </Link>
                </Button>
                <Button asChild size="sm" variant="destructive">
                  <Link
                    href={`entry/exit?id=${item.id}`}
                    className="font-extralight text-xs"
                  >
                    Çıkış
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link
                    href={`entry/edit?id=${item.id}`}
                    className="font-extralight text-xs"
                  >
                    Güncelle
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link
                    href={`entry/invoice?id=${item.id}`}
                    className="font-extralight text-xs"
                  >
                    Ödeme
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>

      <DataTable data={data} columns={columns} />
    </main>
  );
}
