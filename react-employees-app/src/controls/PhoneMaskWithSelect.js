import {
  FormControl,
  InputBase,
  InputLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import NumberFormat from "react-number-format";
import * as services from "../services/services";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  inputPhone: {
    right: theme.spacing(5),
  },
  inputPhoneField: {
    width: "86.7%",
  },
  selectphone: {
    width: "70%",
  },
}));

const countries = services.getCountries();

function NumberFormatCustom(props) {
  const {
    inputRef,
    value,
    phoneInputValue,
    phone,
    isEditForm,
    ...other
  } = props;

  if (isEditForm) {
    return <InputBase {...other} value={value} />;
  } else {
    return (
      <NumberFormat
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputEvent : null);
        }}
        format={"+" + phone + " (###) ###-####"}
        value={phoneInputValue}
        mask="_"
      />
    );
  }
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function PhoneMaskWithSelect(props) {
  const classes = useStyles();
  const { value, name, label, isEditForm, onChange } = props;

  const [phone, setPhone] = useState("1");
  const [inputEvent, setinputEvent] = useState();
  const [phoneInputValue, setPhoneInputValue] = useState(value);

  const [selectValue, setselectValue] = useState(countries[230]);
  const [selectInputValue, setSelectInputValue] = useState("");

  const placeHolder = "+" + phone + " (123) 456-7890";

  const displayCountryAndPhone = (item) => {
    return !isEditForm ? "(" + item.code + ")+" + item.phone : "";
  };

  const handleSelectChange = async (value) => {
    setPhone(value.phone);
    setselectValue(value);

    if (inputEvent) {
      await setPhoneInputValue(inputEvent.value);
      onChange(inputEvent);
    }
  };

  const handleInputChange = (e) => {
    setinputEvent(e);
    setPhoneInputValue(e.target.value);
    onChange(e);
  };

  useEffect(() => {
    if (value == "") {
      setPhoneInputValue("");
    }
  }, [value]);

  return (
    <div className={classes.root}>
      <Autocomplete
        disabled={isEditForm}
        className={classes.selectphone}
        value={selectValue}
        selectValue={selectValue}
        onChange={(event, newValue) => {
          if (newValue) {
            handleSelectChange(newValue);
          }
        }}
        inputValue={selectInputValue}
        onInputChange={(event, newInputValue) => {
          setSelectInputValue(newInputValue);
        }}
        id="select-phone-code"
        options={countries}
        getOptionLabel={(option) => displayCountryAndPhone(option)}
        renderOption={(option) => (
          <div>
            <span>
              ({option.code}) +{option.phone}
            </span>
          </div>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
      <FormControl variant="outlined" classes={{ root: classes.inputPhone }}>
        <InputLabel shrink htmlFor="component-outlined">
          {label}
        </InputLabel>
        <OutlinedInput
          className={classes.inputPhoneField}
          notched
          labelWidth="50"
          name={name}
          onChange={handleInputChange}
          id="input-phone-mask"
          placeholder={placeHolder}
          inputComponent={NumberFormatCustom}
          inputProps={{
            value,
            phoneInputValue,
            phone,
            isEditForm,
          }}
        />
      </FormControl>
    </div>
  );
}
