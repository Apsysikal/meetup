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
    <>
      <p className="text-gray-700 font-semibold">
        Hey <span className="text-emerald-700">{user.username}</span>, Welcome
        to the admin section.
      </p>
      <Outlet />
    </>
  );
}
