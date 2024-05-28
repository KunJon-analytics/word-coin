"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMainButton } from "@tma.js/sdk-react";

import useActiveGame from "@/hooks/use-active-game";
import useUser from "@/hooks/use-user";

type SiteMainBtnProps = { buttonText: string; buttonLink: `/${string}` };

const SiteMainBtn = ({ buttonText, buttonLink }: SiteMainBtnProps) => {
  const { activeGame } = useActiveGame();
  const { user } = useUser();
  const { push } = useRouter();
  const mainButton = useMainButton(true);

  const goToGame = useCallback(() => {
    if (activeGame?.id && !!user?.id) {
      push(`/play/${activeGame.id}`);
    } else {
      push(buttonLink);
    }
  }, [activeGame?.id, user?.id, buttonLink, push]);

  useEffect(() => {
    if (activeGame?.id && !!user?.id) {
      mainButton?.setParams({ text: "Play Now!!!" });
    } else {
      mainButton?.setParams({ text: buttonText });
    }

    return mainButton?.on("click", goToGame);
  }, [activeGame?.id, user?.id, mainButton, buttonText, goToGame]);

  return null;
};

export default SiteMainBtn;
