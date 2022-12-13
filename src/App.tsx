import React from "react";

import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";

import { Layout } from "pages/Layout";
import { NotFound } from "pages/NotFound";
import { Home } from "pages/Home";
import { NewEvent } from "pages/NewEvent";

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
            path: "new",
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
