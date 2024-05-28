"use client";

import React from "react";
import Link from "next/link";

import useActiveGame from "@/hooks/use-active-game";
import useUser from "@/hooks/use-user";

import { Button } from "../ui/button";
import LoadingButton from "./loading-button";

const ActiveGameButton = () => {
  const { activeGame, isLoading } = useActiveGame();
  const { user, isLoading: userLoading } = useUser();

  if (isLoading || userLoading) {
    return <LoadingButton />;
  }

  if (activeGame && user) {
    return (
      <Button asChild>
        <Link href={`/play/${activeGame.id}`}>Play Now</Link>
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link href={`/dashboard`}> View Points</Link>
    </Button>
  );
};

export default ActiveGameButton;
