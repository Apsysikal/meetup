import React from "react";
import { useState } from "react";
import { useRef } from "react";

import { isSameDay } from "date-fns";
import { setHours } from "date-fns";
import { getHours } from "date-fns";
import { setMinutes } from "date-fns";
import { getMinutes } from "date-fns";
import { parse as parseDate } from "date-fns";

import { Calendar } from "components/Calendar";

export const NewEvent = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [meetings, setMeetings] = useState<Date[]>([]);
  const meetingStartTime = useRef<HTMLInputElement>(null);

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

  const handleAddEventClick = () => {
    let newMeetings = [...selectedDates];
    const meetingTime = parseDate(
      String(meetingStartTime.current?.value),
      "HH:mm",
      new Date()
    );

    console.debug(meetingTime);

    newMeetings = newMeetings.map((m) => {
      let meeting = m;

      meeting = setHours(meeting, getHours(meetingTime));
      console.debug(meeting);
      meeting = setMinutes(meeting, getMinutes(meetingTime));
      console.debug(meeting);

      return meeting;
    });

    console.debug();

    setMeetings((currentMeetings) => [...currentMeetings, ...newMeetings]);
    setSelectedDates(() => []);
  };

  return (
    <>
      <div>
        <div className="max-w-md mx-auto my-auto">
          <div className="p-3 border border-gray-100 rounded-md shadow-md">
            <div className="flex flex-col gap-2 items-center">
              <div className="flex flex-col gap-1 w-full">
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
              <div className="flex flex-col gap-1 w-full">
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
              <div className="flex flex-col gap-1 w-full">
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
              <div className="flex flex-col gap-1 w-full">
                <span className="text-xs font-semibold text-slate-700">
                  Date
                </span>
                <Calendar
                  selectedDates={selectedDates}
                  meetings={meetings}
                  onDateClick={handleDateClick}
                />
              </div>
              {Boolean(selectedDates.length) ? (
                <>
                  <div className="flex flex-row gap-1 items-center w-full justify-center">
                    <p className="text-sm font-normal text-slate-600">
                      Event time:
                    </p>
                    <input
                      type="time"
                      name="startTime"
                      id="startTime"
                      ref={meetingStartTime}
                      required
                      className="text-sm font-normal text-slate-600"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      name="addEvent"
                      id="addEvent"
                      onClick={() => handleAddEventClick()}
                      className="text-sm font-normal uppercase text-white px-2 py-1 leading-6 bg-sky-500 rounded-md hover:bg-sky-400 active:ring active:ring-sky-400 shadow-md"
                    >
                      Add Event
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-sm font-normal text-slate-300">
                    Select one or multiple dates in the calendar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
