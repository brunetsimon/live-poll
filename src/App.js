/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  bodyContainer: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    minHeight: "100vh",
  }
}

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.bodyContainer}>
         <CssBaseline />
      {/* <Navigation /> */}
         <BrowserRouter>    
          <Main />
        </BrowserRouter>
      </div>
    );
  }
}

export default withStyles(styles)(App);
