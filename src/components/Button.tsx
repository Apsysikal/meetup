import React from "react";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
};

const primaryClasses =
  "text-sm font-normal uppercase text-white px-2 py-1 leading-6 bg-sky-500 rounded-md hover:bg-sky-400 active:ring-1 active:ring-sky-400 shadow-md";

const secondaryClasses =
  "text-sm font-normal uppercase text-sky-500 px-2 py-1 leading-6 bg-white rounded-md border border-sky-500 hover:bg-slate-100 active:ring-1 active:ring-sky-500 shadow-md";

export const Button = ({
  type,
  name,
  id,
  children,
  variant = "primary",
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      name={name}
      id={id}
      className={variant === "primary" ? primaryClasses : secondaryClasses}
      {...rest}
    >
      {children}
    </button>
  );
};
