export const ssrStub = {
  themeParams: {},
  version: "7.0",
  botInline: false,
  platform: "unknown",
};

// also change types definition
export const userQuery = {
  attempts: { include: { guesses: true, round: true } },
  _count: true,
  roundsWon: true,
};
