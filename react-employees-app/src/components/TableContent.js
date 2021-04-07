import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import * as services from "../services/services";

const colors = services.COLORS;

const useStyles = makeStyles((theme) => ({
  editBtn: {
    color: colors.primary,
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    "&:hover": {
      color: colors.mainBtnText,
      background: colors.main,
    },
  },
  deleteBtn: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    margin: theme.spacing(0.5),
    "&:hover": {
      color: colors.mainBtnText,
      background: colors.deleteBtnHover,
    },
  },

  idCss: {
    width: theme.spacing(1),
  },
  teamIdCss: {
    width: theme.spacing(16),
  },
  actionsCss: {
    width: theme.spacing(13),
  },
}));

const NameTextTypography = withStyles((theme) => ({
  root: {
    fontWeight: "1000",
  },
}))(Typography);

const EmailTextTypography = withStyles((theme) => ({
  root: {
    color: colors.emailText,
    fontWeight: "500",
  },
}))(Typography);

const AgeTextTypography = withStyles((theme) => ({
  root: {
    color: colors.ageText,
    fontWeight: "450",
  },
}))(Typography);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: colors.tableRowOdd,
    },
    "&:hover": {
      backgroundColor: colors.tableRowHover,
    },
  },
}))(TableRow);

export default function TableContent(props) {
  const classes = useStyles();

  const {
    recordsAfterPagingAndSorting,
    handleEditBtn,
    handleDeleteBtn,
  } = props;

  const getAge = (startDateString) => {
    let today = new Date();
    let startDate = new Date(startDateString);
    let age = today.getFullYear() - startDate.getFullYear();
    let month = today.getMonth() - startDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < startDate.getDate())) {
      age--;
    }
    if (age > 0) {
      if (age == 1) {
        return age + " year";
      } else {
        return age + " years";
      }
    } else {
      return getMonths(startDate, today);
    }
  };

  const getMonths = (startDate, today) => {
    let months;
    months = (today.getFullYear() - startDate.getFullYear()) * 12;
    months += today.getMonth();
    months -= startDate.getMonth();

    if (months == 1) {
      return months + " month";
    } else {
      return months + " months";
    }
  };

  return (
    <TableBody>
      {recordsAfterPagingAndSorting().map((item) => (
        <StyledTableRow key={item.id}>
          <TableCell align="left" className={classes.idCss}>
            {item.id}
          </TableCell>
          <TableCell align="left">
            <NameTextTypography>
              {item.first_name} {item.last_name}
            </NameTextTypography>
          </TableCell>
          <TableCell align="left">{item.department}</TableCell>
          <TableCell align="left" className={classes.teamIdCss}>
            {item.team_id}
          </TableCell>
          <TableCell align="left">
            {item.hire_date}
            <AgeTextTypography>{getAge(item.hire_date)}</AgeTextTypography>
          </TableCell>
          <TableCell align="left">
            <EmailTextTypography>{item.email}</EmailTextTypography>
            {item.phone}
          </TableCell>
          <TableCell align="left">
            {item.date_of_birth}
            <AgeTextTypography>
              Age: {getAge(item.date_of_birth)}
            </AgeTextTypography>
          </TableCell>
          <TableCell align="left">{item.salary}</TableCell>
          <TableCell align="left" className={classes.actionsCss}>
            <Button
              size="small"
              className={classes.editBtn}
              variant="inlined"
              onClick={() => handleEditBtn(item)}
            >
              <EditIcon />
            </Button>
            <Button
              size="small"
              className={classes.deleteBtn}
              variant="inlined"
              onClick={() => handleDeleteBtn(item)}
            >
              <DeleteOutlineIcon />
            </Button>
          </TableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
}
