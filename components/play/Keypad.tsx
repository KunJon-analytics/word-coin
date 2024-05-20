import React from "react";

import { UsedKeys } from "@/types";

import Alphabets from "./Alphabets";

interface KeypadProps {
  handleClick: (alphabet: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  usedKeys: UsedKeys;
  disabled: boolean;
}

export default function Keypad({
  handleClick,
  usedKeys,
  disabled,
}: KeypadProps) {
  return (
    <div
      className="keypad"
      style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <Alphabets handleClick={handleClick} usedKeys={usedKeys} />
      <div className="action" onClick={handleClick}>
        Delete
      </div>
      <div className="action" onClick={handleClick}>
        Enter
      </div>
    </div>
  );
}
