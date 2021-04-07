import { Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import * as services from "../services/services";

const colors = services.COLORS;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    textTransform: "none",
    background: colors.main,
    "&:hover": {
      color: colors.main,
      background: colors.mainBtnHover,
    },
  },
}));

export default function ButtonCustom(props) {
  const { variant, color, size, onClick, label, ...other } = props;
  const classes = useStyles();

  return (
    <Button
      classes={{ root: classes.root }}
      color={color || "primary"}
      variant={variant || "contained"}
      size={size || "large"}
      disableElevation
      onClick={onClick}
      {...other}
    >
      {label}
    </Button>
  );
}
