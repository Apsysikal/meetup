import React from "react";
import { forwardRef } from "react";
import { ComponentProps } from "react";

type TimeInputProps = ComponentProps<"input"> & {
  name: string;
  id: string;
  label: string;
};

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (props, ref) => {
    const { id, label, name } = props;

    return (
      <div className="px-2 py-1 border border-primary-700 rounded-md shadow-md text-sm flex items-center">
        <label htmlFor={id} className="grow text-slate-700">
          {label}
        </label>
        <input
          type="time"
          name={name}
          id={id}
          ref={ref}
          className="border-none focus:ring-0 bg-slate-100 rounded-md text-sm text-slate-700"
        />
      </div>
    );
  }
);
