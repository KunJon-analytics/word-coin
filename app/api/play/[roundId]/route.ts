import { parse, validate } from "@tma.js/init-data-node";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import { env } from "@/env.mjs";
import { getWordColor } from "@/lib/wordle";

// read game
export async function GET(
  req: Request,
  { params: { roundId } }: { params: { roundId: string } }
) {
  const headersList = headers();
  const authHeader = headersList.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return new NextResponse(null, { status: 401 });
  }
  const initDataRaw = authHeader.substring(7, authHeader.length);

  try {
    // Validate the init data:
    validate(initDataRaw, env.TELEGRAM_TOKEN);
  } catch (err) {
    console.log("[GET_GAME]", err);
    return new NextResponse(null, { status: 401 });
  }

  const initData = parse(initDataRaw);

  if (!initData.user) {
    return new NextResponse(null, { status: 401 });
  }

  try {
    const userAttempt = await prisma.userAttempt.upsert({
      where: {
        attemptId: { userId: initData.user.id, roundId },
      },
      include: {
        guesses: true,
        round: {
          select: {
            _count: true,
            createdAt: true,
            id: true,
            stage: true,
            updatedAt: true,
            winner: { select: { username: true, firstName: true } },
          },
        },
      },
      update: {},
      create: { userId: initData.user.id, roundId },
    });
    return NextResponse.json(userAttempt);
  } catch (error) {
    console.log("[GET_GAME]", error);
    return new NextResponse(null, { status: 401 });
  }
}

// play game
export async function POST(
  req: Request,
  { params: { roundId } }: { params: { roundId: string } }
) {
  const headersList = headers();
  const authHeader = headersList.get("Authorization");
  const {
    guess,
  }: {
    guess: string;
  } = await req.json();

  if (!authHeader?.startsWith("Bearer ")) {
    return new NextResponse(null, { status: 401 });
  }
  const initDataRaw = authHeader.substring(7, authHeader.length);

  try {
    // Validate the init data:
    validate(initDataRaw, env.TELEGRAM_TOKEN);
  } catch (err) {
    console.log("[PLAY_GAME]", err);
    return new NextResponse(null, { status: 401 });
  }

  const initData = parse(initDataRaw);

  if (!initData.user) {
    return new NextResponse(null, { status: 401 });
  }

  const currentGuess = guess.toLowerCase();

  if (currentGuess.length !== 5) {
    return new NextResponse("Word must be 5 chars!", { status: 401 });
  }

  try {
    const userAttempt = await prisma.userAttempt.findUnique({
      where: { attemptId: { userId: initData.user.id, roundId } },
      include: { guesses: true, round: true },
    });

    if (!userAttempt) {
      return new NextResponse("No Game Round", { status: 401 });
    }

    const history = userAttempt.guesses.map((guess) => guess.guess);

    if (history.length > 6) {
      return new NextResponse("You used all your guesses!", { status: 401 });
    }

    const correctGuess = userAttempt.guesses.find((guess) => guess.isCorrect);

    if (correctGuess) {
      return new NextResponse("You already won this round", { status: 401 });
    }

    const solution = userAttempt.round.word.toLowerCase();

    if (history.includes(solution)) {
      return new NextResponse("You already completed this round", {
        status: 401,
      });
    }

    if (history.includes(currentGuess)) {
      return new NextResponse("You already tried that word!", {
        status: 401,
      });
    }

    const isCorrect = currentGuess === solution;

    const color = getWordColor(currentGuess, solution);

    // add guess and connect to attempt
    const result = await prisma.userAttempt.update({
      where: {
        attemptId: { userId: initData.user.id, roundId },
      },
      data: {
        guesses: {
          create: [
            {
              guess: currentGuess,
              index: userAttempt.guesses.length,
              isCorrect,
              color,
            },
          ],
        },
      },
      include: {
        guesses: true,
        round: {
          select: {
            _count: true,
            createdAt: true,
            id: true,
            stage: true,
            updatedAt: true,
            winner: { select: { username: true, firstName: true } },
          },
        },
      },
    });

    // if is correct and no previous winner
    if (isCorrect && !userAttempt.round.winnerId) {
      // (event) send message to winner and change to FINISHED, add winner + point
      await prisma.gameRound.update({
        where: { id: roundId },
        data: { winnerId: initData.user.id, stage: "FINISHED" },
      });
      await prisma.user.update({
        where: { id: initData.user.id },
        data: { points: { increment: 13 } },
      });
      return NextResponse.json(result);
    }

    // (event) add point for activity and successful attempt
    if (isCorrect) {
      // send add point event
      await prisma.user.update({
        where: { id: initData.user.id },
        data: { points: { increment: 3 } },
      });
      return NextResponse.json(result);
    }

    if (!isCorrect && history.length === 5) {
      // send add point event
      await prisma.user.update({
        where: { id: initData.user.id },
        data: { points: { increment: 1 } },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.log("[PLAY_GAME]", error);
    return new NextResponse(null, { status: 401 });
  }
}
