"use client";

import { SDKProvider, retrieveLaunchParams } from "@tma.js/sdk-react";
import React, { useEffect, useMemo } from "react";

import TwaTheme from "./twa-theme";

type TwaProviderProps = { children: React.ReactNode };

const TwaProvider = ({ children }: TwaProviderProps) => {
  const debug = useMemo(() => {
    return typeof window === "undefined"
      ? false
      : retrieveLaunchParams().startParam === "debug";
  }, []);
  const manifestUrl = useMemo(() => {
    return typeof window === "undefined"
      ? ""
      : new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);
  return (
    <SDKProvider acceptCustomStyles debug={debug}>
      <TwaTheme>{children}</TwaTheme>
    </SDKProvider>
  );
};

export default TwaProvider;
