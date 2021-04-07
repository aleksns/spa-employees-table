import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
} from "@material-ui/core";
import React, { useState } from "react";
import InputCustom from "./InputCustom";
import SearchIcon from "@material-ui/icons/Search";
import ButtonCustom from "./ButtonCustom";
import * as services from "../services/services";

const colors = services.COLORS;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 180,
  },
  searchSelect: {
    marginTop: theme.spacing(3),
    fontSize: 16,
    position: "relative",
    height: "40px",
  },
  searchBtn: {
    color: colors.mainBtnText,
    background: colors.main,
    borderRadius: 3,
    margin: theme.spacing(1),
    left: theme.spacing(8),
    top: "11.7px",
    width: 20,
    height: 40.5,
    minWidth: "1%",
  },
  searchInput: {
    width: "140%",
    marginTop: theme.spacing(1),
    top: "6px",
    left: "-4px",
    fontSize: 16,
    position: "relative",
    "& fieldset": {
      borderColor: colors.primary,
    },
  },
}));

const searchByList = services.getSearchByList();

export default function SearchWithSelect(props) {
  const { setFilterFunction, goToFirstPage } = props;
  const classes = useStyles();
  const [searchByType, setSearchByType] = useState("All categories");
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearchByType(value);
    setSearchInputValue("");
    setFilterFunction({
      function: (items) => {
        return items;
      },
    });
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchInputValue(value);
    goToFirstPage();

    setFilterFunction({
      function: (items) => {
        if (value == "") return items;
        else {
          switch (searchByType) {
            case "All categories":
              return items.filter(
                (x) =>
                  JSON.stringify(x.id).includes(value) ||
                  JSON.stringify(x.team_id).includes(value) ||
                  (x.first_name + x.last_name)
                    .toLowerCase()
                    .includes(value.toLowerCase().replace(/ /g, "")) ||
                  x.department.toLowerCase().includes(value.toLowerCase()) ||
                  x.date_of_birth.includes(value) ||
                  x.hire_date.includes(value) ||
                  (x.email != null &&
                    x.email.toLowerCase().includes(value.toLowerCase())) ||
                  (x.phone != null && x.phone.toLowerCase().includes(value)) ||
                  x.salary.includes(value)
              );
            case "By ID":
              return items.filter((x) => JSON.stringify(x.id).includes(value));
            case "By team ID":
              return items.filter((x) =>
                JSON.stringify(x.team_id).includes(value)
              );
            case "By full name":
              return items.filter((x) =>
                (x.first_name + x.last_name)
                  .toLowerCase()
                  .includes(value.toLowerCase().replace(/ /g, ""))
              );
            case "By first name":
              return items.filter((x) =>
                x.first_name
                  .toLowerCase()
                  .includes(value.toLowerCase().replace(/ /g, ""))
              );
            case "By last name":
              return items.filter((x) =>
                x.last_name
                  .toLowerCase()
                  .includes(value.toLowerCase().replace(/ /g, ""))
              );
            case "By department":
              return items.filter((x) =>
                x.department.toLowerCase().includes(value.toLowerCase())
              );
            case "By birth date":
              return items.filter((x) => x.date_of_birth.includes(value));
            case "By email":
              return items.filter(
                (x) =>
                  x.email != null &&
                  x.email.toLowerCase().includes(value.toLowerCase())
              );
            case "By phone":
              return items.filter(
                (x) => x.phone != null && x.phone.includes(value)
              );
            case "By salary":
              return items.filter((x) => x.salary.includes(value));
            case "By hire date":
              return items.filter((x) => x.hire_date.includes(value));
            default:
              console.log("Something went wrong");
          }
        }
      },
    });
  };

  return (
    <Toolbar>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          className={classes.searchSelect}
          defaultValue="All categories"
          labelId="search-select-employees-label"
          id="search-select-employees"
          value={searchByType}
          margin="dense"
          onChange={handleChange}
        >
          {searchByList.map((item) => (
            <MenuItem key={item.id} value={item.title}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <form autoComplete="off">
        <FormControl className={classes.searchInput}>
          <InputLabel shrink htmlFor="bootstrap-input"></InputLabel>
          <InputCustom
            value={searchInputValue}
            id="search-input-employees"
            label="Search Employees"
            margin="dense"
            onChange={handleSearch}
          />
        </FormControl>
      </form>
      <ButtonCustom
        className={classes.searchBtn}
        variant="contained"
        label={<SearchIcon />}
      />
    </Toolbar>
  );
}
