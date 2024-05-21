"use client";

import Link from "next/link";
import { useMiniApp } from "@tma.js/sdk-react";

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
import { Icons } from "@/components/shared/icons";
import useUser from "@/hooks/use-user";
import LoadingButton from "@/components/shared/loading-button";
import { SignInModal } from "@/components/shared/sign-in-modal";

import UserAvatar from "./user-avatar";

export function UserNav() {
  const { isLoading, user } = useUser();
  const mounted = useMounted();
  const miniApp = useMiniApp(true);

  if (!miniApp || !mounted) {
    return <ErrorButton buttonText="No Telegram" />;
  }

  if (isLoading) {
    return <LoadingButton />;
  }

  if (!user) {
    return <SignInModal />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{`${user.firstName}`}</p>
            <p className="text-xs leading-none text-muted-foreground">
              points: {user.points}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/"}>
              <Icons.home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/dashboard"}>
              <Icons.dashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/referral-task"}>
              <Icons.users className="mr-2 h-4 w-4" />
              <span>Referrals</span>
            </Link>
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
