import React from "react";
import { HandCoins } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = { unclaimedTokens: number };

const UnclaimedTokens = ({ unclaimedTokens }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Unclaimed Tokens</CardTitle>
        <HandCoins className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{unclaimedTokens}</div>
        <p className="text-xs text-muted-foreground">
          Tokens you are eligible to claim (coming soon)
        </p>
      </CardContent>
    </Card>
  );
};

export default UnclaimedTokens;
