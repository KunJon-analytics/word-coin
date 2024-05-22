import React from "react";

import { cn } from "@/lib/utils";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type PlayCardProps = React.ComponentProps<typeof Card> & {
  message: string;
  cardTitle: string;
};

const PlayCard = ({
  message,
  cardTitle,
  className,
  ...props
}: PlayCardProps) => {
  return (
    <Card className={(cn(className), "col-span-12 pb-4 w-[350px]")}>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default PlayCard;
