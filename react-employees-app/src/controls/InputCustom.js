import React from "react";
import { TextField } from "@material-ui/core";

export default function InputCustom(props) {
  const { value, name, label, type, onChange, error = null, ...other } = props;

  return (
    <TextField
      value={value}
      name={name}
      label={label}
      type={type || "text"}
      onChange={onChange}
      variant="outlined"
      error={error}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
