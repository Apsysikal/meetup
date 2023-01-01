import { Links } from "@remix-run/react";
import { LiveReload } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import { Scripts } from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";

import { NavBar } from "~/components/NavBar";
import { NavLink } from "~/components/NavLink";

import styles from "~/styles/app.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <title>Meetup</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Links />
      </head>
      <body>
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
      </body>
    </html>
  );
}
