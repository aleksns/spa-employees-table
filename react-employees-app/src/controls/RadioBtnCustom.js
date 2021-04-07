import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React from "react";

export default function RadioBtnCustom(props) {
  const { name, label, value, onChange, items, ...other } = props;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row value={value} name={name} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio color="primary" />}
            label={item.title}
            {...other}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
