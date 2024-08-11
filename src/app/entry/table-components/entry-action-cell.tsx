import {
  MoreHorizontal,
  DollarSign,
  StickyNote,
  Pencil,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';

//import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { FaRegEdit } from 'react-icons/fa';

export function EntryActionCell({ row }) {
  const entry = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel className="w-full text-center">
          İşlemler
        </DropdownMenuLabel>
        <DropdownMenuItem className="w-full">
          <Link
            key={entry.id}
            href={`entry/exit?${new URLSearchParams({ id: entry.id })}`}
            className={`${buttonVariants({ variant: 'outline' })} hover:text-primary`}
          >
            <LogOut size="20px" className="mr-2" /> Çıkış
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            key={entry.id}
            href={`entry/customs?${new URLSearchParams({ id: entry.id })}`}
            className={`${buttonVariants({ variant: 'outline' })} hover:text-primary`}
          >
            <StickyNote size="20px" className="mr-2 " /> Gümrük
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            key={entry.id}
            href={`entry/edit?${new URLSearchParams({ id: entry.id })}`}
            className={`${buttonVariants({ variant: 'outline' })} hover:text-primary`}
          >
            <Pencil size="20px" className="mr-2" /> Düzenle
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            key={entry.id}
            href={`entry/invoice?${new URLSearchParams({ id: entry.id })}`}
            className={`${buttonVariants({ variant: 'outline' })} hover:text-primary`}
          >
            <DollarSign size="20px" className="mr-2 " /> Ödeme
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
