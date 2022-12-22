import React from "react";

import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-sky-600 text-white sticky top-0 shadow-lg">
        <div className="max-w-lg px-3 py-4 mx-auto flex flex-row gap-2 items-center">
          <h1 className="flex-grow text-3xl font-bold lowercase">Meetup</h1>
          <nav>
            <ul className="flex flex-row gap-4 text-sm font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="uppercase hover:underline-offset-2 hover:underline"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/event/new")}
                  className="uppercase hover:underline-offset-2 hover:underline"
                >
                  New Event
                </button>
              </li>
            </ul>
          </nav>
        </div>
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
