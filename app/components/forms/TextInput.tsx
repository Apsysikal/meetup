import type { ComponentProps } from "react";

type TextInputProps = ComponentProps<"input">;

export const TextInput = ({ type, ...props }: TextInputProps) => {
  return (
    <input
      type="text"
      className="border-emerald-700 rounded-md shadow-md focus:ring-emerald-700 focus:border-emerald-700 placeholder:text-slate-300 text-slate-700"
      {...props}
    />
  );
};
