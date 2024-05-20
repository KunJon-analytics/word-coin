import { retrieveLaunchParams } from "@tma.js/sdk-react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useMemo } from "react";

import { GameReturnType } from "@/types";
import { fetchJson } from "@/lib/utils";

import { useMounted } from "./use-mounted";

const gameApiRoute = "/api/play";

async function getGame([url, roundId, token]: [string, string, string]) {
  return fetchJson<GameReturnType>(`${url}/${roundId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function submitPlay(
  [url, roundId, token]: [string, string, string],
  { arg }: { arg: { guess: string } }
) {
  return fetchJson<GameReturnType>(`${url}/${roundId}`, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function useGame(roundId: string) {
  const mounted = useMounted();
  const initDataRaw = useMemo(() => {
    return mounted ? retrieveLaunchParams().initDataRaw : "";
  }, [mounted]);

  const { data, error, isLoading } = useSWR(
    initDataRaw && mounted ? [gameApiRoute, roundId, initDataRaw] : null,
    getGame
  );

  const {
    trigger: play,
    isMutating: playLoading,
    error: playError,
  } = useSWRMutation(
    initDataRaw ? [gameApiRoute, roundId, initDataRaw] : null,
    submitPlay,
    {
      // the play route already provides the updated information, no need to revalidate
      revalidate: false,
    }
  );

  return {
    game: data,
    isLoading,
    isError: error,
    play,
    playLoading,
    initDataRaw,
    playError,
  };
}

export default useGame;
