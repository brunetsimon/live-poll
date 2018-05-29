import React, { Component } from 'react';
import database from './database.js';
import { Typography, withStyles } from 'material-ui';
import ReactChartkick, { BarChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const styles = {
  voteContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexFlow: "column",
    maxWidth: "900px",
    margin: "0 auto",
  },
  contentContainer: {
    height: "100%",
  },
  header: {
    textAlign: "center",
    margin: "30px auto"
  }
}

class VotingServer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countArray: [],
    }
  }

  componentDidMount() {
    let ref = "/polls/"+this.props.match.params.pollId+"/ratingCount";
    database.ref(ref).on('value', (snap) => {
      this.setState({"countArray": snap.val()});
    });
  }

  render() {
      const { classes } = this.props;

      return (
        <div className={classes.contentContainer}>
          <div className={classes.header}>
            <Typography variant="headline">To vote connect to:</Typography>
            <Typography variant="subheading">Poll ID = {this.props.match.params.pollId}</Typography>
          </div>
          <div className={classes.voteContainer}>
            <BarChart download={this.props.match.params.pollId} data={[["Love", this.state.countArray[0]], ["Good", this.state.countArray[1]], ["Ok", this.state.countArray[2]], ["Bad", this.state.countArray[3]]]} />
          </div>
        </div>
      );
  }
}

export default withStyles(styles)(VotingServer);
