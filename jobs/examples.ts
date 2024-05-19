import { cronTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";

import prisma from "@/lib/prisma";
import { env } from "@/env.mjs";

// Your first job
// This Job will run every hour, it finishes a starting game round and creates a new one
client.defineJob({
  // This is the unique identifier for your Job, it must be unique across all Jobs in your project.
  id: "start-new-round",
  name: "Round Starter: starts a new round",
  version: "0.0.1",
  // This is triggered by an event using cronTrigger. You can also trigger Jobs with webhooks, events, and more: https://trigger.dev/docs/documentation/concepts/triggers/introduction
  trigger: cronTrigger({
    cron: "0 * * * *",
  }),
  run: async (payload, io, ctx) => {
    // Use runTask with the "get-running-round" cacheKey, and return the round
    const runningRound = await io.runTask("get-running-round", async () => {
      return prisma.gameRound.findFirst({
        where: {
          stage: "STARTED",
        },
      });
    });

    // Use runTask with the "finish-running-round" cacheKey, and return the round
    const roundJustFinished = await io.runTask(
      "finish-running-round",
      async () => {
        if (runningRound) {
          return prisma.gameRound.update({
            where: {
              stage: "STARTED",
              id: runningRound.id,
            },
            data: { stage: "FINISHED" },
          });
        }
        return null;
      }
    );

    // Use runTask with the "get-new-word" cacheKey, and return the word
    const word = await io.runTask("get-new-word", async () => {
      const wordnikApiUrl = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=${env.WORDNIK_API_KEY}`;

      const res = await fetch(wordnikApiUrl);

      const { word }: { word: string } = await res.json();

      return word;
    });

    // Use runTask with the "create-new-round" cacheKey, and return the round
    const newRound = await io.runTask("create-new-round", async () => {
      return await prisma.gameRound.create({
        data: { word, stage: "STARTED" },
      });
    });

    return newRound;

    // To learn how to write much more complex (and probably funnier) Jobs, check out our docs: https://trigger.dev/docs/documentation/guides/create-a-job
  },
});
