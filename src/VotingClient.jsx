import React, { Component } from 'react';
import Vote from './Vote';
import Result from './Result';
import database from './database.js';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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

  handleRatingCallback(result) {
    console.log(result);
    this.setState({hadVoted: true, rating: result.rating, message: result.message});
    let ref = "/polls/"+this.props.match.params.pollId+"/votes";
    database.ref(ref).push({
      'rating' : result.rating,
      'message' : result.message,
    });
  }
  render() {

    const { classes } = this.props;

    return (
      <div className={classes.contentContainer}>
        <div className={classes.header}>
          <Typography variant="h4">Let's vote!</Typography>
          <Typography variant="subtitle2">Poll ID = {this.props.match.params.pollId}</Typography>
        </div>
        <div className={classes.voteContainer}>
          {
          this.state.hadVoted === true ? <Result rating={this.state.rating}/> : <Vote callbackVote={this.handleRatingCallback} /> 
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VotingClient);
