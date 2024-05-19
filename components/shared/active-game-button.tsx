"use client";

import React from "react";
import { useRouter } from "next/navigation";

import useActiveGame from "@/hooks/use-active-game";

import { Button } from "../ui/button";
import LoadingButton from "./loading-button";
import ErrorButton from "./error-button";

const ActiveGameButton = () => {
  const { activeGame, isError, isLoading } = useActiveGame();
  const router = useRouter();

  if (isLoading) {
    return <LoadingButton />;
  }
  if (isError) {
    return <ErrorButton buttonText="Bad Request" />;
  }

  if (!activeGame) {
    return <ErrorButton buttonText="No Active Game" />;
  }
  return (
    <Button onClick={() => router.push(`/play/${activeGame.id}`)}>
      Play Now
    </Button>
  );
};

export default ActiveGameButton;
