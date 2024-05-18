import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { parse, validate } from "@tma.js/init-data-node";

import { env } from "@/env.mjs";
import prisma from "@/lib/prisma";
import { userQuery } from "@/lib/constants";

// login
export async function POST() {
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
    console.log("[LOGIN_SERVER]", err);
    return new NextResponse(null, { status: 401 });
  }

  const initData = parse(initDataRaw);

  if (!initData.user) {
    return new NextResponse(null, { status: 401 });
  }

  try {
    const user = await prisma.user.upsert({
      where: { id: initData.user.id },
      include: userQuery,
      update: {
        firstName: initData.user.firstName,
        username: initData.user.username,
      },
      create: {
        id: initData.user.id,
        firstName: initData.user.firstName,
        username: initData.user.username,
        referrer: initData.startParam
          ? parseInt(initData.startParam)
          : undefined,
      },
    });

    if (initData.startParam) {
      await prisma.user.update({
        where: { id: parseInt(initData.startParam) },
        data: { noOfReferrals: { increment: 1 } },
      });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.log("[LOGIN_SERVER]", err);
    return new NextResponse(null, { status: 401 });
  }
}

// read user
export async function GET() {
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
    console.log("[GET_USER]", err);
    return new NextResponse(null, { status: 401 });
  }

  const initData = parse(initDataRaw);

  if (!initData.user) {
    return new NextResponse(null, { status: 401 });
  }

  // simulate looking up the user in db
  // await sleep(250);

  try {
    const user = await prisma.user.findUnique({
      where: { id: initData.user.id },
      include: userQuery,
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("[GET_USER]", error);
    return new NextResponse(null, { status: 401 });
  }
}
