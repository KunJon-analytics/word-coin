"use client";

import React from "react";
import { useInitData } from "@tma.js/sdk-react";

import { useMounted } from "@/hooks/use-mounted";

const Testing = () => {
  const test = useInitData();
  const mounted = useMounted();

  return (
    <pre className="mt-2 w-[340px] rounded-md p-4">
      {mounted ? <code>{JSON.stringify(test, null, 2)}</code> : "Loading"}
    </pre>
  );
};

export default Testing;
