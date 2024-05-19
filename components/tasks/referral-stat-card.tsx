import React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "../ui/progress";

type Props = { title: string; stat: number; target: number };

const ReferralStatCard = ({ stat, target, title }: Props) => {
  const progress = Math.round((stat * 100) / target);

  return (
    <Card x-chunk={`dashboard-referral-${title}`}>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{stat}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{`level 1 is ${progress}% completed`}</div>
      </CardContent>
      <CardFooter>
        <Progress
          value={progress}
          aria-label={`level 1 is ${progress}% completed`}
        />
      </CardFooter>
    </Card>
  );
};

export default ReferralStatCard;
