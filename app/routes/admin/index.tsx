import { useLoaderData } from "@remix-run/react";

import { json } from "@remix-run/node";

import { LoaderArgs } from "@remix-run/node";

import { StatsCard } from "~/components/StatsCard";

import { db } from "~/utils/db.server";
import { requireAdminUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireAdminUser(request); // Just here to make sure the user is an admin

  const eventCount = await db.event.count();
  const responseCount = await db.eventResponse.count();
  const userCount = await db.user.count();

  return json({
    user,
    eventCount,
    responseCount,
    userCount,
  });
};

export default function AdminIndexRoute() {
  const { user, ...data } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl text-gray-700 font-bold">Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className="col-span-1">
          <StatsCard
            title="Events"
            stat={`${data.eventCount}`}
            statDescription="Events created in Total"
          />
        </div>
        <div className="col-span-1">
          <StatsCard
            title="Responses"
            stat={`${data.responseCount}`}
            statDescription="Responses in Total"
          />
        </div>
        <div className="col-span-1">
          <StatsCard
            title="Average Responses"
            stat={`${(data.responseCount / data.eventCount).toFixed(2)}`}
            statDescription="Responses per Event"
          />
        </div>
        <div className="col-span-1">
          <StatsCard
            title="Users"
            stat={`${data.userCount}`}
            statDescription="Users signed up in Total"
          />
        </div>
      </div>
    </div>
  );
}
