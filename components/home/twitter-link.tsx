"use client";

import React from "react";
import { useUtils } from "@tma.js/sdk-react";
import { siteConfig } from "@/config/site";

import { Button } from "../ui/button";
import { Icons } from "../shared/icons";

const TwitterLink = () => {
  const utils = useUtils(true);

  return (
    <>
      <Button
        variant={"outline"}
        size={"sm"}
        className="animate-fade-up opacity-0"
        disabled={!utils}
        onClick={() => utils?.openLink(siteConfig.links.twitter)}
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Introducing on <Icons.twitter className="ml-2 h-4 w-4" />
      </Button>
    </>
  );
};

export default TwitterLink;
