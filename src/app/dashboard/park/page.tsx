import { columns } from "./table-components/columns";
import { getInPark } from "@/lib/data/park-data";
import { DataTable } from "./table-components/data-table";
import Mybreadcrub from "@/components/my-breadcrub";

export default async function ParkPage() {
  const data = await getInPark();
  console.log(data);

  return (
    <main className="mx-auto flex h-full flex-col py-10 md:px-6">
      <DataTable data={data} columns={columns} />
    </main>
  );
}
