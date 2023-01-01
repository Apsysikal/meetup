import { clsx } from "clsx";

import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "contained" | "outlined" | "text";
  size?: "lg" | "md" | "sm";
};

const baseClasses = clsx(["font-normal", "uppercase", "rounded-md"]);

const containedClasses = clsx([
  "shadow-md",
  "text-white",
  "bg-emerald-700",
  "border",
  "border-emerald-700",
  "hover:bg-emerald-800",
  "hover:border-emerald-800",
  "active:ring-1",
  "active:ring-emerald-700",
]);

const outlinedClasses = clsx([
  "shadow-md",
  "text-emerald-700",
  "bg-white",
  "border",
  "border-emerald-700",
  "hover:bg-slate-100",
  "active:ring-1",
  "active:ring-emerald-700",
]);

const textClasses = clsx([
  "text-emerald-700",
  "hover:bg-slate-100",
  "active:bg-slate-200",
]);

const smallClasses = clsx(["text-sm", "px-2", "py-1"]);

const mediumClasses = clsx(["text-md", "px-3", "py-1"]);

const largeClasses = clsx(["text-lg", "px-4", "py-1"]);

export const Button = ({
  children,
  variant = "contained",
  size = "md",
  className,
  ...rest
}: ButtonProps) => {
  const classes = clsx([
    variant === "contained" && containedClasses,
    variant === "outlined" && outlinedClasses,
    variant === "text" && textClasses,
    size === "lg" && largeClasses,
    size === "md" && mediumClasses,
    size === "sm" && smallClasses,
    baseClasses,
    className ? className : "",
  ]);

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};
