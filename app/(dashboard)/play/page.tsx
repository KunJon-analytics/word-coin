import React from "react";
import dynamic from "next/dynamic";

// Client Components:
const Testing = dynamic(() => import("@/components/draft/testing"), {
  ssr: false,
});

const PlayPage = () => {
  return <Testing />;
};

export default PlayPage;
