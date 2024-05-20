import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Word Rush",
  title:
    "Word Rush: Unleash Your Lexicon Power | Play, Earn Points, and Convert to Tokens!",
  description:
    "Join Word Rush—a thrilling word-hunting adventure! Play the game, earn points, and convert them to Word Rush tokens minted on the TON blockchain. Invite friends, compete, and let your lexicon prowess shine! 🚀🔠",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/codehagen",
    github: "https://github.com/meglerhagen",
  },
  mailSupport: "christer@sailsdock.com",
};
