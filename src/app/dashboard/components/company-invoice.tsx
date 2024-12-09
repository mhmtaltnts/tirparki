import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCustomersTotalInvoice } from "@/lib/actions/invoice-action";
export async function CustomerResentInvoice() {
  const customerInvoice = await getCustomersTotalInvoice();

  return (
    <div className="space-y-8">
      {customerInvoice.map((invoice) => (
        <div key={invoice.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {invoice.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{invoice.name}</p>
          </div>
          <div className="ml-auto font-medium">
            +${invoice.totalInvoice!.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
