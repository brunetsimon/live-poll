/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, withStyles} from "material-ui";

const styles = {
  title: {
    marginTop: "15vh",
    marginBottom: "10vh",
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
    <Button component={Link} to="/client" variant="raised" color="primary" className={classes.button}>Start voting </Button>
    <Button component={Link} to="/server" variant="raised" color="primary" className={classes.button}>Display a voting graph</Button>
  </div>
  );
};

export default withStyles(styles)(Homepage);
