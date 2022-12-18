import React from "react";

import { Form } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useActionData } from "react-router-dom";

import { parseISO } from "date-fns";
import { format as formatDate } from "date-fns";

import { getMeeting } from "api/meeting";

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
  const dates = formData.getAll("checkbox"); // Gets only checked dates

  console.debug(params.eventId);

  const errors: ActionErrors = {};

  if (!name) errors.name = "Name is required";

  if (Object.keys(errors).length) return errors;
};

export const loader = async ({ params }: LoaderParams) => {
  const meeting = await getMeeting(params.eventId);
  return { meeting };
};

export const Event = () => {
  const { meeting } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const errors = useActionData() as undefined | ActionErrors;

  return (
    <>
      <div className="max-w-md mx-auto my-auto">
        <div className="p-3 border border-gray-100 rounded-md shadow-md">
          <article>
            <h3 className="text-xl font-bold text-slate-600">
              {meeting.title}
            </h3>
            <p className="text-xs font-normal text-slate-400">
              {`Created by: ${meeting.creator}`}
            </p>
            <Form method="post" className="flex flex-col mt-1">
              <input
                type="text"
                name="meetingId"
                hidden
                defaultValue={meeting.id}
              />
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
                      className="appearance-none h-4 w-4 border border-sky-500 rounded-sm checked:bg-sky-500"
                    />
                    <p className="flex flex-row gap-2 text-md font-normal text-slate-600">
                      <span>{formatDate(parsedDate, "dd MMMM yyyy")}</span>
                      <span>{formatDate(parsedDate, "HH:mm")}</span>
                    </p>
                  </div>
                );
              })}
              <div className="flex flex-col gap-1 w-full mt-2">
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
              <button
                type="submit"
                name="save"
                id="save"
                className="mt-2 text-sm font-normal uppercase text-white px-2 py-1 leading-6 bg-sky-500 rounded-md hover:bg-sky-400 active:ring active:ring-sky-400 shadow-md"
              >
                Save
              </button>
            </Form>
          </article>
        </div>
      </div>
    </>
  );
};
