import React from "react";

import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";

import { Layout } from "pages/Layout";
import { NotFound } from "pages/NotFound";
import { Home } from "pages/Home";

import { NewEvent } from "pages/NewEvent";
import { action as newEventAction } from "pages/NewEvent";

import { Event } from "pages/Event";
import { loader as eventLoader } from "pages/Event";
import { action as eventAction } from "pages/Event";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/event",
        children: [
          {
            path: ":eventId",
            // @ts-ignore
            loader: eventLoader,
            // @ts-ignore
            action: eventAction,
            element: <Event />,
          },
          {
            path: "new",
            action: newEventAction,
            element: <NewEvent />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
