"use client";

import { useRouter } from "next/navigation";
import { useInitData, useMiniApp } from "@tma.js/sdk-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ErrorButton from "@/components/shared/error-button";
import { useMounted } from "@/hooks/use-mounted";
import { ssrStub } from "@/lib/constants";
import { Icons } from "@/components/shared/icons";

import UserAvatar from "./user-avatar";

export function UserNav() {
  const initData = useInitData({ ssr: {} });
  const mounted = useMounted();
  const miniApp = useMiniApp({ ssr: ssrStub });
  const router = useRouter();

  if (!initData?.user || !mounted) {
    return <ErrorButton buttonText="No Telegram" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{`${initData.user.firstName}`}</p>
            <p className="text-xs leading-none text-muted-foreground">
              @{initData.user?.username}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/")}>
            <Icons.home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            <Icons.dashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/play")}>
            <Icons.play className="mr-2 h-4 w-4" />
            <span>Play</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => miniApp.close()}>
          Close
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
