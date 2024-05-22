"use client";

import React from "react";

import useUser from "@/hooks/use-user";
import { getReferralLink } from "@/lib/utils";

import SignInMainButton from "../twa/sign-in-main-button";
import { useToast } from "../ui/use-toast";

const ReferralMbWrapper = () => {
  const { user } = useUser();
  const { toast } = useToast();

  const pageAction = async () => {
    if (!user) {
      toast({
        title: "Unauthenticated",
        description: "Please Sign In to view your points and link",
        variant: "destructive",
      });
      return;
    }
    const referralLink = getReferralLink(user.id);
    await navigator?.clipboard.writeText(referralLink);
    toast({
      title: "Referral link Copied",
      description: referralLink,
    });
  };

  return (
    <SignInMainButton
      pageAction={pageAction}
      pageActionText={!user ? "Sign In" : "Invite Now"}
    />
  );
};

export default ReferralMbWrapper;
