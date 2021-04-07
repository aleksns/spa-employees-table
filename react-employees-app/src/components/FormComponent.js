import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function FormComponent(
  blankFormValues,
  validateOnChange = false,
  validate
) {
  const [values, setValues] = useState(blankFormValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    type === "checkbox"
      ? setValues({
          ...values,
          [name]: checked,
        })
      : setValues({
          ...values,
          [name]: value,
        });

    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = (e) => {
    setValues(blankFormValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    handleChange,
    resetForm,
    errors,
    setErrors,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();

  const { children, ...other } = props;

  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
