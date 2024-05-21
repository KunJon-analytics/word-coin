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

  const goToGame = useCallback(() => {
    if (activeGame) {
      router.push(`/play/${activeGame.id}`);
    } else {
      router.push("/dashboard");
    }
  }, [activeGame]);

  useEffect(() => {
    if (!activeGame) {
      mainButton?.setText("View Points");
    } else {
      mainButton?.setText("Play Now!!!");
    }
  }, [activeGame, mainButton]);

  useEffect(() => mainButton?.on("click", goToGame), [mainButton, goToGame]);

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
