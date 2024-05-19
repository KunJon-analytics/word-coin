import { retrieveLaunchParams } from "@tma.js/sdk-react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useMemo } from "react";

import { UserReturnType } from "@/types";
import { fetchJson } from "@/lib/utils";

import { useMounted } from "./use-mounted";

const userApiRoute = "/api/user/me";

async function getUser([url, token]: [string, string]) {
  return fetchJson<UserReturnType>(`${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function doLogin([url, token]: [string, string]) {
  return fetchJson<UserReturnType>(`${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function useUser() {
  const mounted = useMounted();
  const initDataRaw = useMemo(() => {
    return mounted ? retrieveLaunchParams().initDataRaw : "";
  }, [mounted]);

  const { data, error, isLoading } = useSWR(
    initDataRaw ? [userApiRoute, initDataRaw] : null,
    getUser
  );

  const {
    trigger: login,
    isMutating: loginLoading,
    error: loginError,
  } = useSWRMutation(
    initDataRaw ? [userApiRoute, initDataRaw] : null,
    doLogin,
    {
      // the login route already provides the updated information, no need to revalidate
      revalidate: false,
    }
  );

  return {
    user: data,
    isLoading,
    isError: error,
    login,
    loginLoading,
    initDataRaw,
    loginError,
  };
}

export default useUser;
