import { getOutOfPark } from "@/lib/data/departed-data";
import { columns } from "./table-components/columns";
import { DataTable } from "./table-components/data-table";

export default async function departedPage() {
  const data = await getOutOfPark();
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
