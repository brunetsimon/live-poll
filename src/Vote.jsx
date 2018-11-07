import React, { Component } from "react";
import { IconButton, Icon, withStyles } from "material-ui";
import ratingsConst from "./contants";

const styles = {
  iconButton: {
    display: "inline-block",
    height: "16vh",
    width: "16vh"
  },
  icon: {
    fontSize: "120px",
    //background: "yellow"
  }
};

class Vote extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>  
      
        <IconButton className={classes.iconButton} onclick="this.props.callbackVote.bind(null, 0)" aria-label="very_satisfied">
          <Icon className={classes.icon} >sentiment_very_satisfied</Icon>
        </IconButton> 
        <IconButton className={classes.iconButton} onclick="this.props.callbackVote.bind(null, 1)" aria-label="satisfied">
          <Icon className={classes.icon} >sentiment_satisfied</Icon>
        </IconButton>  
        <IconButton className={classes.iconButton} onclick="this.props.callbackVote.bind(null, 2)" aria-label="dissatisfied">
          <Icon className={classes.icon} >sentiment_dissatisfied</Icon>
        </IconButton> 
        <IconButton className={classes.iconButton} onclick="this.props.callbackVote.bind(null, 3)" aria-label="very_dissatisfied">
          <Icon className={classes.icon} >sentiment_very_dissatisfied</Icon>
        </IconButton>  
      </div>

    );
  }
}
export default withStyles(styles)(Vote);
