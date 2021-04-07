import { FormControl, FormHelperText, InputLabel } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import NumberFormat from "react-number-format";

function FormatCurrencyCustom(props) {
  const { inputRef, value, ...other } = props;
  return (
    <NumberFormat
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      value={value}
      thousandSeparator={true}
      prefix={"$"}
    />
  );
}

FormatCurrencyCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function SalaryInput(props) {
  const { value, name, label, onChange, error = null } = props;

  return (
    <div>
      <FormControl variant="outlined" {...(error && { error: true })}>
        <InputLabel shrink htmlFor="component-outlined">
          {label}
        </InputLabel>
        <OutlinedInput
          labelId="salary-input-label"
          id="salary-input"
          placeholder="In US dollars"
          notched
          labelWidth="50"
          value={value}
          name={name}
          onChange={onChange}
          inputComponent={FormatCurrencyCustom}
          inputProps={{
            value,
          }}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
}
