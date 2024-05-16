"use client";

import { useBackButton } from "@tma.js/sdk-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const BackButtonManipulator = () => {
  const { back } = useRouter();
  const pathname = usePathname();
  const bb = useBackButton({ ssr: { version: "7.0" } });

  useEffect(() => {
    if (pathname === "/") {
      bb.hide();
    } else {
      bb.show();
    }
  }, [pathname, bb]);

  useEffect(() => bb.on("click", back), [bb, back]);

  return null;
};

export default BackButtonManipulator;
