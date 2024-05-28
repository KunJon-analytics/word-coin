/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "GameRound" DROP CONSTRAINT "GameRound_winnerId_fkey";

-- DropForeignKey
ALTER TABLE "UserAttempt" DROP CONSTRAINT "UserAttempt_userId_fkey";

-- AlterTable
ALTER TABLE "GameRound" ALTER COLUMN "winnerId" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserAttempt" ALTER COLUMN "userId" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "GameRound" ADD CONSTRAINT "GameRound_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAttempt" ADD CONSTRAINT "UserAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
