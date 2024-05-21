"use client";

import { useMainButton } from "@tma.js/sdk-react";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

const MainButtonManipulator = () => {
  const pathname = usePathname();
  const { gameRoundId } = useParams<{ gameRoundId?: string }>();
  const mb = useMainButton(true);

  useEffect(() => {
    const routes = ["/"];

    if (routes.includes(pathname)) {
      mb?.show();
    } else {
      mb?.hide();
    }
  }, [pathname, mb]);

  return null;
};

export default MainButtonManipulator;
