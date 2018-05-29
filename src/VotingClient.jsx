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
    console.log(rating);
    this.setState({hadVoted: true, rating: rating});
    let ref = "/polls/"+this.props.match.params.pollId+"/votes";
    database.ref(ref).push({
      'rating' : rating,
    });
  }
  render() {

    const { classes } = this.props;

    return (
      <div className={classes.contentContainer}>
        <div className={classes.header}>
          <Typography variant="headline">Let's vote!</Typography>
          <Typography variant="subheading">Poll ID = {this.props.match.params.pollId}</Typography>
        </div>
        <div className={classes.voteContainer}>
          {
          this.state.hadVoted === true ? <Result rating={this.state.rating}/> : <Vote callbackVote={this.handleRatingCallback}/> 
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VotingClient);
