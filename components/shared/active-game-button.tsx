"use client";

import React from "react";

import useActiveGame from "@/hooks/use-active-game";

import { Button } from "../ui/button";
import LoadingButton from "./loading-button";
import { GsapLink } from "./gsap-link";

const ActiveGameButton = () => {
  const { activeGame, isLoading } = useActiveGame();

  if (isLoading) {
    return <LoadingButton />;
  }

  if (activeGame) {
    return (
      <Button asChild>
        <GsapLink href={`/play/${activeGame.id}`}>Play Now</GsapLink>
      </Button>
    );
  }

  return (
    <Button asChild>
      <GsapLink href={`/referral-task`}> Start Inviting</GsapLink>
    </Button>
  );
};

export default ActiveGameButton;
