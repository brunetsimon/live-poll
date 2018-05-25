import React, { Component } from 'react';
import { withStyles, Paper, Icon, IconButton, Typography } from 'material-ui';
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
      <Paper className={classes.result}>
        <Typography variant="headline">Thank you for voting</Typography>
        <Typography variant="subheading" gutterBottom="true">Your rating:</Typography>
        <Icon className={classes.icon}>{ratingsConst[this.props.rating].icon}</Icon>
      </Paper>
    );
  }
}

export default withStyles(styles)(Result);
