import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaRegEdit } from 'react-icons/fa';

import Link from 'next/link';

export function UserEditActionCell({ row }) {
  const user = row.original;
  return (
    <Link
      key={user.id}
      href={`users/update?${new URLSearchParams({ id: user.id })}`}
      className="w-full flex items-center justify-center  hover:text-green-400 text-green-600"
    >
      <FaRegEdit size="20px" />
    </Link>
  );
}
