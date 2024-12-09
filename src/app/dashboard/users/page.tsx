import { DataTable } from "@/app/dashboard/users/users-component/user-data-table";
import { columns } from "@/app/dashboard/users/users-component/user-columns";
import { getUsers } from "@/lib/data/user-data";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <section className="ml-4 flex flex-1 flex-col p-4 px-4 md:p-6">
      <DataTable data={users} columns={columns} />
    </section>
  );
}
