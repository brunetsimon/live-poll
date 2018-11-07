import React, { Component } from "react";
import database from "./database.js";
import { Typography, withStyles } from "material-ui";
import ReactChartkick, { BarChart } from "react-chartkick";
import Chart from "chart.js";

ReactChartkick.addAdapter(Chart);

const styles = {
  voteContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexFlow: "column",
    maxWidth: "900px",
    margin: "0 auto"
  },
  contentContainer: {
    height: "100%"
  },
  header: {
    textAlign: "center",
    margin: "30px auto"
  }
};

class VotingServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countArray: [],
      };
    // Define a local state call countArray which is an array.
    // See https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class

    //countArray[0] has the number of vote for the "Love" feeling.
    //countArray[3] for the "bad"
  }

  componentDidMount() {
    // componentDidMount is called once at startup. That's a great place to initialize our
    // function that listen to database changes.

    // ref is the path to the total count.
    let ref = "/polls/" + this.props.match.params.pollId + "/ratingCount";
    var countRef = database.ref(ref);
    countRef.on('value', (snap) =>
    {
      this.setState({"countArray": snap.val()});
    });

    // Here we need to put the function that will listen to database updates in the "ref" location
    // and we need to store that value locally in "countArray"
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.contentContainer}>
        <div className={classes.header}>
          <Typography> <center> Voting Results</center> </Typography>
          <Typography> <center> Current Poll ID: {this.props.match.params.pollId}</center> </Typography>
        </div>
        <div className={classes.voteContainer}>
          <BarChart data={[["Love"	, this.state.countArray[0]], ["Good", this.state.countArray[1]], ["Ok", this.state.countArray[2]], ["Bad", this.state.countArray[3]]]} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VotingServer);
