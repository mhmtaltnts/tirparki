import { getOutOfPark } from '@/lib/data/departed-data';
import { columns } from './table-components/columns';
import { DataTable } from './table-components/data-table';

export default async function departedPage() {
  const data = await getOutOfPark();
  return (
    <main className="flex min-h-screen p-2">
      <DataTable data={data} columns={columns} />
    </main>
  );
}
