import React from "react";

import { useField } from "formik";

import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material";

type FormTextFieldProps = { name: string } & TextFieldProps;

export const FormTextField = ({
  name,
  helperText,
  ...props
}: FormTextFieldProps) => {
  const [field, meta] = useField(name);
  const validationError = Boolean(meta.touched && meta.error);

  return (
    <TextField
      fullWidth
      margin="dense"
      variant="standard"
      error={validationError}
      helperText={validationError ? meta.error : helperText}
      {...field}
      {...props}
    />
  );
};
