"use client";

import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { env } from "@/env.mjs";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Icons } from "../shared/icons";

type Props = { noOfReferrals: number; referralCode: number };

const Referrals = ({ noOfReferrals, referralCode }: Props) => {
  const referralLink = `${env.NEXT_PUBLIC_TELEGRAM_URL}?startapp=${referralCode}`;
  const { toast } = useToast();
  const onCopyText = () => {
    toast({
      title: "Referral link Copied",
      description: referralLink,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Referrals</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{noOfReferrals}</div>
        <p className="text-xs text-muted-foreground flex justify-between items-center">
          Referral link: {referralLink.substring(0, 20)}...
          <CopyToClipboard text={referralLink} onCopy={onCopyText}>
            <Button size={"icon"} variant={"ghost"}>
              <Icons.copy className="h-4 w-4 ml-4 lg:ml-0" />
            </Button>
          </CopyToClipboard>
        </p>
      </CardContent>
    </Card>
  );
};

export default Referrals;
