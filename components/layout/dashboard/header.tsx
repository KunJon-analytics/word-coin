import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { GsapLink } from "@/components/shared/gsap-link";

import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";

export default async function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <GsapLink href={"/"}>
            <Icons.logo className="mr-2 h-6 w-6" />
          </GsapLink>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
