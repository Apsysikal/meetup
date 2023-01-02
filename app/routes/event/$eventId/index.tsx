import { useActionData } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import { Form } from "@remix-run/react";

import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";

import { format } from "date-fns";
import { parseISO } from "date-fns";

import type { MetaFunction } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";

import { TextInput } from "~/components/forms/TextInput";
import { Button } from "~/components/Button";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return {
      title: "No event",
      "og:title": "No event",
      description: "No event found",
      "og:description": "No event found",
    };
  }

  return {
    title: `Meetup: ${data.event.title}`,
    "og:title": `Meetup: ${data.event.title}`,
    description: `You have been invited to ${data.event.title} by ${data.event.creator}. Make sure to let them know about your availability.`,
    "og:description": `You have been invited to ${data.event.title} by ${data.event.creator}. Make sure to let them know about your availability.`,
  };
};

function validateName(name: string | null) {
  if (!name) return "You must provide a name";
  if (name.length < 3) return "That name is too short";
}

function validateDates(availableDates: string[], selectedDates: string[]) {
  if (selectedDates.length === 0) return undefined; // Not having time on any of the options is valid

  const containsInvalidDate = selectedDates.some((selectedDate) => {
    return !availableDates.includes(selectedDate);
  });

  if (containsInvalidDate) return "Invalid option for this event";
}

export const action = async ({ request, params }: ActionArgs) => {
  const body = await request.formData();
  const event = await db.event.findUnique({
    select: { id: true, options: true },
    where: { id: params.eventId },
  });

  if (!event) {
    throw new Response(`Couldn't find an event with id ${params.eventId}`, {
      status: 404,
    });
  }

  const name = body.get("name") as string;
  const dates = body.getAll("checkbox") as string[];

  const fields = {
    name,
    dates,
  };

  const fieldErrors = {
    name: validateName(name),
    dates: validateDates(event.options, dates),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  await db.eventResponse.create({
    data: {
      eventId: event.id,
      name,
      options: dates,
    },
  });

  return redirect("results");
};

export const loader = async ({ params }: LoaderArgs) => {
  const event = await db.event.findUnique({
    select: { title: true, creator: true, options: true },
    where: { id: params.eventId },
  });

  if (!event) {
    throw new Response(`Couldn't find an event with id ${params.eventId}`, {
      status: 404,
    });
  }

  return json({
    event,
  });
};

export default function EventRoute() {
  const navigate = useNavigate();
  const { event } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <>
      <div>
        <div>
          <article>
            <h1 className="text-3xl font-bold text-slate-700">{event.title}</h1>
            <p className="text-md font-normal text-slate-400">
              {`Created by: ${event.creator}`}
            </p>
            <Form method="post" className="flex flex-col mt-1 gap-2">
              <div>
                {event.options.map((date, index) => {
                  const parsedDate = parseISO(date);

                  return (
                    <div
                      key={`event-${index}`}
                      className="flex flex-row items-center gap-2"
                    >
                      <input
                        name="checkbox"
                        type="checkbox"
                        value={date}
                        defaultChecked={actionData?.fields.dates.includes(date)}
                        className="border border-emerald-700 rounded-sm checked:bg-emerald-700 checked:hover:bg-emerald-700"
                      />
                      <p className="flex flex-row gap-2 font-normal text-slate-700">
                        <span>{format(parsedDate, "dd MMMM yyyy")}</span>
                        <span>{format(parsedDate, "HH:mm")}</span>
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
                  <p
                    className="text-xs text-red-500"
                    role="alert"
                    id="name-error"
                  >
                    {actionData.fieldErrors.name}
                  </p>
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
                  variant="outlined"
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
}
