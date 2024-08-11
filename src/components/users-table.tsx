'use client';

import { deleteUser } from '@/lib/actions/user-actions';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export function UsersTable({ users }) {
  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserRow key={user._id} user={user} />
            ))}
          </TableBody>
        </Table>
      </form>
    </>
  );
}

function UserRow({ user }) {
  const userId = user._id;
  const deleteUserWithId = deleteUser.bind(null, userId);

  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={deleteUserWithId}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
