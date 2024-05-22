import React from "react";

import { Wrapper } from "@/components/play/Wrapper";
import PlayMainButton from "@/components/play/play-main-button";

interface Props {
  params: { gameRoundId: string };
}

const PlayPage = async ({ params: { gameRoundId } }: Props) => {
  return (
    <main className="grid grid-cols-1 place-content-start w-full pb-8">
      <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:mt-6 lg:gap-6">
        <Wrapper roundId={gameRoundId} />
      </div>
      <PlayMainButton />
    </main>
  );
};

export default PlayPage;
