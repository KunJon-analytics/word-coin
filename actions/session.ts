"use server";

import { env } from "@/env.mjs";
import { validate, parse } from "@tma.js/init-data-node";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { SessionData, sessionOptions } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}

export async function logout() {
  // false => no db call for logout
  const session = await getSession();
  session.destroy();
  revalidatePath("/", "layout");
  redirect(`/`);
}

export async function login(initDataRaw: string) {
  const session = await getSession();
  try {
    // Validate the init data:
    validate(initDataRaw, env.TELEGRAM_TOKEN);
  } catch (err) {
    console.log("[LOGIN_SERVER]", err);
    console.log(err);
    return { success: false, message: "You are Unauthorized" };
  }

  const initData = parse(initDataRaw);

  if (!initData.user) {
    return { success: false, message: "You are Unauthorized" };
  }

  session.id = initData.user.id;
  session.firstName = initData.user.firstName;
  session.isLoggedIn = true;

  const user = await prisma.user.upsert({
    where: { id: initData.user.id },
    update: {
      firstName: initData.user.firstName,
    },
    create: {
      id: initData.user.id,
      firstName: initData.user.firstName,
      referrer: initData.startParam ? parseInt(initData.startParam) : undefined,
    },
  });
  await session.save();
  revalidatePath("/", "layout");
  return { success: true, message: "You are successfully Logged in" };
}
