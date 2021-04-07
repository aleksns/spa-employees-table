import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  makeStyles,
  Select,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  selectDep: {
    width: "115%",
  },
}));

export default function SelectDepartment(props) {
  const classes = useStyles();
  const { value, name, label, onChange, items, error = null } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <Select
        className={classes.selectDep}
        labelId="department-select-outlined-label"
        id="department-select-outlined"
        value={value}
        name={name}
        label={label}
        onChange={onChange}
      >
        <MenuItem value="">
          <em>--Select {name}--</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item.id} value={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
