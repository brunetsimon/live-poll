import React, { Component } from 'react';
import { withStyles, Paper, Icon, Typography } from 'material-ui';
import ratingsConst from './contants';

const styles = {
  result: {
    padding: "30px",
    textAlign: "center",
  },
  icon: {
    fontSize: "80px",
  }
}

class Result extends Component {

  render() {

    const { classes } = this.props;

    return(
      <Paper>
      // Your code here.
      // See https://github.com/brunetsimon/live-poll/issues/2
      </Paper>
    );
  }
}

export default withStyles(styles)(Result);
