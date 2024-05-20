import { useMainButton } from "@tma.js/sdk-react";
import React, { useEffect } from "react";

type MainButtonManipulatorProps = {
  action: () => void;
  showMb?: boolean;
  buttonText: string;
};

const MainButtonManipulator = ({
  action,
  showMb,
  buttonText,
}: MainButtonManipulatorProps) => {
  const mb = useMainButton(true);
  const mbAction = () => {
    action();
    mb?.hide();
  };

  useEffect(() => {
    if (showMb) {
      mb?.show();
      mb?.setText(buttonText);
    }
  }, [showMb, mb]);

  useEffect(() => mb?.on("click", mbAction), [mb, mbAction]);

  return null;
};

export default MainButtonManipulator;
