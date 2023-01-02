import { parseISO } from "date-fns";
import { format } from "date-fns";

import { clsx } from "clsx";

import type { Event, EventResponse } from "@prisma/client";

type ResultsTableProps = {
  meeting: Event;
  responses: EventResponse[];
};

export const ResultsTable = ({ meeting, responses }: ResultsTableProps) => {
  const mostVotedDate = () => {
    let currentMostVotedDate = {
      date: "",
      votedForCount: 0,
    };

    meeting.options.forEach((date) => {
      let votedCount = 0; // Votes for the current date

      responses.forEach((response) => {
        response.options.forEach((responseDate) => {
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
    <div className="overflow-auto rounded-md shadow-md bg-white">
      <table className="table-auto w-full">
        <thead className="font-bold text-slate-700 bg-slate-100">
          <tr className="divide-x divide-solid divide-slate-300">
            <th className="text-left px-4 py-2">Name</th>
            {meeting.options.map((rawDate, index) => {
              const date = parseISO(rawDate);

              return (
                <th
                  key={`date-header-${index}`}
                  className={clsx([
                    rawDate === mostVotedDate().date && "bg-amber-300",
                    "text-sm text-center px-4 py-2",
                  ])}
                >
                  <div>{format(date, "dd.MM.yy")}</div>
                  <div>{format(date, "HH:mm")}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="font-normal text-slate-700 divide-y divide-solid divide-slate-300">
          {responses.map((response, index) => {
            return (
              <tr
                key={`date-row-${index}`}
                className="divide-x divide-solid divide-slate-300"
              >
                <td className="text-left px-4 py-3 whitespace-nowrap overflow-clip text-ellipsis max-w-[10rem]">
                  {response.name}
                </td>
                {meeting.options.map((date, index) => {
                  const selected = response.options.includes(date);

                  return (
                    <td
                      key={`date-row-field-${date + index}`}
                      className={clsx([
                        selected && "bg-green-400",
                        !selected && "bg-red-400",
                      ])}
                    ></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
