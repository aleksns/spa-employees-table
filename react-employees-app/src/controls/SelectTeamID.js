import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    left: theme.spacing(3),
  },
  selectTeamID: {
    width: "52.5%",
  },
}));

export default function SelectTeamID(props) {
  const classes = useStyles();
  const { value, name, label, onChange, items, error = null } = props;

  return (
    <FormControl
      classes={{ root: classes.root }}
      variant="outlined"
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        className={classes.selectTeamID}
        labelId="team_id-select-outlined-label"
        id="team_id-select-outlined"
        value={value}
        name={name}
        label={label}
        onChange={onChange}
      >
        <MenuItem value="">
          <em>--ID--</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.id}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
