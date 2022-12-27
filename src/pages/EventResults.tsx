import React from "react";

import { useParams } from "react-router-dom";
import { useHref } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

import { ResultsTable } from "components/ResultsTable";

import { getMeeting } from "api/meeting";
import { getMeetingResponse } from "api/meeting";

type LoaderParams = {
  params: {
    eventId: string;
  };
};

export const loader = async ({ params }: LoaderParams) => {
  const meeting = await getMeeting(params.eventId);
  const responses = await getMeetingResponse(meeting.id);
  return { meeting, responses };
};

export const EventResults = () => {
  const { meeting, responses } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const params = useParams();
  const href = useHref(`/event/${params.eventId}`);
  const pollLink = window.location.origin + href;

  return (
    <>
      <div className="w-full mx-auto my-auto">
        <div className="flex flex-col gap-2">
          <article>
            <h3 className="text-xl font-bold text-slate-700">
              {meeting.title}
            </h3>
            <p className="text-xs font-normal text-slate-400">
              {`Created by: ${meeting.creator}`}
            </p>
            <p className="text-xs font-medium text-slate-700 mt-2">
              Voting Results
            </p>
            <ResultsTable meeting={meeting} responses={responses} />
          </article>
          <div className="flex flex-col mt-2">
            <p className="text-xs font-medium text-slate-700">
              Share this link with your friends
            </p>
            <div className="flex flex-row border border-primary-700 rounded-md divide-x divide-primary-700 items-center text-sm font-normal text-slate-700 shadow-md overflow-hidden">
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
};
