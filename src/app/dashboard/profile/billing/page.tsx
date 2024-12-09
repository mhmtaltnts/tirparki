import { auth } from "@/app/api/auth/[...nextauth]/auth";
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
import { getBilling } from "@/lib/data/billing";
import { formatDateToLocal } from "@/lib/utils";

export default async function BillingPage() {
  const session = await auth();
  const data = await getBilling(session?.user.id);
  return (
    <main className="mx-auto flex h-full flex-col items-center py-10 md:px-6">
      <PageHeader>
        <PageHeaderHeading>Park Giriş ve Çıkışlarınız</PageHeaderHeading>
        <PageHeaderDescription>
          Bu sayfadan park giriş ve çıkışları ve ödemelerinizi
          görüntüleyebilirsiniz.
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.length > 0 ? (
          data?.map((item, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.trailer}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Giriş Tarihi:{" "}
                    {formatDateToLocal(
                      item.createdAt.toLocaleString(),
                      "tr-TR",
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Çıkış Tarihi:{" "}
                    {item.exit?.createdAt
                      ? formatDateToLocal(
                          item.exit?.createdAt.toLocaleString(),
                          "tr-TR",
                        )
                      : ""}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-start justify-start">
                  <p className="text-sm text-muted-foreground">
                    Ödeme Durumu: {item.invoice?.status}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Miktar:{""} {item.invoice?.amount}
                  </p>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p>Parka girişiniz bulunmamaktadır.</p>
        )}
      </div>
    </main>
  );
}
