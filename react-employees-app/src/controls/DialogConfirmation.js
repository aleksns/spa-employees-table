import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import * as services from "../services/services";

const colors = services.COLORS;

const useStyles = makeStyles((theme) => ({
  confirmBtn: {
    color: colors.deleteBtnText,
    "&:hover": {
      color: colors.mainBtnText,
      background: colors.deleteBtnHover,
    },
  },
  cancelBtn: {
    color: colors.primary,
    border: "0.5px solid",
    "&:hover": {
      color: colors.mainBtnText,
      background: colors.mainBtnHover,
    },
  },
}));

export default function DialogConfirmation(props) {
  const classes = useStyles();
  const { openConfirmation, setOpenConfirmation, onConfirm } = props;

  const handleClose = () => {
    setOpenConfirmation({
      ...openConfirmation,
      isOpen: false,
    });
  };

  const title = "Delete employee with ID " + openConfirmation.idToDelete + "?";
  const subTitle = "This action can not be undone";

  return (
    <div>
      <Dialog
        open={openConfirmation.isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {subTitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.cancelBtn} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className={classes.confirmBtn}
            onClick={() => {
              handleClose();
              onConfirm();
            }}
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
