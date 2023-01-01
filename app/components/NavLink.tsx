import { Link } from "react-router-dom";

import type { ComponentProps } from "react";

type NavLinkProps = ComponentProps<typeof Link>;

export const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <li>
      <Link
        to={to}
        className="px-2 py-1 font-normal uppercase rounded-md hover:bg-slate-100/10 active:bg-slate-100/20 whitespace-nowrap"
      >
        {children}
      </Link>
    </li>
  );
};
