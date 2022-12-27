import React from "react";

import { Outlet } from "react-router-dom";

import { NavBar } from "components/NavBar";
import { NavLink } from "components/NavLink";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary-700 text-white sticky top-0 shadow-lg">
        <NavBar>
          <NavLink to="/event/new" label="New Event" />
        </NavBar>
      </header>
      <main className="max-w-lg mx-auto w-full p-3 flex-grow">
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
  );
};
