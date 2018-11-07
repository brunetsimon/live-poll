/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography} from "material-ui";
import  DeleteIcon  from  '@material-ui/icons/Delete';
import  CloudUploadIcon  from  '@material-ui/icons/CloudUpload';
import  KeyboardVoiceICon  from  '@material-ui/icons/KeyboardVoice';
import  Icon  from  '@material-ui/core/Icon';
import  SaveIcon  from  '@material-ui/icons/Save';
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
    <h1>ELECTROMOBILITY VOTING APP</h1>
    


    
    <Button to="/client" variant="contained" className={classes.button} color="primary">Start voting </Button>
    <Button to="/server" variant="contained" className={classes.button}  color="primary">Display a voting graph</Button>
  </div>
  );
};

export default withStyles(styles)(Homepage);
