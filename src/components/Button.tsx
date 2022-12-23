import React from "react";
import { ComponentProps } from "react";

import { classNames } from "utils";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "contained" | "outlined" | "text";
  size?: "lg" | "md" | "sm";
};

const baseClasses = classNames([
  "font-normal",
  "uppercase",
  "rounded-md",
]);

const containedClasses = classNames([
  "shadow-md",
  "text-white",
  "bg-sky-700",
  "border",
  "border-sky-700",
  "hover:bg-sky-800",
  "hover:border-sky-800",
  "active:ring-1",
  "active:ring-sky-700",
]);

const outlinedClasses = classNames([
  "shadow-md",
  "text-sky-700",
  "bg-white",
  "border",
  "border-sky-700",
  "hover:bg-slate-100",
  "active:ring-1",
  "active:ring-sky-700",
]);

const textClasses = classNames([
  "text-sky-700",
  "hover:bg-slate-100",
  "active:bg-slate-200",
]);

const smallClasses = classNames([
  "text-sm",
  "px-2",
  "py-1"
]);

const mediumClasses = classNames([
  "text-md",
  "px-3",
  "py-1"
]);

const largeClasses = classNames([
  "text-lg",
  "px-4",
  "py-1"
]);

export const Button = ({
  children,
  variant="contained",
  size="md",
  ...rest
}: ButtonProps) => {
  const classes = classNames([
    variant === "contained" && containedClasses,
    variant === "outlined" && outlinedClasses,
    variant === "text" && textClasses,
    size === "lg" && largeClasses,
    size === "md" && mediumClasses,
    size === "sm" && smallClasses,
    baseClasses
  ]);

  return (
    <button
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
};
