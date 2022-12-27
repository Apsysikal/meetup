import React from "react";

import { Link } from "react-router-dom";

type NavLinkProps = {
  to: string;
  label: string;
};

export const NavLink = ({ to, label }: NavLinkProps) => {
  return (
    <li>
      <Link
        to={to}
        className="px-2 py-1 font-normal uppercase rounded-md hover:bg-slate-100/10 active:bg-slate-100/20 whitespace-nowrap"
      >
        {label}
      </Link>
    </li>
  );
};
