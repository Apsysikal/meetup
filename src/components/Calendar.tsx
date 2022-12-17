import React from "react";
import { useState } from "react";

import { getDay } from "date-fns";
import { isToday } from "date-fns";
import { startOfToday } from "date-fns";
import { eachDayOfInterval } from "date-fns";
import { format as formatDate } from "date-fns";
import { parse as parseDate } from "date-fns";
import { endOfMonth } from "date-fns";
import { add as addDate } from "date-fns";
import { startOfWeek } from "date-fns";
import { endOfWeek } from "date-fns";
import { isSameMonth } from "date-fns";
import { isSameDay } from "date-fns";
import { isAfter } from "date-fns";
import { isBefore } from "date-fns";

import { ChevronLeft } from "@mui/icons-material";
import { ChevronRight } from "@mui/icons-material";
import { RemoveCircle } from "@mui/icons-material";

type CalendarProps = {
  selectedDates: Date[];
  meetings: Date[];
  onDateClick: (date: Date) => void;
};

const dayStartClasses = [
  "col-start-7", // Sunday
  "col-start-1", // Monday
  "col-start-2", // Tuesday
  "col-start-3", // Wednesday
  "col-start-4", // Thursday
  "col-start-5", // Friday
  "col-start-6", // Saturday
];

const classNames = (classes: Array<string | boolean>) => {
  return classes.filter(Boolean).join(" ");
};

export const Calendar = ({
  selectedDates,
  meetings,
  onDateClick,
}: CalendarProps) => {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(
    formatDate(today, "MMM-yyyy")
  );
  const firstDayOfCurrentMonth = parseDate(currentMonth, "MMM-yyyy", today);

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth), { weekStartsOn: 1 }),
  });

  const previousMonth = () => {
    const firstDayOfPreviousMonth = addDate(firstDayOfCurrentMonth, {
      months: -1,
    });
    setCurrentMonth(formatDate(firstDayOfPreviousMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    const firstDayOfPreviousMonth = addDate(firstDayOfCurrentMonth, {
      months: 1,
    });
    setCurrentMonth(formatDate(firstDayOfPreviousMonth, "MMM-yyyy"));
  };

  const weekdayNames = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between items-center mt-4 mb-4">
          <span className="text-sm font-medium text-slate-600 px-1">
            {formatDate(firstDayOfCurrentMonth, "MMMM yyyy")}
          </span>
          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={() => previousMonth()}
              className="text-sm font-medium text-slate-600 rounded-full hover:bg-gray-100 text-center"
            >
              {<ChevronLeft />}
            </button>
            <button
              type="button"
              onClick={() => nextMonth()}
              className="text-sm font-medium text-slate-600 rounded-full hover:bg-gray-100 text-center"
            >
              {<ChevronRight />}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 items-center">
          {weekdayNames.map((day, index) => {
            return (
              <div
                key={index}
                className="text-xs text-center font-normal text-slate-400 mx-auto"
              >
                {day}
              </div>
            );
          })}
          <span className="col-span-7 h-1" />
          {days.map((day, index) => {
            const isSelected = selectedDates.some((selectedDay) => {
              return isSameDay(selectedDay, day);
            });

            const hasMeeting = meetings.some((meeting) => {
              return isSameDay(meeting, day);
            });

            return (
              <div key={index} className="text-center mx-auto">
                <button
                  type="button"
                  onClick={() => onDateClick(day)}
                  className={classNames([
                    index === 0 && dayStartClasses[getDay(day)],
                    isToday(day) && "border-2 border-gray-300",
                    isSameMonth(day, firstDayOfCurrentMonth) &&
                      "text-slate-600",
                    !isSameMonth(day, firstDayOfCurrentMonth) &&
                      "text-gray-300",
                    isSelected && "bg-sky-500 text-white",
                    "text-xs font-medium p-1 w-7 h-7 rounded-full hover:bg-sky-500 hover:text-white mx-auto",
                  ])}
                >
                  <time dateTime={formatDate(day, "yyyy-MM-dd")}>
                    {formatDate(day, "d")}
                  </time>
                </button>
                <div
                  className={classNames([
                    "h-1 w-1 rounded-full mx-auto mt-1",
                    hasMeeting && "bg-sky-500",
                  ])}
                ></div>
              </div>
            );
          })}
        </div>
        {meetings
          .filter((meeting) =>
            selectedDates.some((day) => {
              return isSameDay(day, meeting);
            })
          )
          .sort((a, b) => {
            if (isAfter(a, b)) return 1;
            if (isBefore(a, b)) return -1;
            return 0;
          })
          .map((meeting) => {
            return (
              <div className="flex flex-row items-center justify-center gap-2">
                <time
                  dateTime={formatDate(meeting, "yyyy-MM-dd-HH-mm")}
                  className="text-sm font-normal text-slate-500"
                >
                  {formatDate(meeting, "dd MMMM HH:mm")}
                </time>
                <button
                  type="button"
                  className="text-sm font-medium text-slate-500 rounded-full text-center h-full"
                >
                  {<RemoveCircle fontSize="small" />}
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};