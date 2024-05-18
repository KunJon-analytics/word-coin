import { useLaunchParams } from "@tma.js/sdk-react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { UserReturnType } from "@/types";
import { fetchJson } from "@/lib/utils";

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
  const initDataRaw = useLaunchParams().initDataRaw;

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
