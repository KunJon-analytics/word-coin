import { Suspense } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import ReferralClient from "@/components/tasks/referral-client";
import prisma from "@/lib/prisma";
import { LoadingSkeleton } from "@/components/shared/loading";

export default async function ReferralDashboard() {
  const users = await prisma.user.findMany({
    orderBy: { noOfReferrals: "desc" },
    take: 10,
    select: {
      createdAt: true,
      noOfReferrals: true,
      firstName: true,
      username: true,
    },
  });

  return (
    <ScrollArea className="lg:h-full pb-4 lg:pb-0">
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Suspense fallback={<LoadingSkeleton />}>
            <ReferralClient users={users} />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  );
}
