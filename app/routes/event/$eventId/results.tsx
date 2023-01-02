import { useLoaderData } from "@remix-run/react";

import { json } from "@remix-run/node";

import type { LoaderArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";

import { ResultsTable } from "~/components/ResultsTable";

import { db } from "~/utils/db.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return {
      title: "No event",
      "og:title": "No event",
      description: "No event found",
      "og:description": "No event found",
    };
  }

  return {
    title: `Meetup Results: ${data.event.title}`,
    "og:title": `Meetup Results: ${data.event.title}`,
    description: `Check the results for ${data.event.title}.`,
    "og:description": `Check the results for ${data.event.title}.`,
  };
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const event = await db.event.findUnique({
    select: {
      id: true,
      title: true,
      creator: true,
      options: true,
      EventResponse: true,
    },
    where: { id: params.eventId },
  });

  if (!event) {
    throw new Response(`Couldn't find an event with id ${params.eventId}`, {
      status: 404,
    });
  }

  return json({
    event,
    origin: request.url, // Url looks something like https://domain.com/event/$eventId/results
  });
};

export default function EventResultsRoute() {
  const { event, origin } = useLoaderData<typeof loader>();
  const pollLink = origin.slice(0, origin.lastIndexOf("/results"));

  return (
    <>
      <div className="w-full mx-auto my-auto">
        <div className="flex flex-col gap-2">
          <article>
            <h1 className="text-3xl font-bold text-slate-700">{event.title}</h1>
            <p className="text-md font-normal text-slate-400">
              {`Created by: ${event.creator}`}
            </p>
            <p className="text-md font-medium text-slate-700 mt-2">
              Voting Results
            </p>
            <ResultsTable meeting={event} responses={event.EventResponse} />
          </article>
          <div className="flex flex-col mt-2">
            <p className="text-md font-medium text-slate-700">
              Share this link with your friends
            </p>
            <div className="flex flex-row border border-primary-700 rounded-md divide-x divide-primary-700 items-center font-normal text-slate-700 shadow-md overflow-hidden">
              <p className="shrink px-2 py-1 whitespace-nowrap overflow-clip text-ellipsis">
                {pollLink}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(pollLink);
                }}
                className="px-2 py-1 grow hover:bg-slate-100 active:bg-slate-200"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
