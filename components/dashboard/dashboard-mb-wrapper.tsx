"use client";

import React from "react";

import useActiveGame from "@/hooks/use-active-game";
import { useRouter } from "next/navigation";

import SignInMainButton from "../twa/sign-in-main-button";

const DashboardMbWrapper = () => {
  const { activeGame } = useActiveGame();
  const router = useRouter();

  const pageAction = () => {
    if (!activeGame) {
      return router.push("/referral-task");
    }
    return router.push(`/play/${activeGame.id}`);
  };

  return (
    <SignInMainButton
      pageAction={pageAction}
      pageActionText={!activeGame ? "Start Inviting!!!" : "Play Now!!!"}
    />
  );
};

export default DashboardMbWrapper;
