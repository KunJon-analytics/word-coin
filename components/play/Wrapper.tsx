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

type CardProps = React.ComponentProps<typeof Card> & {
  roundId: string;
};

export function Wrapper({ className, roundId, ...props }: CardProps) {
  const { game: wordleData, isLoading, isError } = useGame(roundId);
  const initData = useInitData(true);
  const mounted = useMounted();
  const winner =
    wordleData?.round.winner?.username ||
    wordleData?.round.winner?.firstName ||
    "No winner";

  if (!initData || !mounted) {
    return (
      <PlayCard
        cardTitle="Error"
        message="There was an error while fetching the data"
      />
    );
  }

  if (isLoading || !mounted) {
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
      <CardHeader className="mt-3 flex items-center justify-between px-4 sm:px-5">
        <h2 className="font-medium tracking-wide">Word Rush</h2>

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
      <CardContent className="mt-3 grid grid-cols-12">
        <div className="col-span-12 sm:col-span-6 lg:col-span-8">
          <Wordle wordleData={wordleData} />
        </div>
      </CardContent>
    </Card>
  );
}
