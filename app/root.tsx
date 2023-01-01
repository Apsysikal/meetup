import { Links } from "@remix-run/react";
import { LiveReload } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import { Scripts } from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";

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
        <main className="max-w-lg mx-auto w-full p-3 grow">
          <Outlet />
        </main>
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
