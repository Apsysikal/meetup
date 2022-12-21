import React from "react";

import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";

import { Layout } from "pages/Layout";

import { ErrorPage } from "pages/ErrorPage";
import { NotFound } from "pages/NotFound";

import { Home } from "pages/Home";

import { NewEvent } from "pages/NewEvent";
import { action as newEventAction } from "pages/NewEvent";

import { Event } from "pages/Event";
import { loader as eventLoader } from "pages/Event";
import { action as eventAction } from "pages/Event";

import { EventResults } from "pages/EventResults";
import { loader as eventResultsLoader } from "pages/EventResults";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/event",
        errorElement: <ErrorPage />,
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
            path: ":eventId/results",
            // @ts-ignore
            loader: eventResultsLoader,
            element: <EventResults />,
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
