import { Grid, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { FormComponent, Form } from "../components/FormComponent";
import InputCustom from "../controls/InputCustom";
import RadioBtnCustom from "../controls/RadioBtnCustom";
import SelectDepartment from "../controls/SelectDepartment";
import DatePickerCustom from "../controls/DatePickerCustom";
import ButtonCustom from "../controls/ButtonCustom";
import PhoneMaskWithSelect from "../controls/PhoneMaskWithSelect";
import SalaryInput from "../controls/SalaryInput";
import * as services from "../services/services";
import SelectTeamID from "../controls/SelectTeamID";

const listOfDepartments = services.getDepartmentList();
const listOfGenders = services.getGenderList();
const listOfTeamID = services.getTeamIDList();
const colors = services.COLORS;

const useStyles = makeStyles((theme) => ({
  depAndTeamId: {
    display: "flex",
    flexDirection: "row",
  },
  dates: {
    display: "flex",
    flexDirection: "row",
    width: "83.5%",
    "&. MuiSvgIcon-root": {
      background: "#BA000D",
      color: "#BA000D",
    },
  },
  saveBtn: {
    width: "60%",
    left: theme.spacing(0.3),
  },
  clearBtn: {
    left: theme.spacing(0.5),
    textTransform: "none",
    "&:hover": {
      color: colors.mainBtnText,
      background: colors.deleteBtnHover,
    },
  },
}));

const blankFormValues = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  gender: "Female",
  phone: "",
  department: "",
  team_id: "",
  date_of_birth: new Date("01/15/1980"),
  salary: "",
  hire_date: new Date(),
};

export default function EmployeeForm(props) {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("first_name" in fieldValues) {
      temp.first_name = fieldValues.first_name ? "" : "Field is required";
    }
    if ("last_name" in fieldValues) {
      temp.last_name = fieldValues.last_name ? "" : "Field is required";
    }
    if ("email" in fieldValues && fieldValues.email != null) {
      temp.email = /$^|.+@.+\.[A-Za-z]+$/.test(fieldValues.email)
        ? ""
        : "Incorrect email format. Please enter valid email, e.g. example@gmail.com";
    }
    if ("department" in fieldValues) {
      temp.department =
        fieldValues.department.length != 0 ? "" : "Field is required";
    }
    if ("team_id" in fieldValues) {
      temp.team_id = fieldValues.team_id != 0 ? "" : "Field is required";
    }
    if ("salary" in fieldValues) {
      temp.salary = fieldValues.salary.length != 0 ? "" : "Field is required";
    }

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const [validateOnChange, setValidateOnChange] = useState(false);

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    resetForm,
  } = FormComponent(blankFormValues, validateOnChange, validate);

  const { recordForEdit, addOrEditEmployee, isEditForm } = props;

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit,
      });
    }
  }, [recordForEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidateOnChange(true);

    if (validate()) {
      addOrEditEmployee(values, resetForm);
      setValidateOnChange(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <InputCustom
            value={values.first_name}
            name="first_name"
            label="First Name"
            onChange={handleChange}
            error={errors.first_name}
          />
          <InputCustom
            value={values.last_name}
            name="last_name"
            label="Last Name"
            onChange={handleChange}
            error={errors.last_name}
          />
          <PhoneMaskWithSelect
            value={values.phone}
            name="phone"
            label="Phone"
            onChange={handleChange}
            isEditForm={isEditForm}
          />
          <InputCustom
            value={values.email}
            name="email"
            label="Email"
            onChange={handleChange}
            error={errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <RadioBtnCustom
            value={values.gender}
            name="gender"
            label="Gender"
            onChange={handleChange}
            items={listOfGenders}
          />
          <div className={classes.dates}>
            <DatePickerCustom
              value={values.date_of_birth}
              name="date_of_birth"
              label="Birth Date"
              onChange={handleChange}
            />
            <DatePickerCustom
              value={values.hire_date}
              name="hire_date"
              label="Hire Date"
              onChange={handleChange}
            />
          </div>
          <div className={classes.depAndTeamId}>
            <SelectDepartment
              value={values.department}
              name="department"
              label="Department"
              onChange={handleChange}
              items={listOfDepartments}
              error={errors.department}
            />
            <SelectTeamID
              value={values.team_id}
              name="team_id"
              label="Team ID"
              onChange={handleChange}
              items={listOfTeamID}
              error={errors.team_id}
            />
          </div>
          <SalaryInput
            value={values.salary}
            name="salary"
            label="Salary"
            onChange={handleChange}
            error={errors.salary}
          />
          <div>
            <ButtonCustom
              className={classes.saveBtn}
              label="Save"
              type="submit"
            />
            <ButtonCustom
              classes={{ root: classes.clearBtn }}
              label="Clear"
              color="default"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
