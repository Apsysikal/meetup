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
      className="border-sky-500 rounded-md shadow-md focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-300 text-slate-700 text-sm"
    />
  );
};
