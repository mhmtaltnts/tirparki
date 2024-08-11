'use client';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function SideLink({ link, children }) {
  const pathName = usePathname();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            key={link.title}
            href={link.href}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
              {
                'brightness-150': pathName === link.href,
              }
            )}
          >
            {children}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{link.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
