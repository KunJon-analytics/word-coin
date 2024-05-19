import React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader } from "../ui/card";

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
    <Card className={(cn(className), "col-span-12 pb-4")} {...props}>
      <CardHeader className="mt-3 flex items-center justify-between px-4 sm:px-5">
        <h2 className="font-medium tracking-wide">{cardTitle}</h2>
      </CardHeader>
      <CardContent className="mt-3 grid grid-cols-12">
        <div className="col-span-12 sm:col-span-6 lg:col-span-8">{message}</div>
      </CardContent>
    </Card>
  );
};

export default PlayCard;
