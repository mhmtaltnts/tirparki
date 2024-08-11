import { columns } from './table-components/columns';
import { getInPark } from '@/lib/data/park-data';
import { DataTable } from './table-components/data-table';

export default async function ParkPage() {
  const data = await getInPark();

  return (
    <main className="flex flex-col mx-auto py-10 md:px-6 h-full">
      <DataTable data={data} columns={columns} />
    </main>
  );
}
