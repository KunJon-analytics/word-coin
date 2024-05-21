"use client";

import { useMainButton } from "@tma.js/sdk-react";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

const MainButtonManipulator = () => {
  const pathname = usePathname();
  const { gameRoundId } = useParams<{ gameRoundId?: string }>();
  const mb = useMainButton(true);

  useEffect(() => {
    const routes = ["/", "/dashboard", "/about", "/referral-task"];

    if (routes.includes(pathname) || !!gameRoundId) {
      mb?.show();
    } else {
      mb?.hide();
    }
  }, [pathname, mb, gameRoundId]);

  return null;
};

export default MainButtonManipulator;
