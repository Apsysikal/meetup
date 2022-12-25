import React from "react";

type TextInputProps = {
  name: string;
  id: string;
  placeholder: string;
  classes?: string;
};

export const TextInput = ({
  name,
  id,
  placeholder,
  classes,
}: TextInputProps) => {
  return (
    <input
      type="text"
      name={name}
      id={id}
      placeholder={placeholder}
      className="border-sky-600 rounded-md shadow-md focus:ring-sky-600 focus:border-sky-600 placeholder:text-slate-300 text-slate-700 text-sm"
    />
  );
};
