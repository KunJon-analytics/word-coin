import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// get active round
export async function GET(req: Request) {
  try {
    const activeGame = await prisma.gameRound.findFirst({
      where: { stage: "STARTED" },
      select: { id: true },
    });
    return NextResponse.json(activeGame);
  } catch (error) {
    console.log("[GET_ACTIVE_GAME]", error);
    return new NextResponse(null, { status: 401 });
  }
}
