import React from "react";
import { Coins } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = { gamesPlayed: number };

const GamesPlayed = ({ gamesPlayed }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Games Played</CardTitle>
        <Coins className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${gamesPlayed}</div>
        <p className="text-xs text-muted-foreground">
          Total amount of games played
        </p>
      </CardContent>
    </Card>
  );
};

export default GamesPlayed;
