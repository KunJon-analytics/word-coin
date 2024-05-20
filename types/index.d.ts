import type { Icon } from "lucide-react";
import { AttemptGuess, Prisma } from "@prisma/client";

import { Icons } from "@/components/shared/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export interface DashboardNavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

// also change constants definition
export type UserReturnType = Prisma.UserGetPayload<{
  include: {
    attempts: { include: { guesses: true; round: true } };
    _count: true;
    roundsWon: true;
  };
}> | null;

export type WordleColor = "grey" | "yellow" | "green";

export type FormattedGuess = {
  key: string;
  color: string;
};

export type UsedKeys = {
  [k: string]: string;
};

export type FormatGuessInput = {
  color: string;
  guess: string;
};

export type FormatGuess = (input: AttemptGuess) => FormattedGuess[];

export type GetUsedKeys = (input: (FormattedGuess[] | undefined)[]) => UsedKeys;

export type FormatGuesses = (
  input: AttemptGuess[]
) => (FormattedGuess[] | undefined)[];

export type AddNewGuessInput = FormatGuessInput & {
  formattedGuess: FormattedGuess[];
  guesses: (FormattedGuess[] | undefined)[];
  turn: number;
  usedKeys: UsedKeys;
  history: string[];
};

export type AddNewGuessOutput = {
  isCorrect: boolean;
  turn: number;
  guesses: (FormattedGuess[] | undefined)[];
  usedkeys: UsedKeys;
  history: string[];
};

export type AddNewGuess = (input: AddNewGuessInput) => AddNewGuessOutput;

export type GameReturnType = Prisma.UserAttemptGetPayload<{
  include: {
    guesses: true;
    round: {
      select: {
        _count: true;
        createdAt: true;
        id: true;
        stage: true;
        updatedAt: true;
        winner: { select: { username: true; firstName: true } };
      };
    };
  };
}>;

export type LeaderboardUsers = {
  noOfReferrals: number;
  firstName: string;
  username: string | null;
  createdAt: Date;
}[];
