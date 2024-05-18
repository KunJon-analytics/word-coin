"use client";

import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  useMiniApp,
  useThemeParams,
  useViewport,
} from "@tma.js/sdk-react";
import { useEffect } from "react";

import { ssrStub } from "@/lib/constants";

import BackButtonManipulator from "./back-button-manipulator";

type TwaThemeProps = { children: React.ReactNode };

const TwaTheme = ({ children }: TwaThemeProps) => {
  // As long as this is not really important to specify some valid SSR values here, we are just
  // specifying a stub.

  const miniApp = useMiniApp({ ssr: ssrStub });
  const themeParams = useThemeParams({ ssr: ssrStub });
  const viewport = useViewport({ ssr: ssrStub });

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    if (viewport) {
      return bindViewportCSSVars(viewport);
    }
  }, [viewport]);

  return (
    <>
      <BackButtonManipulator />
      {children}
    </>
  );
};

export default TwaTheme;
