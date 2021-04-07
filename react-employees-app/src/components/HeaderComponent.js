import React from "react";
import {
  makeStyles,
  Link,
  Typography,
  Toolbar,
  AppBar,
  Button,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import * as services from "../services/services";

const colors = services.COLORS;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 50,
    height: 40,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    background: colors.header,
  },
  menu: {
    color: colors.headerBtnText,
    top: "-10%",
    "&:hover": {
      color: colors.headerBtnHover,
    },
  },
  buttonsRow: {
    position: "absolute",
    left: "35%",
    top: "-10%",
  },
  buttons: {
    textTransform: "none",
    color: colors.headerBtnText,
    margin: theme.spacing(2),
    "&:hover": {
      color: colors.headerBtnHover,
    },
  },
  gitLink: {
    marginTop: 6,
    right: "30px",
    position: "absolute",
    justifyContent: "center",
    textAlignVertical: "center",
    color: colors.headerBtnText,
    fontSize: 20,
    "&:hover": {
      color: colors.headerBtnHover,
    },
  },
}));

function GithubLinkWithIcon(props) {
  const { ...other } = props;
  const gitUrl = "https://github.com/aleksns?tab=repositories";

  const openInNewTab = (gitUrl) => {
    const newWindow = window.open(gitUrl, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Typography>
      <Link
        {...other}
        component="button"
        underline="disabled"
        onClick={() => openInNewTab(gitUrl)}
      >
        <GitHubIcon /> Github: aleksns
      </Link>
    </Typography>
  );
}

function HeaderButtonCustom(props) {
  const classes = useStyles();
  const { label, ...other } = props;
  return (
    <Button {...other} className={classes.buttons} disableRipple>
      {label}
    </Button>
  );
}

export default function HeaderComponent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton className={classes.menu} disableRipple>
            <MenuIcon />
          </IconButton>
          <div className={classes.buttonsRow}>
            <HeaderButtonCustom label="Home" />
            <HeaderButtonCustom label="Schedule" />
            <HeaderButtonCustom label="Contacts" />
            <HeaderButtonCustom label="Database" />
          </div>
          <GithubLinkWithIcon className={classes.gitLink} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
