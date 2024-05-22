"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMainButton } from "@tma.js/sdk-react";

const PlayMainButton = () => {
  const { push } = useRouter();
  const mainButton = useMainButton(true);

  useEffect(() => {
    if (mainButton) {
      mainButton.setParams({ text: "How To Play?" });
      return mainButton.on("click", () => push("/about/how-to-play"));
    }
  }, [mainButton, push]);

  return null;
};

export default PlayMainButton;
