import { Links } from "@remix-run/react";
import { Meta } from "@remix-run/react";
import { LiveReload } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import { Scripts } from "@remix-run/react";
import { useCatch } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { Form } from "@remix-run/react";

import { Popover } from "@headlessui/react";

import type { ReactNode } from "react";

import { json } from "@remix-run/node";

import type { LoaderArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";

import { NavBar } from "~/components/NavBar";
import { NavLink } from "~/components/NavLink";

import { getUserId } from "~/utils/session.server";
import { getUser } from "~/utils/session.server";

import styles from "~/styles/app.css";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    href: "/apple-touch-icon.png",
    type: "image/png",
    sizes: "180x180",
  },
  {
    rel: "manifest",
    href: "/manifest.json",
  },
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const meta: MetaFunction = () => ({
  title: "Meetup",
  "og:title": "Meetup",
  author: "Benedikt Schniepp",
  "google-site-verification": "JPt2Um2RhOtcxaAp9OG-1uHTR9gipfBRkpM_W4CNvqM",
  charset: "utf-8",
  description:
    "Use meetup to easily plan events with your friends. Create a poll and share it without the need to log in.",
  "og:description":
    "Use meetup to easily plan events with your friends. Create a poll and share it without the need to log in.",
  keywords: "Event,Planning,Datefinder,Poll,Survey,Date,Meetup,Meeting",
  viewport: "width=device-width, initial-scale=1.0",
});

type DocumentProps = {
  children?: ReactNode;
  title?: string;
};

function Document({ children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>{children}</body>
    </html>
  );
}

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <Document>
      <div className="flex flex-col h-screen">
        <header className="bg-emerald-700 text-white sticky shadow-xl">
          <NavBar>
            <NavLink to="/event/new">NEW EVENT</NavLink>
          </NavBar>
        </header>
        <main className="flex flex-col grow gap-5 p-3 items-center max-w-lg mx-auto w-full">
          <h1 className="text-3xl font-bold text-red-700 uppercase text-center">
            Error
          </h1>
          <p className="text-center text-gray-700">
            {`${caught.status} ${caught.statusText}`}
          </p>
          <div className="border border-red-400 rounded-xl shadow-xl p-5 bg-red-50 max-w-full">
            <pre className="text-xs text-red-700 w-full overflow-auto">
              {caught.data}
            </pre>
          </div>
        </main>
        <footer className="bg-gray-800 text-gray-300 relative bottom-0">
          <div className="max-w-lg mx-auto px-3 py-4">
            <p className="flex flex-row gap-1 text-xs">
              Created by
              <a
                href="https://github.com/apsysikal"
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:underline hover:underline-offset-2"
              >
                Benedikt Schniepp
              </a>
            </p>
          </div>
        </footer>
      </div>
      <LiveReload />
    </Document>
  );
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <Document title="Application Error">
      <div className="flex flex-col h-screen">
        <header className="bg-emerald-700 text-white sticky shadow-xl">
          <NavBar>
            <NavLink to="/event/new">NEW EVENT</NavLink>
          </NavBar>
        </header>
        <main className="flex flex-col grow gap-5 p-3 items-center max-w-lg mx-auto w-full">
          <h1 className="text-3xl font-bold text-red-700 uppercase text-center">
            Application Error
          </h1>
          <p className="text-center text-gray-700">
            An unhadled error occured. We're sorry for the inconvenience caused.
            If the error persists, feel free to contact us.
          </p>
          <div className="border border-red-400 rounded-xl shadow-xl p-5 bg-red-50 max-w-full">
            <pre className="text-xs text-red-700 w-full overflow-auto">
              {error.message}
            </pre>
          </div>
        </main>
        <footer className="bg-gray-800 text-gray-300 relative bottom-0">
          <div className="max-w-lg mx-auto px-3 py-4">
            <p className="flex flex-row gap-1 text-xs">
              Created by
              <a
                href="https://github.com/apsysikal"
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:underline hover:underline-offset-2"
              >
                Benedikt Schniepp
              </a>
            </p>
          </div>
        </footer>
      </div>
      <LiveReload />
    </Document>
  );
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);

  if (!userId) {
    return json({
      user: null,
    });
  }

  const user = await getUser(userId);

  if (!user) {
    return json({
      user: null,
    });
  }

  return json({
    user: user,
  });
};

export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <Document>
      <div className="flex flex-col h-screen">
        <header className="bg-emerald-700 text-white sticky shadow-xl">
          <NavBar>
            {user && <p className="px-2 font-semibold">{user.username}</p>}
            <Popover className="relative">
              <Popover.Button className="flex p-1 rounded-md hover:bg-gray-100/10 active:bg-gray-100/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </Popover.Button>
              <Popover.Panel className="absolute z-10 right-0 border-gray-50 bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="flex flex-col text-gray-700 whitespace-nowrap py-2">
                  <a
                    href="/event/new"
                    className="hover:bg-gray-200 active:bg-slate-100 px-5 py-2"
                  >
                    New Event
                  </a>
                  {user?.role === "admin" && (
                    <a
                      href="/admin"
                      className="hover:bg-gray-200 active:bg-slate-100 px-5 py-2"
                    >
                      Admin
                    </a>
                  )}
                  {user ? (
                    <Form
                      action="/logout"
                      method="post"
                      className="hover:bg-gray-200 active:bg-slate-100 px-5 py-2"
                    >
                      <button type="submit">Logout</button>
                    </Form>
                  ) : (
                    <a
                      href="/login"
                      className="hover:bg-gray-200 active:bg-slate-100 px-5 py-2"
                    >
                      Login
                    </a>
                  )}
                </div>
              </Popover.Panel>
            </Popover>
          </NavBar>
        </header>
        <main className="max-w-lg mx-auto w-full p-3 grow">
          <Outlet />
        </main>
        <footer className="bg-gray-800 text-gray-300 relative bottom-0">
          <div className="max-w-lg mx-auto px-3 py-4">
            <p className="flex flex-row gap-1 text-xs">
              Created by
              <a
                href="https://github.com/apsysikal"
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:underline hover:underline-offset-2"
              >
                Benedikt Schniepp
              </a>
            </p>
          </div>
        </footer>
      </div>
      <LiveReload />
      <Scripts />
    </Document>
  );
}
