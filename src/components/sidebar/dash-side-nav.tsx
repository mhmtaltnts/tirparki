import Link from "next/link";
import SideLink from "./side-link";

import {
  FileInput,
  Truck,
  Users,
  UserPlus,
  FileOutput,
  Boxes,
} from "lucide-react";

import { auth } from "@/app/api/auth/[...nextauth]/auth";

import { handleLogout } from "@/lib/actions/auth-actions";
import Money from "../svg-icons/money";

const links = [
  {
    title: "Tüm Kullanıcılar",
    href: "/dashboard/users",
    icon: <Users className="h-5 w-5" />,
    roles: ["MANAGER", "ADMIN"],
  },

  {
    title: "Yeni Araç Girişi",
    href: "/entry/new",
    icon: <FileInput className="h-5 w-5" />,
    roles: ["MANAGER", "EMPLOYEE", "ADMIN"],
  },

  {
    title: "Parkta Araçlar",
    href: "/park",
    icon: <Truck className="h-5 w-5" />,
    roles: ["MANAGER", "EMPLOYEE", "OFFICIAL", "ADMIN", "USER"],
  },
  {
    title: "Çıkan Araçlar",
    href: "/dashboard/departed",
    icon: <FileOutput className="h-5 w-5" />,
    roles: ["MANAGER", "ADMIN"],
  },
];
const DashSideNav = async () => {
  const session = await auth();
  return (
    <aside className="fixed inset-x-0 bottom-0 z-10 flex w-full flex-row justify-center border-t bg-background md:inset-y-0 md:left-0 md:top-[64px] md:w-14 md:flex-col md:justify-start md:border-r md:pt-6">
      <div className="flex items-center gap-4 px-2 md:flex-col">
        {links.map(
          (link) =>
            link.roles.includes(session?.user?.role as string) && (
              <SideLink link={link} key={link.title}>
                {link.icon}
              </SideLink>
            ),
        )}
      </div>
    </aside>
  );
};

export default DashSideNav;
