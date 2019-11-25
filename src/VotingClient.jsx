import React, { Component } from 'react';
import Vote from './Vote';
import Result from './Result';
import { database } from './database.js';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";

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

  componentDidMount() {
    // Check in the localStorage if a vote is already registered for this poll
    if (localStorage.hasOwnProperty(this.props.match.params.pollId)) {
      let oldState = localStorage.getItem(this.props.match.params.pollId);
      try {
        let parsedOldState = JSON.parse(oldState);
        for (let key in parsedOldState) {
          this.setState({ [key]: parsedOldState[key] });
        }

      } catch (e) {
        // handle empty string
        console.log("parsing error");
      }
    }
  }

  handleRatingCallback(result) {
    console.log(result);
    this.setState({ hadVoted: true, rating: result.rating, message: result.message });
    let ref = "/polls/" + this.props.match.params.pollId + "/votes";
    let API_URL = "";
    if (process.env.NODE_ENV === 'production') {
      API_URL = "/api/checkPoll";
    } else {
      API_URL = "https://votenow.se/api/checkPoll";
    }

    //Send a request to the cloud function to check if the poll exists. Return a bool
    axios.get(`${API_URL}/${this.state.pollId}`).then((response) => {
      console.log(response);
      if (response.data.exist && response.data.open) {
        database.ref(ref).push({
          'rating': result.rating,
          'message': result.message,
        });
        localStorage.setItem(this.props.match.params.pollId, JSON.stringify({ hadVoted: true, rating: result.rating, message: result.message }));
      }
    }).catch((error) => {
      console.log(error);
    });

  }
  render() {

    const { classes } = this.props;

    return (
      <div className={classes.contentContainer}>
        <div className={classes.header}>
          <Typography variant="h5">Let's vote!</Typography>
          <Typography variant="h6">Poll ID = {this.props.match.params.pollId}</Typography>
        </div>
        <div className={classes.voteContainer}>
          {
            this.state.hadVoted === true ? <Result rating={this.state.rating} /> : <Vote callbackVote={this.handleRatingCallback} />
          }
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VotingClient);
