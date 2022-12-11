import React from "react";

import { useField } from "formik";

import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material";

type FormTextAreaProps = { name: string } & TextFieldProps;

export const FormTextArea = ({
  name,
  helperText,
  ...props
}: FormTextAreaProps) => {
  const [field, meta] = useField(name);
  const validationError = Boolean(meta.touched && meta.error);

  return (
    <TextField
      fullWidth
      margin="dense"
      variant="standard"
      multiline
      rows={5}
      error={validationError}
      helperText={validationError ? meta.error : helperText}
      {...field}
      {...props}
    />
  );
};
