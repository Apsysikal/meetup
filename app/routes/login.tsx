import { Form } from "@remix-run/react";
import { useActionData } from "@remix-run/react";
import { useSearchParams } from "@remix-run/react";

import type { ActionArgs } from "@remix-run/node";

import { TextInput } from "~/components/forms/TextInput";
import { PasswordInput } from "~/components/forms/PasswordInput";
import { Button } from "~/components/Button";

import { login } from "~/utils/session.server";
import { createUserSession } from "~/utils/session.server";
import { badRequest } from "~/utils/request.server";

function validateUsername(username: string) {
  if (!username) return "You must provide a username";
  if (username.length < 4) return "That username is too short";
}

function validatePassword(password: string) {
  if (!password) return "You must provide a password";
  if (password.length < 6) return "That password is too short";
}

/**
 * Validate the preferred redirect url against a predefined array of valid urls.
 * @param url The url to redirect to
 * @returns Returns the url to redirect to, validated against an array of valid redirects.
 */
function validateRedirectUrl(url: string) {
  const allowedUrls = ["/"];

  if (allowedUrls.includes(url)) {
    return url;
  }

  return "/";
}

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();

  const username = body.get("username") as string;
  const password = body.get("password") as string;
  const redirectTo = validateRedirectUrl(body.get("redirect") as string);

  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  const fields = {
    username,
    password,
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const user = await login(username, password);

  if (!user) {
    return badRequest({
      fieldErrors: null,
      fields,
      formError: "Username or password didn't match",
    });
  }

  return createUserSession(user.id, redirectTo);
};

export default function LoginRoute() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-3xl font-bold text-gray-700">Login</h1>
      <Form method="post" className="flex flex-col gap-3">
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get("redirect") ?? undefined}
        />
        <p className="flex flex-col gap-1">
          <label
            htmlFor="username"
            className="text-md font-semibold text-slate-700"
          >
            Username
          </label>
          <TextInput
            name="username"
            id="username"
            placeholder="What is your event about?"
            defaultValue={actionData?.fields?.username}
            aria-invalid={Boolean(actionData?.fieldErrors?.username)}
            aria-errormessage={
              actionData?.fieldErrors?.username ? "username-error" : undefined
            }
          />
          {actionData?.fieldErrors?.username && (
            <p
              className="text-xs text-red-500"
              role="alert"
              id="username-error"
            >
              {actionData.fieldErrors.username}
            </p>
          )}
        </p>
        <p className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-md font-semibold text-slate-700"
          >
            Username
          </label>
          <PasswordInput
            name="password"
            id="password"
            placeholder="What is your event about?"
            defaultValue={actionData?.fields?.password}
            aria-invalid={Boolean(actionData?.fieldErrors?.password)}
            aria-errormessage={
              actionData?.fieldErrors?.password ? "password-error" : undefined
            }
          />
          {actionData?.fieldErrors?.password && (
            <p
              className="text-xs text-red-500"
              role="alert"
              id="password-error"
            >
              {actionData.fieldErrors.password}
            </p>
          )}
        </p>
        <div>
          {actionData?.formError && (
            <p
              className="text-xs text-red-500"
              role="alert"
              id="password-error"
            >
              {actionData.formError}
            </p>
          )}
          <Button type="submit">Login</Button>
        </div>
      </Form>
    </div>
  );
}
