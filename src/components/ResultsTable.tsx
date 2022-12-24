import { parseISO } from "date-fns";
import { format as formatDate } from "date-fns";

import { classNames } from "utils";

import type { ApplicationMeeting } from "api/meeting";
import type { ApplicationMeetingResponse } from "api/meeting";

type ResultsTableProps = {
  meeting: ApplicationMeeting;
  responses: ApplicationMeetingResponse[];
};

export const ResultsTable = ({ meeting, responses }: ResultsTableProps) => {
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
    <div className="overflow-auto border border-sky-600 rounded-md mt-1 shadow-md bg-white">
      <table className="table-auto w-full">
        <>
          <thead
            className={`text-xs font-bold text-slate-700 ${
              responses.length > 0 ? "border-b border-b-sky-600" : ""
            }`}
          >
            <tr>
              <th className="text-left px-2 h-8 border-r border-r-sky-600">
                Name
              </th>
              {meeting.dates.map((rawDate, index) => {
                const date = parseISO(rawDate);

                return (
                  <th
                    key={`date-header-${index}`}
                    className={classNames([
                      rawDate === mostVotedDate().date && "bg-amber-400",
                      "text-center px-2 h-8 border-r border-r-sky-600",
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
                  className="border-b border-b-sky-600 last:border-b-0"
                >
                  <td className="text-left px-2 border-r border-r-sky-600 whitespace-nowrap overflow-clip text-ellipsis">
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
                          "text-center px-2 border-r border-r-sky-600",
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
  );
};
