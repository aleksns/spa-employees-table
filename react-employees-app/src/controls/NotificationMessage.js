import { makeStyles, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(6),
  },
}));

export default function NotificationMessage(props) {
  const { notification, setNotification } = props;
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({
      ...notification,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      className={classes.root}
      open={notification.isOpen}
      autoHideDuration={3500}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={notification.severity}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
}
