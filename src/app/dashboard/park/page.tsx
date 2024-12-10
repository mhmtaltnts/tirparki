import { columns } from "./table-components/columns";
import { getInPark } from "@/lib/data/park-data";
import { DataTable } from "./table-components/data-table";
import Mybreadcrub from "@/components/my-breadcrub";

export default async function ParkPage() {
  const data = await getInPark();
  if (Array.isArray(data) && data.length !== 0) {
    return (
      <main className="flex min-h-screen p-2">
        <DataTable data={data} columns={columns} />
      </main>
    );
  } else {
    return (
      <main className="flex min-h-screen p-2">
        <p className="text-center text-2xl font-bold">Departed List is Empty</p>
      </main>
    );
  }
}
