import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    TELEGRAM_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_TELEGRAM_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_TELEGRAM_URL: process.env.NEXT_PUBLIC_TELEGRAM_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  },
});
