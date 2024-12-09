import { ThemeToggle } from "./theme-toggle";
import { SiteLogo } from "./site-logo";
import MainNav from "./main-nav/main-nav";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import MainLink from "./main-nav/mainLink";
import { UserNav } from "./user-nav";
import { handleLogout } from "@/lib/actions/auth-actions";

export async function SiteHeader() {
  const session = await auth();
  //console.log(session.user);
  return (
    <header>
      <div className="flex h-16 items-center justify-between">
        <SiteLogo />
        <MainNav user={session?.user} />
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {session?.user ? (
              <UserNav user={session?.user} handleLogout={handleLogout} />
            ) : (
              <MainLink item={{ title: "Giriş", href: "/login" }} />
            )}

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
