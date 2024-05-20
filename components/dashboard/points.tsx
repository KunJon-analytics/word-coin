import React from "react";

import { siteConfig } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Icons } from "../shared/icons";

type Props = { points: number };

const Points = ({ points }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {siteConfig.name} Points
        </CardTitle>
        <Icons.coins className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{points}</div>
        <p className="text-xs text-muted-foreground">Total points you have</p>
      </CardContent>
    </Card>
  );
};

export default Points;
