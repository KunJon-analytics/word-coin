"use client";

import React from "react";
import { useInitData } from "@tma.js/sdk-react";

import { LeaderboardUsers } from "@/types";
import useUser from "@/hooks/use-user";
import { useMounted } from "@/hooks/use-mounted";

import ReferralLinkCard from "./referral-link-card";
import ReferralStatCard from "./referral-stat-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ReferralTable from "./referral-table";
import { LoadingSkeleton } from "../shared/loading";
import ComingSoon from "./coming-soon";
import ErrorButton from "../shared/error-button";
import { SignInModal } from "../shared/sign-in-modal";

type Props = {
  users: LeaderboardUsers;
};

const ReferralClient = ({ users }: Props) => {
  const { user, isError, isLoading } = useUser();
  const initData = useInitData(true);
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
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <ReferralLinkCard referralCode={user.id} />
          <ReferralStatCard
            stat={user.noOfReferrals}
            target={100}
            title="Referrals"
          />
          <ReferralStatCard stat={user.points} target={1000} title="Points" />
        </div>
        <Tabs defaultValue="leaderboard">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="referrals" disabled>
                Referrals
              </TabsTrigger>
              <TabsTrigger value="views" disabled>
                Views
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="leaderboard">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Word Rush Top Hunters</CardTitle>
                <CardDescription>
                  Discover who&apos;s leading the gold rush! Our leaderboard
                  showcases the trailblazers who&apos;ve referred the most
                  fellow adventurers. Keep referring to climb the ranks and
                  strike it rich with Word Rush.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReferralTable users={users} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="referrals">
            <ComingSoon />
          </TabsContent>
          <TabsContent value="views">
            <ComingSoon />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ReferralClient;
