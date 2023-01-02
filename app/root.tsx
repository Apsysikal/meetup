import { Links } from "@remix-run/react";
import { Meta } from "@remix-run/react";
import { LiveReload } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import { Scripts } from "@remix-run/react";
import { useCatch } from "@remix-run/react";

import type { ReactNode } from "react";

import type { MetaFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";

import { NavBar } from "~/components/NavBar";
import { NavLink } from "~/components/NavLink";

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
    <html>
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
    </Document>
  );
};

export default function App() {
  return (
    <Document>
      <div className="flex flex-col h-screen">
        <header className="bg-emerald-700 text-white sticky shadow-xl">
          <NavBar>
            <NavLink to="/event/new">NEW EVENT</NavLink>
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
