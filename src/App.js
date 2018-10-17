import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Navigation';
import Main from './Main';
import CcsBaseline from 'material-ui/CssBaseline';
import { withStyles } from 'material-ui';

const styles = {
  bodyContainer: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
  }
}

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.bodyContainer}>
         <CcsBaseline />
         <Navigation />
         <BrowserRouter>
          <Main />
        </BrowserRouter>
      </div>
    );
  }
}

export default withStyles(styles)(App);
