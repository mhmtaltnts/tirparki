import {
  Calendar,
  Inbox,
  ArrowsUpFromLine,
  Settings,
  Users,
  FileInput,
  FileOutput,
  Truck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserNav } from "./user-nav";
import { handleLogout } from "@/lib/actions/auth-actions";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { SiteLogo } from "./site-logo";
import { ThemeToggle } from "./theme-toggle";
import { User } from "@prisma/client";

// Menu items.
const items = [
  {
    title: "Tüm Kullanıcılar",
    url: "/dashboard/users",
    icon: Users,
    roles: ["MANAGER", "ADMIN"],
  },
  {
    title: "Araç Girişi",
    url: "/dashboard/entry/new",
    icon: FileInput,
    roles: ["MANAGER", "EMPLOYEE", "ADMIN"],
  },
  {
    title: "Araç Çıkışı",
    url: "/dashboard/entry",
    icon: FileOutput,
    roles: ["MANAGER", "EMPLOYEE", "ADMIN"],
  },
  {
    title: "Çıkan Araçlar",
    url: "/dashboard/departed",
    icon: ArrowsUpFromLine,
    roles: ["MANAGER", "EMPLOYEE", "ADMIN"],
  },
  {
    title: "Parktaki Araçlar",
    url: "/dashboard/park",
    icon: Truck,
    roles: ["MANAGER", "EMPLOYEE", "ADMIN", "USER"],
  },
  {
    title: "Park Girişlerim",
    url: "/dashboard/profile/billing",
    icon: Settings,
    roles: ["USER"],
  },
];

export async function AppSidebar() {
  const session = await auth();
  return (
    <Sidebar>
      <SidebarHeader>
        <SiteLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Park İşlemleri</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(
                (item) =>
                  item.roles.includes(session?.user?.role as string) && (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-row justify-between">
        <ThemeToggle />
        <UserNav user={session?.user as User} handleLogout={handleLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
