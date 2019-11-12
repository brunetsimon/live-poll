import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const styles = {
  title: {
    marginTop: "15vh",
    marginBottom: "10vh",
    fontSize: "1.7em"
  },
  container: {
    width: "100vw",
    maxWidth: "600px",
    padding: "10px",
    textAlign: "center",
    margin: "0 auto"
  },
  button: {
    display: "block",
    marginBottom: "30px",
    textAlign: "center"
  },
}
class AdminPage extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography className={classes.title} component="h1" variant="h4" gutterBottom>Admin dashboard</Typography>
        <Button component={Link} to="/admin/list/" variant="contained" color="secondary" className={classes.button}>All polls</Button>
        <Button component={Link} to="/admin/add/" variant="contained" color="secondary" className={classes.button}>Add a polls</Button>
        <Button component={Link} to="/admin/users/" variant="contained" color="secondary" className={classes.button}>Manage users</Button>
      </div>

    );
  }
};

export default withStyles(styles)(AdminPage);
