import React, { Component } from "react";
import { database } from "./database.js";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Switch from '@material-ui/core/Switch';
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
  msgContainer: {
    paddingTop: "50px",
    display: "block",
    maxWidth: "900px",
    margin: "0 auto"
  },
  contentContainer: {
    height: "100%"
  },
  header: {
    textAlign: "center",
    margin: "30px auto"
  },
  paper: {
    padding: "20px",
    margin: "30px 10px",
  }
};

class VotingServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countArray: [],
      messageArray: [],
      showComments: false,
      };
    
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleSwitch() {
    this.setState(state => ({ showComments: !state.showComments }));
  }

  componentDidMount() {

    let ref = "/polls/" + this.props.match.params.pollId + "/ratingCount";
    this.countRef = database.ref(ref);
    this.countRef.on('value', (snap) =>
    {
      this.setState({"countArray": snap.val()});
    });

    let refMessage = "/polls/" + this.props.match.params.pollId + "/votes";
    this.messageRef = database.ref(refMessage);
    this.messageRef.on('child_added', (data) =>
    {      
      if (data.val().message !== undefined && data.val().message !== "") {
       this.setState(prevState => ({ messageArray: [...prevState.messageArray, data.val().message]})); 
      }
    });

  }
  
  componentWillUnmount() {
   this.countRef.off(); 
   this.messageRef.off();
  }

  render() {
    const { classes } = this.props;
    let listMessage = this.state.messageArray.map((message, index) => <Grow in={this.state.showComments} key={index}><Paper className={classes.paper}><Typography variant="body1" gutterBottom>{message}</Typography></Paper></Grow>);

    return (
      <div className={classes.contentContainer}>
        <div className={classes.header}>
          <Typography variant="h2" gutterBottom>Poll ID: {this.props.match.params.pollId} </Typography>
        </div>
        <div className={classes.voteContainer}>
          <BarChart download={this.props.match.params.pollId} data={[["Love"	, this.state.countArray[0]], ["Good", this.state.countArray[1]], ["Ok", this.state.countArray[2]], ["Bad", this.state.countArray[3]]]} />
        </div>
        <div className={classes.msgContainer}>
          <Typography variant="h5" component="h3">Comments <Switch checked={this.state.showComments} onChange={this.handleSwitch} aria-label="Collapse" /></Typography>
           {listMessage}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VotingServer);
