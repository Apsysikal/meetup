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
import { isEqual } from "date-fns";

import { Calendar } from "components/Calendar";
import { TextInput } from "components/forms/TextInput";
import { Button } from "components/Button";
import { VotingOption } from "components/VotingOption";

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
            <Form method="post" className="flex flex-col gap-2">
              <p className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="title"
                  className="text-xs font-semibold text-slate-700"
                >
                  Title
                </label>
                <TextInput
                  name="title"
                  id="title"
                  placeholder="What is your event about?"
                />
                {Boolean(errors?.title) && (
                  <span className="text-xs font-normal text-red-500">
                    {errors?.title}
                  </span>
                )}
              </p>
              <p className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-slate-700"
                >
                  Name
                </label>
                <TextInput name="name" id="name" placeholder="John Doe" />
                {Boolean(errors?.name) && (
                  <span className="text-xs font-normal text-red-500">
                    {errors?.name}
                  </span>
                )}
              </p>
              <div className="flex flex-col gap-1 w-full">
                <span className="text-xs font-semibold text-slate-700">
                  Date
                </span>
                <div className="border border-primary-700 rounded-md shadow-md px-2 pb-2">
                  <Calendar
                    selectedDates={selectedDates}
                    meetings={meetings}
                    onDateClick={handleDateClick}
                  />
                </div>
                {Boolean(errors?.dates) && (
                  <span className="text-xs font-normal text-red-500">
                    {errors?.dates}
                  </span>
                )}
                {Boolean(selectedDates.length) ? (
                  <div className="flex flex-col my-1 gap-1">
                    <div className="flex flex-row gap-1 items-center w-full">
                      <p className=" text-sm text-slate-700">Event time:</p>
                      <input
                        type="time"
                        name="meetingTime"
                        id="meetingTime"
                        ref={meetingTime}
                        required
                        className="border-none text-sm text-slate-700 focus:border-none focus:ring-0"
                      />
                    </div>
                    <div>
                      <Button
                        type="button"
                        name="addEvent"
                        id="addEvent"
                        onClick={() => handleAddEventClick()}
                      >
                        Add Options
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-normal text-slate-300">
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
                  .sort((a, b) => {
                    if (isAfter(a, b)) return 1;
                    if (isBefore(a, b)) return -1;
                    return 0;
                  })
                  .map((meeting, index) => {
                    return (
                      <VotingOption
                        key={`meeting-${index}`}
                        meeting={meeting}
                        onRemoveClick={handleOptionDeleteClick}
                      />
                    );
                  })}
              </div>
              {Boolean(meetings.length) && (
                <>
                  <div>
                    <Button type="submit" name="save" id="save">
                      Create Poll
                    </Button>
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
