import React from "react";
import { useState } from "react";

import { isSameDay } from "date-fns";

import { Calendar } from "components/Calendar";

export const NewEvent = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [meetings, setMeetings] = useState<Date[]>([]);

  const handleDateClick = (date: Date) => {
    return setSelectedDates((currentDates) => {
      const updatedDates = [...currentDates];
      const index = currentDates.findIndex((day) => isSameDay(day, date));

      if (index === -1) {
        return [...updatedDates, date];
      }

      updatedDates.splice(index, 1);
      return updatedDates;
    });
  };

  return (
    <>
      <div>
        <div className="max-w-md mx-auto my-auto">
          <div className="p-3 border border-gray-100 rounded-md shadow-md">
            <div className="flex flex-col gap-2 items-center">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="title"
                  className="text-xs font-semibold text-slate-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="What is your event about?"
                  className="text-sm font-normal text-slate-600 border border-gray-300 rounded-md shadow-md px-2 leading-8 ring-none outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-slate-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  className="text-sm font-normal text-slate-600 border border-gray-300 rounded-md shadow-md px-2 leading-8 ring-none outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-slate-700"
                >
                  Title
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  className="text-sm font-normal text-slate-600 border border-gray-300 rounded-md shadow-md px-2 leading-8 ring-none outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-700">
                  Date
                </span>
                <Calendar
                  selectedDates={selectedDates}
                  meetings={meetings}
                  onDateClick={handleDateClick}
                />
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
