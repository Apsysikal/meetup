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

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { classNames } from "utils";

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
      <div className="flex flex-col gap-1 w-full bg-white py-1">
        <div className="flex flex-row justify-between items-center mb-4">
          <span className="text-sm font-medium text-slate-800 px-1">
            {formatDate(firstDayOfCurrentMonth, "MMMM yyyy")}
          </span>
          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={() => previousMonth()}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <span className="sr-only">Previous Month</span>
              {<ChevronLeftIcon className="h-4 w-4 stroke  text-slate-800" />}
            </button>
            <button
              type="button"
              onClick={() => nextMonth()}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <span className="sr-only">Next Month</span>
              {<ChevronRightIcon className="h-4 w-4 stroke  text-slate-800" />}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 items-center">
          {weekdayNames.map((day, index) => {
            return (
              <div
                key={`weekday-${index}`}
                className="text-xs text-center font-normal text-slate-500 mx-auto"
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
              <div key={`day-${index}`} className="text-center mx-auto">
                <button
                  type="button"
                  onClick={() => onDateClick(day)}
                  className={classNames([
                    index === 0 && dayStartClasses[getDay(day)],
                    isToday(day) && "border-2 border-slate-400",
                    isSameMonth(day, firstDayOfCurrentMonth) &&
                      !isSelected &&
                      "text-slate-800",
                    isSameMonth(day, firstDayOfCurrentMonth) &&
                      isSelected &&
                      "bg-primary-800 text-white",
                    !isSameMonth(day, firstDayOfCurrentMonth) &&
                      !isSelected &&
                      "text-slate-500",
                    !isSameMonth(day, firstDayOfCurrentMonth) &&
                      isSelected &&
                      "bg-primary-800 text-white",
                    "text-xs font-medium p-1 w-7 h-7 rounded-full hover:bg-primary-800 hover:text-white mx-auto",
                  ])}
                >
                  <time dateTime={formatDate(day, "yyyy-MM-dd")}>
                    {formatDate(day, "d")}
                  </time>
                </button>
                <div
                  className={classNames([
                    "h-1 w-1 rounded-full mx-auto mt-1",
                    hasMeeting && "bg-primary-800",
                  ])}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
