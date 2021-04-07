import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Button,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/CloseSharp";
import * as services from "../services/services";

const colors = services.COLORS;

const useStyles = makeStyles((theme) => ({
  header: {
    flexDirection: "row",
    position: "absolute",
    left: "0px",
    width: "100%",
    height: "9%",
    background: colors.main,
    alignSelf: "center",
    top: theme.spacing(0),
  },
  title: {
    color: colors.mainBtnText,
    fontSize: 21,
    top: theme.spacing(-2.3),
    left: theme.spacing(3),
    position: "absolute",
  },
  closeBtn: {
    position: "absolute",
    right: "0px",
    height: "9%",
    top: theme.spacing(0),
    color: colors.mainBtnText,
    borderRadius: 1,
    "&:hover": {
      background: colors.deleteBtnHover,
    },
  },
  dialogWrapper: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(7),
    position: "absolute",
  },
}));

export default function DialogEmployeeForm(props) {
  const classes = useStyles();
  const {
    children,
    openDialogForm,
    setDialogForm,
    isEditForm,
    recordForEdit,
  } = props;

  const handleClose = () => {
    setDialogForm(false);
  };

  const displayNameAndId = () => {
    return (
      "Edit: " +
      recordForEdit.first_name +
      " " +
      recordForEdit.last_name +
      " (ID " +
      recordForEdit.id +
      ")"
    );
  };

  const titleToDisplay = isEditForm ? displayNameAndId() : "Add new employee";

  return (
    <Dialog
      open={openDialogForm}
      classes={{ paper: classes.dialogWrapper }}
      maxWidth="md"
    >
      <DialogTitle>
        <div className={classes.header}>
          <h3 className={classes.title}>{titleToDisplay}</h3>
        </div>
        <Button
          className={classes.closeBtn}
          aria-label="close"
          onClick={handleClose}
        >
          <CloseIcon style={{ fontSize: 30 }} />
        </Button>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
