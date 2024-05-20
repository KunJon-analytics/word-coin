import React from "react";

import { LoadingSkeleton } from "@/components/shared/loading";

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoadingSkeleton />
    </div>
  );
};

export default Loading;
