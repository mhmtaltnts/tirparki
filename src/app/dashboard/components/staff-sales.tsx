import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getStaffSales } from "@/lib/actions/invoice-action";
export async function StaffSales() {
  const staffSales = await getStaffSales();

  return (
    <div className="space-y-8">
      {staffSales.map((staff) => (
        <div key={staff.registrar.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={staff.registrar.image || ""} alt="Avatar" />
            <AvatarFallback>
              {staff.registrar.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {staff.registrar.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {staff.registrar.email}
            </p>
          </div>
          <div className="ml-auto font-medium">
            +${staff.amount!.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
