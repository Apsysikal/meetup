import { createCookieSessionStorage } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { compare } from "bcryptjs";

import { db } from "~/utils/db.server";

const secret = String(process.env.SESSION_SECRET);

if (!secret) throw new Error("SESSION_SECRET must be set");

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
    secrets: [secret],
    secure: process.env.NODE_ENV === "production",
  },
});

export const login = async (username: string, password: string) => {
  const user = await db.user.findUnique({
    select: { id: true, passwordHash: true, passwordSalt: true },
    where: { username },
  });

  if (!user) return undefined;

  const passwordMatches = await compare(
    password + user.passwordSalt,
    user.passwordHash
  );

  return { id: user.id, username };
};

export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};

export const getUserSession = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie");
  return await sessionStorage.getSession(cookieHeader);
};

export const getUserId = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") return undefined;

  return userId;
};

export const requireUserId = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  const userId = await getUserId(request);

  if (!userId) {
    const params = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${params}`);
  }

  return userId;
};

export const getRole = async (userId: string) => {
  const user = await db.user.findUnique({
    select: { role: true },
    where: { id: userId },
  });

  if (!user) return undefined;
  if (!user.role) return undefined;

  return { role: user.role };
};
