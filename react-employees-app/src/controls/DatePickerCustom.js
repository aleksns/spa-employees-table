import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(0.75),
  },
}));

export default function DatePickerCustom(props) {
  const classes = useStyles();
  const { value, name, label, onChange, ...other } = props;

  const convertToDefaultEventParameter = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={classes.root}
        value={value}
        name={name}
        label={label}
        onChange={(date) =>
          onChange(convertToDefaultEventParameter(name, date))
        }
        format="dd/MM/yyyy"
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
}
