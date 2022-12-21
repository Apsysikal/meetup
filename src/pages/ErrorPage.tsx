import React from "react";

import { useRouteError } from "react-router-dom";
import { isRouteErrorResponse } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError() as Error;
  let status = 0;
  let message = error.message;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText;
  }

  return (
    <div className="flex flex-col gap-1 items-center text-center">
      <h3 className="text-xl font-bold text-red-500">Something went wrong.</h3>
      {Boolean(status) && <p className="text-slate-600">{status}</p>}
      <p className="text-slate-600">{message}</p>
    </div>
  );
};
