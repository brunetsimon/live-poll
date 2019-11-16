/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import { Link } from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  client: {
    boxShadow: "yes",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    backgroundColor: "#1976d2",
    borderColor: "#9e9e9e",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#9e9e9e"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(255,255,255,.5)"
    }
  },
  admin: {
    boxShadow: "yes",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    backgroundColor: "#1976d2",
    borderColor: "#9e9e9e",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#9e9e9e"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(255,255,255,.5)"
    }
  },
  server: {
    boxShadow: "yes",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    backgroundColor: "#1976d2",
    borderColor: "#9e9e9e",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#9e9e9e"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(255,255,255,.5)"
    }
  }
});

function Navigation(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Button
        to="/"
        component={Link}
        variant="raised"
        color="primary"
        className={classNames(classes.margin, classes.client)}
      >
        Homepage
</Button>
      <Button
        component={Link}
        to="/client"
        variant="raised"
        color="primary"
        disableRipple
        className={classNames(classes.margin, classes.admin)}
      >
        Vote Selector
</Button>
      <Button
        component={Link}
        to="/server"
        variant="raised"
        color="primary"
        disableRipple
        className={classNames(classes.margin, classes.server)}
      >
        Vote Display
</Button>
    </div>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);


