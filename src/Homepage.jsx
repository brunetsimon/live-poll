/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  title: {
    marginTop: "15vh",
    marginBottom: "10vh",
    fontSize: "1.7em"
  },
  button: {
    display: "block",
    marginBottom: "30px",
  },
  container: {
   padding: "20px", 
   textAlign: "center",
  }
}

function Homepage(props) {
  const { classes } = props;
  return(
  <div className={classes.container}>
    <Typography className={classes.title} component="h1" variant="h4" gutterBottom>ELECTROMOBILITY VOTING APP</Typography>
    <Button component={Link} to="/client" variant="contained" color="primary" className={classes.button}>Start voting </Button>
    <Button component={Link} to="/server" variant="contained" color="primary" className={classes.button}>Display a voting graph</Button>
  </div>
  );
};

export default withStyles(styles)(Homepage);
