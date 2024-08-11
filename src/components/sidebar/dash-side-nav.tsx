import Link from 'next/link';
import SideLink from './side-link';

import {
  FileInput,
  Truck,
  Users,
  UserPlus,
  FileOutput,
  Boxes,
} from 'lucide-react';

import { auth } from '@/app/api/auth/[...nextauth]/auth';

import { handleLogout } from '@/lib/actions/auth-actions';

const links = [
  {
    title: 'Tüm Kullanıcılar',
    href: '/dash/users',
    icon: <Users className="h-5 w-5" />,
    roles: ['MANAGER'],
  },

  {
    title: 'Yeni Araç Girişi',
    href: '/entry/new',
    icon: <FileInput className="h-5 w-5" />,
    roles: ['MANAGER', 'EMPLOYEE'],
  },

  {
    title: 'Parkta Araçlar',
    href: '/park',
    icon: <Truck className="h-5 w-5" />,
    roles: ['MANAGER', 'EMPLOYEE', 'OFFICIAL'],
  },
  {
    title: 'Çıkan Araçlar',
    href: '/dash/departed',
    icon: <FileOutput className="h-5 w-5" />,
    roles: ['MANAGER'],
  },
  {
    title: 'Müşteriler',
    href: '/dash/customers',
    icon: <Boxes className="h-5 w-5" />,
    roles: ['MANAGER'],
  },
];
const DashSideNav = async () => {
  const session = await auth();
  return (
    <aside className="fixed inset-x-0 md:inset-y-0 bottom-0 justify-center md:justify-start md:left-0 md:pt-6 md:top-[64px] z-10 w-full md:w-14 md:flex-col border-t md:border-r bg-background flex flex-row ">
      <div className="flex md:flex-col items-center gap-4 px-2 ">
        {links.map(
          (link) =>
            link.roles.includes(session?.user?.role) && (
              <SideLink link={link} key={link.title}>
                {link.icon}
              </SideLink>
            )
        )}
      </div>
    </aside>
  );
};

export default DashSideNav;
