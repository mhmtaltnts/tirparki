import UpdateUserForm from "@/app/dashboard/users/update/update-user-form";
import { getUser } from "@/lib/data/user-data";
import { Modal } from "@/components/modal";

export default async function UpdateUserPage({ searchParams }) {
  const id = searchParams?.id;

  const user = await getUser(id);

  return (
    <>
      {user?.id ? (
        <Modal>
          <div className="max-w-md space-y-2 p-8">
            <h1 className="p-8 text-center text-2xl">
              {user.name}&#39;nin kullancının rolünü değiştir
            </h1>
            <UpdateUserForm user={user} />
          </div>
        </Modal>
      ) : (
        <Modal>
          <div className="max-w-md space-y-2 p-8">
            <h1 className="text-2xl">Bu Id numaralı kullanıcı yok</h1>
          </div>
        </Modal>
      )}
    </>
  );
}
