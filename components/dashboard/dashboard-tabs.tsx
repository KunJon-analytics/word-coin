"use client";

import { useInitData } from "@tma.js/sdk-react";
import React from "react";

import { useMounted } from "@/hooks/use-mounted";
import useUser from "@/hooks/use-user";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Referrals from "./referrals";
import UnclaimedTokens from "./unclaimed-tokens";
import ErrorButton from "../shared/error-button";
import GamesPlayed from "./games-played";
import RoundsWon from "./rounds-won";
import ClaimButton from "./claim-button";
import { SignInModal } from "../shared/sign-in-modal";
import ActiveGameButton from "../shared/active-game-button";
import { LoadingSkeleton } from "../shared/loading";

const DashboardTabs = () => {
  const initData = useInitData(true);
  const { user, isLoading, isError } = useUser();
  const mounted = useMounted();

  if (!initData || !mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ErrorButton buttonText="Ivalid Telegram User" />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ErrorButton buttonText="Request Error" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SignInModal />
      </div>
    );
  }

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="play">Play Now</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <GamesPlayed gamesPlayed={user._count.attempts} />
          <Referrals
            noOfReferrals={user.noOfReferrals}
            referralCode={user.id}
          />
          <RoundsWon roundsWon={user._count.roundsWon} />
          <UnclaimedTokens unclaimedTokens={0} />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Claim Tokens</h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-8">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Claim your available tokens
              </h3>
              <p className="text-sm text-muted-foreground">
                Click on the button below to claim your tokens
              </p>
              <ClaimButton />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="play">
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <ActiveGameButton />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
