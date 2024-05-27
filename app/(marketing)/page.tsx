import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ActiveGameButton from "@/components/shared/active-game-button";
import TwitterLink from "@/components/home/twitter-link";
import SiteMainBtn from "@/components/twa/site-main-btn";

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <TwitterLink />
          <h1
            className="animate-fade-up font-urban text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>
              <span className="relative bg-gradient-to-r from-primary to-primary/20 bg-clip-text font-extrabold text-transparent">
                {siteConfig.name}:
              </span>{" "}
              Play, Earn, Prosper!
            </Balancer>
          </h1>

          <p
            className="max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              🚀 Play Word Rush, earn points, and convert them to valuable
              tokens! Share your unique referral code with friends to multiply
              your points. Let{"'"}s turn words into wealth! 💸🔠
            </Balancer>
          </p>

          <div
            className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <ActiveGameButton />
            <Link
              href="/referral-task"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-4"
              )}
            >
              Invite Friends & Earn
            </Link>
          </div>
        </div>
        <SiteMainBtn buttonLink="/dashboard" buttonText="Your Points" />
      </section>
    </>
  );
}
