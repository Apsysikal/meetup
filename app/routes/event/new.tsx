import { useState } from "react";
import { useRef } from "react";

import { Form } from "@remix-run/react";
import { useActionData } from "@remix-run/react";

import { redirect } from "@remix-run/node";

import { isEqual } from "date-fns";
import { parse } from "date-fns";
import { set } from "date-fns";
import { isAfter } from "date-fns";
import { isBefore } from "date-fns";
import { parseISO } from "date-fns";

import type { ActionArgs } from "@remix-run/node";

import { Button } from "~/components/Button";
import { Calendar } from "~/components/Calendar";
import { VotingOption } from "~/components/VotingOption";
import { TextInput } from "~/components/forms/TextInput";
import { TimeInput } from "~/components/forms/TimeInput";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

function validateTitle(title: string) {
  if (!title) return "You must provide a title";
  if (title.length < 3) return "That title is too short";
}

function validateName(name: string) {
  if (!name) return "You must provide a name";
  if (name.length < 1) return "That name is too short";
}

function validateDates(dates: string[]) {
  if (dates.length < 1) return "At least one option is required";
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const name = formData.get("name") as string;
  const dates = formData.getAll("dates") as string[];

  const fields = {
    title,
    name,
    dates,
  };

  const fieldErrors = {
    title: validateTitle(title),
    name: validateName(name),
    dates: validateDates(dates),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const event = await db.event.create({
    data: {
      title,
      creator: name,
      options: dates,
    },
  });

  return redirect(`/event/${event.id}`);
};

export default function EventNewRoute() {
  const actionData = useActionData<typeof action>();

  const [dates, setDates] = useState<Date[]>([]);
  const [meetings, setMeetings] = useState<Date[]>(
    () => actionData?.fields.dates.map((date) => parseISO(date)) || []
  );
  const meetingTime = useRef<HTMLInputElement>(null);

  const handleDateClick = (clickedDate: Date) => {
    const newDates = [...dates];

    const index = newDates.findIndex((date) => {
      return isEqual(date, clickedDate);
    });

    if (index === -1) return setDates([...newDates, clickedDate]);

    newDates.splice(index, 1);

    return setDates([...newDates]);
  };

  const handleAddOptions = () => {
    const inputTime = String(meetingTime.current?.value) || "00:00";
    const parsedTime = parse(inputTime, "HH:mm", new Date());

    let newMeetings = [...dates];

    newMeetings = newMeetings.map((meeting) => {
      return set(meeting, {
        hours: parsedTime.getHours(),
        minutes: parsedTime.getMinutes(),
      });
    });

    setMeetings((existingMeetings) => [...existingMeetings, ...newMeetings]);
    setDates(() => []);
  };

  const handleRemoveOption = (date: Date) => {
    const newMeetings = meetings.filter((meeting) => {
      return !isEqual(meeting, date);
    });

    setMeetings([...newMeetings]);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-700">Create new meetup</h1>
        <Form method="post" className="flex flex-col gap-2">
          <p className="flex flex-col gap-1 w-full">
            <label
              htmlFor="title"
              className="text-md font-semibold text-slate-700"
            >
              Title
            </label>
            <TextInput
              name="title"
              id="title"
              placeholder="What is your event about?"
              defaultValue={actionData?.fields?.title}
              aria-invalid={Boolean(actionData?.fieldErrors?.title)}
              aria-errormessage={
                actionData?.fieldErrors?.title ? "title-error" : undefined
              }
            />
            {actionData?.fieldErrors?.title && (
              <p className="text-xs text-red-500" role="alert" id="title-error">
                {actionData.fieldErrors.title}
              </p>
            )}
          </p>
          <p className="flex flex-col gap-1 w-full">
            <label
              htmlFor="name"
              className="text-md font-semibold text-slate-700"
            >
              Name
            </label>
            <TextInput
              name="name"
              id="name"
              placeholder="John Doe"
              defaultValue={actionData?.fields?.name}
              aria-invalid={Boolean(actionData?.fieldErrors?.name)}
              aria-errormessage={
                actionData?.fieldErrors?.name ? "name-error" : undefined
              }
            />
            {actionData?.fieldErrors?.name && (
              <p className="text-xs text-red-500" role="alert" id="name-error">
                {actionData.fieldErrors.name}
              </p>
            )}
          </p>
          <span className="text-md font-semibold text-slate-700">Date</span>
          <div className="border border-emerald-700 rounded-md shadow-md px-2 py-2">
            <Calendar
              selectedDates={dates}
              meetings={meetings}
              onDateClick={handleDateClick}
            />
          </div>
          {Boolean(dates.length) && (
            <div className="flex flex-col my-1 gap-2 w-full">
              <TimeInput
                name="meetingTime"
                id="meetingTime"
                label="Event Time"
                ref={meetingTime}
              />
              <div>
                <Button
                  type="button"
                  name="addEvent"
                  id="addEvent"
                  onClick={() => handleAddOptions()}
                >
                  Add Options
                </Button>
              </div>
            </div>
          )}
          {Boolean(meetings.length) && (
            <>
              <div className="flex flex-col w-full items-start gap-1">
                <p className="text-md font-semibold text-slate-700 mb-1">
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
                        onRemoveClick={handleRemoveOption}
                      />
                    );
                  })}
              </div>
              <Button type="submit" name="save" id="save">
                Create Poll
              </Button>
            </>
          )}
        </Form>
      </div>
    </>
  );
}
