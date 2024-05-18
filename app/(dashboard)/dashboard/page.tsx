import { Suspense } from "react";
import dynamic from "next/dynamic";

import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSkeleton } from "@/components/shared/loading";

const DashboardTabs = dynamic(
  () => import("@/components/dashboard/dashboard-tabs"),
  {
    ssr: false,
  }
);

export const metadata = {
  title: "Dashboard",
  description:
    "Access your dashboard to track referrals, points, and stay on top of the greatest game ever.",
};

export default function DashboardPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <Suspense fallback={<LoadingSkeleton />}>
          <DashboardTabs />
        </Suspense>
      </div>
    </ScrollArea>
  );
}
