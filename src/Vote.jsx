/* eslint-disable no-unused-vars */

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

    let listButtons = ratingsConst.map( rating => <IconButton className={classes.iconButton} color="primary" key={rating.id} onClick={this.props.callbackVote.bind(null, rating.id)}><Icon className={classes.icon}>{rating.icon}</Icon></IconButton>);
    return(
      <div>
        {listButtons}
      </div>
    );
}
}
export default withStyles(styles)(Vote);
