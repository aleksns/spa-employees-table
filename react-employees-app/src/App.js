import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import Employees from "./Employees/Employees";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import * as services from "./services/services";

const colors = services.COLORS;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    background: {
      default: colors.appBackground,
    },
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <HeaderComponent />
      <Router>
        <Route exact path="/" component={Employees} />
      </Router>
      <CssBaseline />
    </MuiThemeProvider>
  );
}
