/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography} from "material-ui";
import  {  withStyles  }  from  '@material-ui/core/styles';
import classNames  from  "classnames"; 
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const  styles  =  theme  =>  ({
  button:  {
    margin:  theme.spacing.unit,
  },
}); 

function Homepage(props) {
  const { classes } = props;
  return(
  <div align="center" valign="center">
    <p> &nbsp; </p>
      <p> &nbsp; </p>
      <Typography component="h1" variant="h3" gutterBottom>ELECTROMOBILITY VOTING APP</Typography>
    <Button component={Link} to="/client" variant="contained" className={classes.button} color="primary">Start voting </Button>
    <Button component={Link} to="/server" variant="contained" className={classes.button}  color="primary">Display a voting graph</Button>
  </div>
  );
};

export default withStyles(styles)(Homepage);
