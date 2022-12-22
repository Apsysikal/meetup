import React from "react";

import { useParams } from "react-router-dom";
import { useHref } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

import { parseISO } from "date-fns";
import { format as formatDate } from "date-fns";

import { getMeeting } from "api/meeting";
import { getMeetingResponse } from "api/meeting";

type LoaderParams = {
  params: {
    eventId: string;
  };
};

const classNames = (classes: Array<string | boolean>) => {
  return classes.filter(Boolean).join(" ");
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

  const mostVotedDate = () => {
    let currentMostVotedDate = {
      date: "",
      votedForCount: 0,
    };

    meeting.dates.forEach((date) => {
      let votedCount = 0; // Votes for the current date

      responses.forEach((response) => {
        response.dates.forEach((responseDate) => {
          if (responseDate === date) votedCount += 1;
        });
      });

      if (votedCount > currentMostVotedDate.votedForCount) {
        currentMostVotedDate.votedForCount = votedCount;
        currentMostVotedDate.date = date;
      }
    });

    return currentMostVotedDate;
  };

  return (
    <>
      <div className="w-full mx-auto my-auto">
        <div>
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
            <div className="overflow-auto border border-sky-500 rounded-md mt-1 shadow-md">
              <table className="table-auto w-full">
                <>
                  <thead className="text-xs font-bold text-slate-700 border-b border-b-sky-500">
                    <tr>
                      <th className="text-left px-2 h-8 border-r border-r-sky-500">
                        Name
                      </th>
                      {meeting.dates.map((rawDate, index) => {
                        const date = parseISO(rawDate);

                        return (
                          <th
                            key={`date-header-${index}`}
                            className={classNames([
                              rawDate === mostVotedDate().date &&
                                "bg-amber-400",
                              "text-center px-2 h-8 border-r border-r-sky-500",
                              "last:border-r-0",
                            ])}
                          >
                            <div>{formatDate(date, "dd.MM.yy")}</div>
                            <div>{formatDate(date, "HH:mm")}</div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="text-sm font-normal text-slate-700">
                    {responses.map((response, index) => {
                      return (
                        <tr
                          key={`date-row-${index}`}
                          className="border-b border-b-sky-500 last:border-b-0"
                        >
                          <td className="text-left px-2 border-r border-r-sky-500 whitespace-nowrap overflow-clip text-ellipsis">
                            {response.name}
                          </td>
                          {meeting.dates.map((date, index) => {
                            const selected = response.dates.includes(date);

                            return (
                              <td
                                key={`date-row-field-${date + index}`}
                                className={classNames([
                                  selected && "bg-green-400",
                                  !selected && "bg-red-400",
                                  "text-center px-2 border-r border-r-sky-500",
                                  "last:border-r-0",
                                ])}
                              ></td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </>
              </table>
            </div>
            <div className="flex flex-col mt-2">
              <p className="text-xs font-medium text-slate-700">
                Share this link with your friends
              </p>
              <div className="flex flex-row border border-sky-500 rounded-md divide-x divide-sky-500 items-center text-sm font-normal text-slate-700 shadow-md overflow-hidden">
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
          </article>
        </div>
      </div>
    </>
  );
};
