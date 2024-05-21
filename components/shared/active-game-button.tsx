"use client";

import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { useMainButton } from "@tma.js/sdk-react";
import { useRouter } from "next/navigation";

import useActiveGame from "@/hooks/use-active-game";

import { Button } from "../ui/button";
import LoadingButton from "./loading-button";

const ActiveGameButton = () => {
  const { activeGame, isLoading } = useActiveGame();
  const router = useRouter();
  const mainButton = useMainButton(true);

  useEffect(() => {
    if (!activeGame) {
      mainButton?.setText("View Points");
    } else {
      mainButton?.setText("Play Now!!!");
    }
  }, [activeGame, mainButton]);

  useEffect(() => {
    const goToGame = () => {
      if (activeGame) {
        router.push(`/play/${activeGame.id}`);
      } else {
        router.push("/dashboard");
      }
    };
    return mainButton?.on("click", goToGame);
  }, [mainButton, activeGame, router]);

  if (isLoading) {
    return <LoadingButton />;
  }

  if (activeGame) {
    return (
      <Button asChild>
        <Link href={`/play/${activeGame.id}`}>Play Now</Link>
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link href={`/referral-task`}> Start Inviting</Link>
    </Button>
  );
};

export default ActiveGameButton;
