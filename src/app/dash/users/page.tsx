import { DataTable } from '@/app/dash/users/users-component/user-data-table';
import { columns } from '@/app/dash/users/users-component/user-columns';
import { getUsers } from '@/lib/data/user-data';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <section className="flex flex-1 flex-col p-4 md:p-6 ml-4 px-4">
      <DataTable data={users} columns={columns} />
    </section>
  );
}
