import { Outlet } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import type { LoaderArgs } from "@remix-run/node";

import { getUser } from "~/utils/session.server";
import { requireAdminUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireAdminUser(request);

  return json({
    user,
  });
};

export default function AdminRoute() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-gray-700">Admin Section</h1>
      <p className="text-gray-700">
        Hey{" "}
        <span className="text-emerald-700 font-semibold">{user.username}</span>,
        welcome to the admin section.
      </p>
      <Outlet />
    </div>
  );
}
