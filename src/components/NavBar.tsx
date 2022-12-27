import React from "react";

import { Link } from "react-router-dom";

type NavBarProps = {
  children?: React.ReactNode;
};

export const NavBar = ({ children }: NavBarProps) => {
  return (
    <div className="max-w-lg px-3 py-4 mx-auto flex flex-row items-center">
      <Link to="/" className="flex-grow text-3xl font-bold lowercase">
        Meetup
      </Link>
      <nav>
        <ul className="flex flex-row gap-1">{children}</ul>
      </nav>
    </div>
  );
};
