"use client";

import { type FC, type MouseEventHandler, type JSX, useCallback } from "react";
import {
  type LinkProps as NextLinkProps,
  default as NextLink,
} from "next/link";
import { useRouter } from "next/navigation";

import { animatePageOut } from "@/lib/animation";
import { cn } from "@/lib/utils";

export interface LinkProps
  extends NextLinkProps,
    Omit<JSX.IntrinsicElements["a"], "href"> {}

export const GsapLink: FC<LinkProps> = ({
  className,
  onClick: propsOnClick,
  href,
  ...rest
}) => {
  const router = useRouter();

  const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      propsOnClick?.(e);
      let path: string;
      if (typeof href === "string") {
        path = href;
      } else {
        const { search = "", pathname = "", hash = "" } = href;
        path = `${pathname}?${search}#${hash}`;
      }
      animatePageOut(path, router);
    },
    [href, propsOnClick]
  );

  return (
    <NextLink
      {...rest}
      href={href}
      onClick={onClick}
      className={cn(className)}
    />
  );
};
