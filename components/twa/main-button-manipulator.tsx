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

  useEffect(() => {
    if (showMb) {
      mb?.show();
      mb?.setText(buttonText);
    }
    return () => {
      mb?.hide();
    };
  }, [showMb, mb]);

  useEffect(() => mb?.on("click", action), [mb, action]);

  return null;
};

export default MainButtonManipulator;
