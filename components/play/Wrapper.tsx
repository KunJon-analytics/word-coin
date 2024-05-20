"use client";

import { formatDistance } from "date-fns";
import { useInitData } from "@tma.js/sdk-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useGame from "@/hooks/use-game";
import { useMounted } from "@/hooks/use-mounted";

import Stage from "./Stage";
import { LoadingSkeleton } from "../shared/loading";
import PlayCard from "./play-card";
import Wordle from "./Wordle";
import PopConfetti from "../shared/pop-confetti";

type CardProps = React.ComponentProps<typeof Card> & {
  roundId: string;
};

export function Wrapper({ className, roundId, ...props }: CardProps) {
  const { game: wordleData, isLoading, isError } = useGame(roundId);
  const initData = useInitData(true);
  const mounted = useMounted();

  const winnerUsername = wordleData?.round.winner?.username;
  const winner =
    winnerUsername || wordleData?.round.winner?.firstName || "No winner";
  const isCorrect = wordleData?.guesses.find((guess) => guess.isCorrect);
  const isWinner =
    winnerUsername && winnerUsername === initData?.user?.username;

  if (!initData || !mounted) {
    return (
      <PlayCard cardTitle="Error" message="Please load this app on telegram." />
    );
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <PlayCard
        cardTitle="Error"
        message="There was an error while fetching the data"
      />
    );
  }

  if (!wordleData) {
    return <PlayCard cardTitle="Error" message="No game exists" />;
  }

  return (
    <Card className={(cn(className), "col-span-12 pb-4")} {...props}>
      <CardHeader className="lg:mt-3 flex items-center justify-between px-4 sm:px-5">
        <div className="flex items-center space-x-4">
          <Stage
            stage={wordleData.round.stage}
            players={wordleData.round._count.attempts}
            attempts={wordleData.guesses.length}
            start={formatDistance(wordleData.createdAt, new Date(), {
              addSuffix: true,
            })}
            winner={winner}
          />
        </div>
      </CardHeader>
      <CardContent className="lg:mt-3 grid grid-cols-12">
        <div className="col-span-12 sm:col-span-6 lg:col-span-8">
          <Wordle wordleData={wordleData} />
        </div>
        {isCorrect && <PopConfetti isWinner={!!isWinner} />}
      </CardContent>
    </Card>
  );
}
