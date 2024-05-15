"use client";

import React, { useEffect } from "react";

const Init = () => {
  useEffect(() => {
    const loadWebApp = async () => {
      const WebApp = (await import("@twa-dev/sdk")).default;
      WebApp.ready();
    };
    loadWebApp();
  }, []);

  return null;
};

export default Init;
