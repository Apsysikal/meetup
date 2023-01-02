import type { ComponentProps } from "react";

type PasswordInputProps = ComponentProps<"input">;

export const PasswordInput = ({ type, ...props }: PasswordInputProps) => {
  return (
    <input
      type="password"
      className="border-emerald-700 rounded-md shadow-md focus:ring-emerald-700 focus:border-emerald-700 placeholder:text-slate-300 text-slate-700"
      {...props}
    />
  );
};
