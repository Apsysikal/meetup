import { Link } from "@remix-run/react";
import { Form } from "@remix-run/react";

import { Popover } from "@headlessui/react";

const LINKS = [
  {
    label: "New Event",
    to: "/event/new",
  },
];

type NavBarProps = {
  username?: string;
  userRole?: string | null;
};

const MobileNavbar = ({ username, userRole }: NavBarProps) => {
  return (
    <div className="max-w-lg px-3 py-4 mx-auto flex flex-row items-center justify-between">
      <Link to="/" className="text-3xl font-bold lowercase">
        Meetup
      </Link>
      <div className="flex items-center">
        {username && <p className="px-2 font-semibold">{username}</p>}
        <Popover className="relative">
          <Popover.Button className="flex p-1 rounded-md hover:bg-gray-100/10 active:bg-gray-100/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Popover.Button>
          <Popover.Panel className="absolute z-10 right-0 border-gray-50 bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col text-gray-700 whitespace-nowrap py-2">
              <a
                href="/event/new"
                className="hover:bg-gray-200 active:bg-slate-100 px-5 py-2"
              >
                New Event
              </a>
              {userRole === "admin" && (
                <a
                  href="/admin"
                  className="hover:bg-gray-200 active:bg-slate-100 px-5 py-2"
                >
                  Admin
                </a>
              )}
              {username ? (
                <Form
                  action="/logout"
                  method="post"
                  className="hover:bg-gray-200 active:bg-slate-100 px-5 py-2"
                >
                  <button type="submit">Logout</button>
                </Form>
              ) : (
                <a
                  href="/login"
                  className="hover:bg-gray-200 active:bg-slate-100 px-5 py-2"
                >
                  Login
                </a>
              )}
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
};

const DesktopNavBar = ({ username, userRole }: NavBarProps) => {
  return (
    <div className="max-w-lg px-3 py-4 mx-auto flex flex-row items-center justify-between">
      <Link to="/" className="text-3xl font-bold lowercase">
        Meetup
      </Link>
      <div className="flex items-center">
        {username && <p className="px-2 font-semibold">{username}</p>}
        <nav>
          <ul className="flex flex-row gap-1 items-center">
            {LINKS.map(({ label, to }, index) => {
              return (
                <li key={index}>
                  <Link
                    to={to}
                    className="px-2 py-1 rounded-md hover:bg-slate-100/10 active:bg-slate-100/20 whitespace-nowrap"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            {userRole === "admin" && (
              <li>
                <Link
                  to="/admin"
                  className="px-2 py-1 rounded-md hover:bg-slate-100/10 active:bg-slate-100/20 whitespace-nowrap"
                >
                  Admin
                </Link>
              </li>
            )}
            {username ? (
              <li>
                <Form
                  action="/logout"
                  method="post"
                  className="px-2 py-1 rounded-md hover:bg-slate-100/10 active:bg-slate-100/20 whitespace-nowrap"
                >
                  <button type="submit">Logout</button>
                </Form>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="px-2 py-1 rounded-md hover:bg-slate-100/10 active:bg-slate-100/20 whitespace-nowrap"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export const NavBar = (props: NavBarProps) => {
  return (
    <>
      <div className="lg:hidden">
        <MobileNavbar {...props} />
      </div>
      <div className="max-lg:hidden">
        <DesktopNavBar {...props} />
      </div>
    </>
  );
};
