import UpdateUserForm from './update-user-form';
import { getUser } from '@/lib/data/user-data';

import React from 'react';

export default async function EditUserPage({ searchParams }) {
  const id = searchParams?.id;

  const user = await getUser(id);
  return (
    <div>
      <UpdateUserForm user={user} />
    </div>
  );
}
