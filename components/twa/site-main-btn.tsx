"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainButtonEventListener, useMainButton } from "@tma.js/sdk-react";

import useActiveGame from "@/hooks/use-active-game";

type SiteMainBtnProps = { buttonText: string; buttonLink: `/${string}` };

const SiteMainBtn = ({ buttonText, buttonLink }: SiteMainBtnProps) => {
  const { activeGame } = useActiveGame();
  const router = useRouter();
  const mainButton = useMainButton(true);

  const goToGame: MainButtonEventListener<"click"> = () => {
    if (activeGame) {
      router.push(`/play/${activeGame.id}`);
    } else {
      router.push(buttonLink);
    }
  };

  useEffect(() => {
    if (activeGame) {
      mainButton?.setParams({ text: "Play Now!!!" });
    } else {
      mainButton?.setParams({ text: buttonText });
    }

    return mainButton?.on("click", goToGame);
  }, [activeGame, mainButton]);

  return null;
};

export default SiteMainBtn;
