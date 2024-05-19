"use client";

import React from "react";
import { useInitData } from "@tma.js/sdk-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = () => {
  const initData = useInitData();

  return (
    <Avatar className="relative h-8 w-8 rounded-full">
      <AvatarImage
        src={initData?.user?.photoUrl}
        alt={initData?.user?.firstName}
      />
      <AvatarFallback>
        {initData?.user?.firstName.substring(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
