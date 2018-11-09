/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button} from "material-ui";


function Homepage(props) {
  const { classes } = props;
  return(
  <div>
    <Typography component="h1" variant="h3" gutterBottom>ELECTROMOBILITY VOTING APP</Typography>
    <Button component={Link} to="/client" variant="raised" color="primary">Start voting </Button>
    <Button component={Link} to="/server" variant="raised" color="primary">Display a voting graph</Button>
  </div>
  );
};

export default withStyles(styles)(Homepage);
