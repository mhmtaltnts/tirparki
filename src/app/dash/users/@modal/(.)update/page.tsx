import UpdateUserForm from '@/app/dash/users/update/update-user-form';
import { getUser } from '@/lib/data/user-data';
import { Modal } from '@/components/modal';

export default async function UpdateUserPage({ searchParams }) {
  const id = searchParams?.id;

  const user = await getUser(id);

  return (
    <>
      {user?.id ? (
        <Modal>
          <div className="p-8 max-w-md space-y-2">
            <h1 className="text-2xl text-center p-8">
              {user.name}&#39;nin kullancının rolünü değiştir
            </h1>
            <UpdateUserForm user={user} />
          </div>
        </Modal>
      ) : (
        <Modal>
          <div className="p-8 max-w-md space-y-2">
            <h1 className="text-2xl">Bu Id numaralı kullanıcı yok</h1>
          </div>
        </Modal>
      )}
    </>
  );
}
