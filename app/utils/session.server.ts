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

export const logout = async (request: Request) => {
  const session = await getUserSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
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

export const getUser = async (userId: string) => {
  const user = await db.user.findUnique({
    select: { id: true, username: true, role: true },
    where: { id: userId },
  });

  if (!user) return undefined;

  return user;
};

export const requireUser = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  const userId = await requireUserId(request, redirectTo);
  const user = await getUser(userId);

  if (!user) {
    throw new Response(
      "No user with your id found. Did your account get deleted?",
      { status: 400, statusText: "Bad Request" }
    );
  }

  return user;
};

export const requireAdminUser = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  const user = await requireUser(request, redirectTo);

  if (user.role !== "admin") {
    throw new Response("You don't have access to this section of the app", {
      status: 403,
      statusText: "Forbidden",
    });
  }

  return user;
};
