import React from "react";
import { useState } from "react";
import { useRef } from "react";

import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";
import { redirect } from "react-router-dom";

import { isSameDay } from "date-fns";
import { setHours } from "date-fns";
import { getHours } from "date-fns";
import { setMinutes } from "date-fns";
import { getMinutes } from "date-fns";
import { isBefore } from "date-fns";
import { isAfter } from "date-fns";
import { parseISO } from "date-fns";
import { parse as parseDate } from "date-fns";
import { format as formatDate } from "date-fns";
import { isEqual } from "date-fns";

import { RemoveCircle } from "@mui/icons-material";

import { Calendar } from "components/Calendar";

import { createMeeting } from "api/meeting";

type ActionErrors = {
  title?: string;
  name?: string;
  email?: string;
  dates?: string;
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const name = formData.get("name") as string;
  // const email = formData.get("email") as string;
  const dates = formData
    .getAll("dates")
    .map((date) => parseISO(date as string));

  const errors: ActionErrors = {};

  if (!title) errors.title = "Title is required";
  if (!name) errors.name = "Name is required";
  // if (!email) errors.email = "Email is required";
  if (dates.length === 0) errors.dates = "Minimum one date is required";

  if (Object.keys(errors).length) return errors;

  const meeting = await createMeeting({
    title,
    creator: name,
    creatorEmail: "",
    dates: dates.map((date) => date.toISOString()),
  });

  return redirect(`/event/${meeting.id}/results`);
};

export const NewEvent = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [meetings, setMeetings] = useState<Date[]>([]);
  const meetingTime = useRef<HTMLInputElement>(null);

  const errors = useActionData() as undefined | ActionErrors;

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
    const time = parseDate(
      String(meetingTime.current?.value) || "00:00",
      "HH:mm",
      new Date()
    );

    newMeetings = newMeetings.map((m) => {
      let meeting = m;

      meeting = setHours(meeting, getHours(time));
      meeting = setMinutes(meeting, getMinutes(time));

      return meeting;
    });

    setMeetings((currentMeetings) => [...currentMeetings, ...newMeetings]);
    setSelectedDates(() => []);
  };

  const handleOptionDeleteClick = (date: Date) => {
    let newMeetings = [...meetings];

    newMeetings = meetings.filter((meeting) => {
      return !isEqual(meeting, date);
    });

    setMeetings([...newMeetings]);
  };

  return (
    <>
      <div className="w-full">
        <div>
          <div className="w-full">
            <Form method="post" className="flex flex-col gap-2 items-center">
              <p className="flex flex-col gap-1 w-full">
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
                {Boolean(errors?.title) && (
                  <span className="text-xs font-normal text-red-400">
                    {errors?.title}
                  </span>
                )}
              </p>
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
                {Boolean(errors?.name) && (
                  <span className="text-xs font-normal text-red-400">
                    {errors?.name}
                  </span>
                )}
              </div>
              {/* <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-slate-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  className="text-sm font-normal text-slate-600 border border-gray-300 rounded-md shadow-md px-2 leading-8 ring-none outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
                {Boolean(errors?.email) && (
                  <span className="text-xs font-normal text-red-400">
                    {errors?.email}
                  </span>
                )}
              </div> */}
              <div className="flex flex-col gap-1 w-full">
                <span className="text-xs font-semibold text-slate-700">
                  Date
                </span>
                <div className="border border-gray-100 rounded-md shadow-md p-3">
                  <Calendar
                    selectedDates={selectedDates}
                    meetings={meetings}
                    onDateClick={handleDateClick}
                  />
                </div>
                {Boolean(errors?.dates) && (
                  <span className="dext-xs font-normal text-red-400">
                    {errors?.dates}
                  </span>
                )}
                {Boolean(selectedDates.length) ? (
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row gap-1 items-center w-full justify-center">
                      <p className="text-sm font-normal text-slate-600">
                        Event time:
                      </p>
                      <input
                        type="time"
                        name="meetingTime"
                        id="meetingTime"
                        ref={meetingTime}
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
                        Add Options
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-normal text-slate-300 text-center">
                      Select one or multiple dates in the calendar
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full items-start gap-1">
                <p className="text-xs font-semibold text-slate-700 mb-1">
                  Current Voting Options
                </p>
                {meetings
                  // .filter((meeting) =>
                  //   selectedDates.some((day) => {
                  //     return isSameDay(day, meeting);
                  //   })
                  // )
                  .sort((a, b) => {
                    if (isAfter(a, b)) return 1;
                    if (isBefore(a, b)) return -1;
                    return 0;
                  })
                  .map((meeting, index) => {
                    return (
                      <div
                        key={`meeting-${index}`}
                        className="w-full flex flex-row p-2 border border-gray-300 rounded-md shadow-md items-center"
                      >
                        <input
                          type="datetime"
                          hidden
                          name="dates"
                          defaultValue={meeting.toISOString()}
                        />
                        <time
                          dateTime={formatDate(meeting, "yyyy-MM-dd-HH-mm")}
                          className="text-xs font-medium flex flex-row w-full text-slate-600"
                        >
                          {formatDate(meeting, "dd MMMM yyyy HH:mm")}
                        </time>
                        <button
                          type="button"
                          onClick={() => handleOptionDeleteClick(meeting)}
                          className="flex text-slate-600 hover:text-red-600"
                        >
                          <RemoveCircle fontSize="inherit" />
                        </button>
                      </div>
                    );
                  })}
              </div>

              {Boolean(meetings.length) && (
                <>
                  <div>
                    <button
                      type="submit"
                      name="save"
                      id="save"
                      className="text-sm font-normal uppercase text-white px-2 py-1 leading-6 bg-sky-500 rounded-md hover:bg-sky-400 active:ring active:ring-sky-400 shadow-md"
                    >
                      Create Poll
                    </button>
                  </div>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
