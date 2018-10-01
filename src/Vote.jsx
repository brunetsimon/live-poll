import React, { Component } from 'react';
import { IconButton, Icon, withStyles } from 'material-ui';
import ratingsConst from './contants';


const styles = {
  iconButton: {
    display: "block",
    height: "16vh",
    width: "16vh",
  },
  icon: {
    fontSize: "80px",
  }
}

class Vote extends Component {

  render() {
    
    const { classes } = this.props;
    
    return(
      // Code goes here
    );
  }
}

export default withStyles(styles)(Vote);
