/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Vote from './Vote';
import Result from './Result';
import database from './database.js';
import { Typography, withStyles } from 'material-ui';

const styles = {
  voteContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexFlow: "column",
  },
  contentContainer: {
    height: "100%",
  },
  header: {
    textAlign: "center",
    margin: "30px auto"
  }
}

class VotingClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hadVoted: false,
      rating: null,
    }

    this.handleRatingCallback = this.handleRatingCallback.bind(this);
  }

  handleRatingCallback(rating) {
    
    // Update the local variables rating and hasVoted. Use this.setState()
    //here
    
    // Here is the reference to where the rating shall be saved on the server. 
    let ref = "/polls/"+this.props.match.params.pollId+"/votes";
    
    // Use database.ref(ref).push() to sent the 'rating' to the server. It shall be saved under the key 'rating'
    //here
  }
  render() {

    const { classes } = this.props;

    return (
      
      // feel free to change the layout, text, etc...
      <div className={classes.contentContainer}>
        <div className={classes.header}>
          <Typography variant="headline">Let's vote!</Typography>
          <Typography variant="subheading">Poll ID = {this.props.match.params.pollId}</Typography>
        </div>
        <div className={classes.voteContainer}>
          {
            // Here you need to select the <Result> or <Vote> component. Don't forget to pass the properties. 
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VotingClient);
