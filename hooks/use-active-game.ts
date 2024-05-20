import useSWR from "swr";

import { fetchJson } from "@/lib/utils";

const gameApiRoute = "/api/play";

async function getActiveGame(url: string) {
  return fetchJson<{
    id: string;
  } | null>(`${url}`);
}

function useActiveGame() {
  const { data, error, isLoading } = useSWR(gameApiRoute, getActiveGame, {
    refreshInterval: 120000,
  });

  return {
    activeGame: data,
    isLoading,
    isError: error,
  };
}

export default useActiveGame;
