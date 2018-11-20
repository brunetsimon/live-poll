/* eslint-disable no-unused-vars */

import React, { Component } from "react";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ratingsConst from "./contants";

const styles = {
iconButton: {
  display: "inline-block",
  height: "10vh",
  width: "10vh"
},
icon: {
  fontSize: "60px",
},
flexContainer: {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10vh",
},
pageContainer: {
  width: "90%",
},
note: {
  margin: "20px 0"
}
};

class Vote extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: "",
      selectedRating: null,
    };

    this.handleMessageOnChange = this.handleMessageOnChange.bind(this);
    this.handleRatingOnClick = this.handleRatingOnClick.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);

  }

  handleRatingOnClick(rating) {
    this.setState({selectedRating: rating});
  }
  handleMessageOnChange(event) {
    this.setState({message: event.target.value});
  }
  handleOnSubmit() {
    console.log("handleOnSubmit");    
    this.props.callbackVote({rating: this.state.selectedRating, message: this.state.message});
    //this.props.callbackVote.bind(null, "10");
  }
render() {
 const { classes } = this.props;
    let listButtons = ratingsConst.map( rating => <IconButton color={rating.id === this.state.selectedRating ? "primary" : "default"} className={classes.iconButton} key={rating.id} onClick={this.handleRatingOnClick.bind(null, rating.id)}><Icon className={classes.icon}>{rating.icon}</Icon></IconButton>);
    return(
      <div className={classes.pageContainer}>
        <Typography variant="overline">Overall impression</Typography>
        <div className={classes.flexContainer}>
          {listButtons}
        </div>
        <Typography variant="overline">Optional comment &#42;</Typography>
        <TextField
          id="standard-multiline-static"
          multiline
          fullWidth
          rows="4"
          value={this.state.message}
          margin="normal"
          onChange={this.handleMessageOnChange}
        />
        <Typography variant="caption" className={classes.note}>Note: The comment is sent anonymaly to the Release Train Engineer</Typography>
        <Button variant="contained" color="primary" onClick={this.handleOnSubmit} fullWidth>
          Submit
        </Button>
      </div>
    );
}
}
export default withStyles(styles)(Vote);
