import React from "react";

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
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default PlayCard;
