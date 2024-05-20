"use client";

import React from "react";

import { GameReturnType } from "@/types";
import useWordle from "@/hooks/use-wordle";

// components
import Grid from "./Grid";
import Keypad from "./Keypad";

interface Props {
  wordleData: GameReturnType;
}

export default function Wordle({ wordleData }: Props) {
  const {
    currentGuess,
    guesses,
    turn,
    handleClick,
    usedKeys,
    playLoading: loading,
  } = useWordle(wordleData);
  const correctGuess = wordleData.guesses.find((guess) => guess.isCorrect);
  const disabled = correctGuess || turn > 5 || loading;
  return (
    <section className="wordle" id="wordle">
      <div className="wordle-bx lg:mt-4">
        <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
        <Keypad
          disabled={!!disabled}
          handleClick={handleClick}
          usedKeys={usedKeys}
        />
      </div>
    </section>
  );
}
