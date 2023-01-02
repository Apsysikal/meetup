import { useLoaderData } from "@remix-run/react";

import { json } from "@remix-run/node";

import { LoaderArgs } from "@remix-run/node";

import { db } from "~/utils/db.server";
import { requireAdminUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await requireAdminUser(request); // Just here to make sure the user is an admin

  const eventCount = await db.event.count();
  const responseCount = await db.eventResponse.count();
  const userCount = await db.user.count();

  return json({
    eventCount,
    responseCount,
    userCount,
  });
};

export default function AdminIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <p>Events: {data.eventCount}</p>
      <p>Respones: {data.responseCount}</p>
      <p>Avg. responses/event: {data.responseCount / data.eventCount}</p>
      <p>Users: {data.userCount}</p>
    </>
  );
}
