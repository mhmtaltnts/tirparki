'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

const MainLink = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center text-sm font-medium text-muted-foreground',
        {
          'underline underline-offset-4 brightness-150 rounded-md p-2':
            pathName.split('/')[1] === item.href.split('/')[1],
        }
      )}
    >
      {item.title}
    </Link>
  );
};

export default MainLink;
