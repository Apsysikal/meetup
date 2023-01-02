import { forwardRef } from "react";

import type { ComponentProps } from "react";

type TimeInputProps = ComponentProps<"input"> & {
  label: string;
};

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  function TimeInput({ type, id, label, ...props }, ref) {
    return (
      <div className="px-2 py-1 border border-emerald-700 rounded-md shadow-md flex items-center bg-white">
        <label htmlFor={id} className="grow text-slate-700">
          {label}
        </label>
        <input
          type="time"
          id={id}
          ref={ref}
          defaultValue="00:00"
          className="border-none focus:ring-0 bg-slate-100 rounded-md text-slate-700"
          {...props}
        />
      </div>
    );
  }
);
