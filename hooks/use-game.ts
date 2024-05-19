import { useLaunchParams } from "@tma.js/sdk-react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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
  const initDataRaw = useLaunchParams().initDataRaw;
  const mounted = useMounted();

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
      // the login route already provides the updated information, no need to revalidate
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
