import React from "react";

import { Button } from "../ui/button";

type ErrorButtonProps = { buttonText: string };

const ErrorButton = ({ buttonText }: ErrorButtonProps) => {
  return (
    <Button variant={"destructive"} disabled>
      {buttonText}
    </Button>
  );
};

export default ErrorButton;
