import { columns } from "./table-components/columns";
import { getInPark } from "@/lib/data/entry-data";
import { DataTable } from "./table-components/data-table";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Tractor, Caravan, ContactRound } from "lucide-react";

import { TLSign } from "@/components/svg-icons/money";

export default async function EntryPage() {
  const data = await getInPark();
  if (Array.isArray(data) && data.length !== 0) {
    return (
      <main className="flex min-h-screen flex-col items-center p-2">
        <div className="grid w-full grid-cols-1 gap-2 px-2 sm:grid-cols-2 md:hidden md:grid-cols-3">
          {Array.isArray(data) ? (
            data.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-center">
                    <Caravan className="mr-2 h-6 w-6" />
                    <CardTitle>{item.trailer}</CardTitle>
                  </div>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent>
                  <div className="flex items-center">
                    <Tractor className="h-4 w-4" />
                    <p className="ml-2">{item.truck}</p>
                  </div>

                  <div className="mt-2 flex items-center">
                    <ContactRound className="mr-2 h-4 w-4" />
                    <p className="text-muted">{item.customer?.name}</p>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button asChild size="sm" variant="secondary">
                    <Link
                      href={`entry/customs?id=${item.id}`}
                      className="text-xs font-extralight"
                    >
                      Gümrük
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="destructive">
                    <Link
                      href={`entry/exit?id=${item.id}`}
                      className="text-xs font-extralight"
                    >
                      Çıkış
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={`entry/edit?id=${item.id}`}
                      className="text-xs font-extralight"
                    >
                      Güncelle
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={`entry/invoice?id=${item.id}`}
                      className="text-xs font-extralight"
                    >
                      Ödeme
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center md:hidden">Veri yok</div>
          )}
        </div>

        <DataTable data={data} columns={columns} />
      </main>
    );
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center p-2">
        <div className="text-center">Veri yok</div>
      </main>
    );
  }
}
