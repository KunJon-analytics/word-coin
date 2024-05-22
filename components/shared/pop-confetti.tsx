"use client";

import { useHapticFeedback, useViewport } from "@tma.js/sdk-react";
import React, { useEffect } from "react";
import Confetti from "react-confetti";

type PopConfettiProps = { isWinner?: boolean };

const PopConfetti = ({ isWinner }: PopConfettiProps) => {
  const viewPort = useViewport(true);
  const hapticFeedback = useHapticFeedback(true);

  useEffect(() => {
    if (hapticFeedback) {
      hapticFeedback.notificationOccurred("success");
    }
  }, [hapticFeedback]);

  if (!viewPort || !hapticFeedback) {
    return null;
  }

  return (
    <Confetti
      width={viewPort.width}
      height={viewPort.height}
      numberOfPieces={isWinner ? 200 : 50}
    />
  );
};

export default PopConfetti;
