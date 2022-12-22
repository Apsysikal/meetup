import React from "react";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export const Button = ({ type, name, id, children, ...rest }: ButtonProps) => {
  return (
    <button
      type={type}
      name={name}
      id={id}
      className="text-sm font-normal uppercase text-white px-2 py-1 leading-6 bg-sky-500 rounded-md hover:bg-sky-400 active:ring-1 active:ring-sky-400 shadow-md"
      {...rest}
    >
      {children}
    </button>
  );
};
