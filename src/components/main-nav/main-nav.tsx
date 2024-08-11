'use client';

import MainLink from './mainLink';
import { Menu } from 'lucide-react';
import { siteConfig } from '@/config/site';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

const privateNav = [
  {
    title: 'Panel',
    href: '/dash',
    roles: ['MANAGER', 'EMPLOYEE', 'OFFICIAL'],
  },
  {
    title: 'Park',
    href: '/park',
    roles: ['MANAGER', 'EMPLOYEE', 'OFFICIAL', 'USER'],
  },
  {
    title: 'Park Girişi',
    href: '/entry',
    roles: ['MANAGER', 'EMPLOYEE', 'OFFICIAL'],
  },
];
export default function MainNav({ user }) {
  return (
    <>
      <div className="hidden md:flex items-center justify-between gap-6">
        {siteConfig.mainNav.map((link) => (
          <MainLink item={link} key={link.title} />
        ))}
        {privateNav.map(
          (link) =>
            link.roles.includes(user?.role) && (
              <MainLink
                key={link.title}
                item={{ title: link.title, href: link.href }}
              />
            )
        )}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="h-6 md:hidden w-6" />
        </SheetTrigger>

        <SheetContent>
          <SheetTitle className="mb-6">Menü</SheetTitle>
          <SheetDescription></SheetDescription>
          <div className="flex flex-col gap-3">
            {siteConfig.mainNav.map((link) => (
              <MainLink
                key={link.title}
                item={{ title: link.title, href: link.href }}
              />
            ))}
            {privateNav.map(
              (link) =>
                link.roles.includes(user?.role) && (
                  <MainLink
                    key={link.title}
                    item={{ title: link.title, href: link.href }}
                  />
                )
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
