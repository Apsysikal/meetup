import React from "react";

export const NotFound = () => {
  return (
    <div className="flex flex-col gap-1 items-center text-center">
      <h3 className="text-xl font-bold text-slate-700">Not Found</h3>
      <p className="text-slate-600">
        The page you were looking for could not be found.
      </p>
    </div>
  );
};
