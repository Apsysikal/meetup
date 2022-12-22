import React from "react";

import { Form } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useActionData } from "react-router-dom";

import { parseISO } from "date-fns";
import { format as formatDate } from "date-fns";

import { getMeeting } from "api/meeting";
import { createMeetingResponse } from "api/meeting";

import { TextInput } from "components/forms/TextInput";
import { Button } from "components/Button";

type LoaderParams = {
  params: {
    eventId: string;
  };
};

type ActionErrors = {
  name?: string;
};

export const action = async ({
  params,
  request,
}: {
  params: { eventId: string };
  request: Request;
}) => {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const dates = formData.getAll("checkbox") as string[]; // Gets only checked dates

  const errors: ActionErrors = {};

  if (!name) errors.name = "Name is required";

  if (Object.keys(errors).length) return errors;

  await createMeetingResponse({
    name,
    dates,
    meetingId: params.eventId,
  });

  return redirect("results");
};

export const loader = async ({ params }: LoaderParams) => {
  const meeting = await getMeeting(params.eventId);
  return { meeting };
};

export const Event = () => {
  const navigate = useNavigate();
  const { meeting } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const errors = useActionData() as undefined | ActionErrors;

  return (
    <>
      <div>
        <div>
          <article>
            <h3 className="text-xl font-bold text-slate-600">
              {meeting.title}
            </h3>
            <p className="text-xs font-normal text-slate-400">
              {`Created by: ${meeting.creator}`}
            </p>
            <Form method="post" className="flex flex-col mt-1 gap-2">
              <input
                type="text"
                name="meetingId"
                hidden
                defaultValue={meeting.id}
              />
              <div>
                {meeting.dates.map((date, index) => {
                  const parsedDate = parseISO(date);

                  return (
                    <div
                      key={`meeting-${index}`}
                      className="flex flex-row items-center gap-2"
                    >
                      <input
                        name="checkbox"
                        type="checkbox"
                        value={date}
                        className="border border-sky-500 rounded-sm checked:bg-sky-500 checked:hover:bg-sky-600"
                      />
                      <p className="flex flex-row gap-2 text-md font-normal text-slate-600">
                        <span>{formatDate(parsedDate, "dd MMMM yyyy")}</span>
                        <span>{formatDate(parsedDate, "HH:mm")}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-1 w-full mt-2">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-slate-700"
                >
                  Name
                </label>
                <TextInput name="name" id="name" placeholder="John Doe" />
                {Boolean(errors?.name) && (
                  <span className="text-xs font-normal text-red-400">
                    {errors?.name}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
                <Button type="submit" name="save" id="save">
                  Save
                </Button>
                <Button
                  type="button"
                  name="results"
                  id="results"
                  variant="secondary"
                  onClick={() => navigate("results")}
                >
                  See results
                </Button>
              </div>
            </Form>
          </article>
        </div>
      </div>
    </>
  );
};
