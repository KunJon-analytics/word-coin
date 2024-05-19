"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Icons } from "../shared/icons";

type Props = { roundsWon: number };

const RoundsWon = ({ roundsWon }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Rounds Won</CardTitle>
        <Icons.medal className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{roundsWon}</div>
        <p className="text-xs text-muted-foreground">
          Your total number of game rounds won
        </p>
      </CardContent>
    </Card>
  );
};

export default RoundsWon;
