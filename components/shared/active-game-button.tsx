"use client";

import React from "react";
import { useRouter } from "next/navigation";

import useActiveGame from "@/hooks/use-active-game";

import { Button } from "../ui/button";
import LoadingButton from "./loading-button";

const ActiveGameButton = () => {
  const { activeGame, isLoading } = useActiveGame();
  const router = useRouter();

  if (isLoading) {
    return <LoadingButton />;
  }

  if (activeGame) {
    return (
      <Button onClick={() => router.push(`/play/${activeGame.id}`)}>
        Play Now
      </Button>
    );
  }

  return (
    <Button onClick={() => router.push(`/referral-task`)}>
      Start Inviting
    </Button>
  );
};

export default ActiveGameButton;
