"use client";

import { SDKProvider, retrieveLaunchParams } from "@tma.js/sdk-react";
import React, { useEffect, useMemo } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import { siteConfig } from "@/config/site";

import TwaTheme from "./twa-theme";

type TwaProviderProps = { children: React.ReactNode };

const TwaProvider = ({ children }: TwaProviderProps) => {
  const debug = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }
    try {
      return retrieveLaunchParams().startParam === "debug";
    } catch (error) {
      return false;
    }
  }, []);
  const manifestUrl = `${siteConfig.url}/tonconnect-manifest.json`;

  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <TwaTheme>{children}</TwaTheme>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export default TwaProvider;
