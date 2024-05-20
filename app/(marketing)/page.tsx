import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import ActiveGameButton from "@/components/shared/active-game-button";
import { GsapLink } from "@/components/shared/gsap-link";
import TwitterLink from "@/components/home/twitter-link";

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
              Unleash Your Lexicon Power on{" "}
              <span className="relative bg-gradient-to-r from-blue-500 to-blue-500/80 bg-clip-text font-extrabold text-transparent">
                {siteConfig.name}
              </span>
            </Balancer>
          </h1>

          <p
            className="max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Welcome to Word Rush, where words come alive! 🚀🔥 Embark on an
              exhilarating word-hunting adventure and earn points faster by
              inviting friends📚🔍
            </Balancer>
          </p>

          <div
            className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <ActiveGameButton />
            <GsapLink
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-4"
              )}
            >
              Invite Friends & Earn
            </GsapLink>
          </div>
        </div>
      </section>
    </>
  );
}
