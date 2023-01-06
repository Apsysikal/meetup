import { clsx } from "clsx";

type LabelProps = JSX.IntrinsicElements["label"];

export const Label = ({ className, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      className={clsx("font-semibold text-slate-700", className)}
    />
  );
};

type InputProps = JSX.IntrinsicElements["input"];

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={clsx(
        "border-emerald-700 focus:border-emerald-700",
        "focus:ring-emerald-700 focus:ring-offset-2",
        "text-gray-700",
        "placeholder:text-gray-300",
        "rounded-md shadow-md",
        className
      )}
    />
  );
};

type FieldErrorProps = JSX.IntrinsicElements["p"] & {
  id: Pick<JSX.IntrinsicElements["p"], "id">;
  role?: Pick<JSX.IntrinsicElements["p"], "role">;
};

export const FieldError = ({
  id,
  role = "alert",
  className,
  children,
  ...props
}: FieldErrorProps) => {
  return (
    <p id={id} role={role} {...props} className={clsx()}>
      {children}
    </p>
  );
};
