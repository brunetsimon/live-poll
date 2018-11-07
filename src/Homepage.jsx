/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button} from "material-ui";
import  DeleteIcon  from  '@material-ui/icons/Delete';
import  CloudUploadIcon  from  '@material-ui/icons/CloudUpload';
import  KeyboardVoiceICon  from  '@material-ui/icons/KeyboardVoice';
import  Icon  from  '@material-ui/core/Icon';
import  SaveIcon  from  '@material-ui/icons/Save';

const Homepage = () => (
  
  <div align="center" valign="center">
    <p> &nbsp </p>
    <h1>Electromobility voting app(webpage)</h1>
    
    <Button to="/client" variant="contained" color="primary">Start voting </Button>
    <Button to="/server" variant="contained"  color="primary">Display a voting graph</Button>
  </div>
);

export default Homepage;
