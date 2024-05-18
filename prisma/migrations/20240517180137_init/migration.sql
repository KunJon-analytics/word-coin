-- CreateEnum
CREATE TYPE "RoundStage" AS ENUM ('STARTED', 'FINISHED', 'CLAIMED', 'QUEUED');

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gamesPlayed" INTEGER NOT NULL DEFAULT 0,
    "referrer" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRound" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "stage" "RoundStage" NOT NULL DEFAULT 'QUEUED',
    "winnerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAttempt" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "roundId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttemptGuess" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "guess" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "color" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttemptGuess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_referrer_idx" ON "User"("referrer");

-- CreateIndex
CREATE INDEX "GameRound_winnerId_idx" ON "GameRound"("winnerId");

-- CreateIndex
CREATE INDEX "UserAttempt_userId_idx" ON "UserAttempt"("userId");

-- CreateIndex
CREATE INDEX "UserAttempt_roundId_idx" ON "UserAttempt"("roundId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAttempt_userId_roundId_key" ON "UserAttempt"("userId", "roundId");

-- CreateIndex
CREATE INDEX "AttemptGuess_attemptId_idx" ON "AttemptGuess"("attemptId");

-- AddForeignKey
ALTER TABLE "GameRound" ADD CONSTRAINT "GameRound_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAttempt" ADD CONSTRAINT "UserAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAttempt" ADD CONSTRAINT "UserAttempt_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "GameRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptGuess" ADD CONSTRAINT "AttemptGuess_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "UserAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
