import React from "react";

import { Button } from "../ui/button";
import { Icons } from "./icons";

const LoadingButton = () => {
  return (
    <Button>
      <Icons.loading className="animate-spin-slow" />
    </Button>
  );
};

export default LoadingButton;
