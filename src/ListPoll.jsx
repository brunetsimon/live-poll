import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { database } from './database.js';
import AlertDelete from './AlertDelete';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VerifyEmail from './utils/VerifyEmail';
import { auth } from 'firebase';


const styles = {
  back: {
    float: "left"
  },
  title: {
    marginTop: "20px",
    marginBottom: "10vh",
    fontSize: "1.7em"
  },
  clearfix: {
    content: "",
    clear: "both",
    display: "table",
  },
  container: {
    width: "100vw",
    maxWidth: "600px",
    padding: "10px",
    textAlign: "center",
    margin: "0 auto"
  },
}

class ListPoll extends Component {


  constructor(props) {
    super(props);

    this.state = {
      polls: [],
      pollToRemove: null,
      open: false,
      showSnackbar: false,
    };

    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);

  }

  componentDidMount() {
    let pollRef = database.ref("/polls/");

    pollRef.on('child_added', (data) => {
      this.setState((state) => ({ polls: [...state.polls, { pollId: data.key, pollName: data.val().pollName }] }));
    });

    pollRef.on('child_changed', (data) => {
      console.log("child_changed");
    });

    pollRef.on('child_removed', (data) => {
      this.setState((state) => ({ polls: state.polls.filter((item) => item.pollId !== data.key) }));
      this.setState({ showSnackbar: true });
    });
  }

  handlePollClick = pollId => () => {
    this.props.history.push(`/server/${pollId}`);
  }

  handleDelete(pollId) {
    let pollRef = database.ref("/polls/" + pollId);
    pollRef.remove();
  }

  handleDeleteClick = pollId => () => {
    this.setState({ pollToRemove: pollId, open: true });
  }

  handleOnClose(answer) {

    if (answer) {
      this.handleDelete(this.state.pollToRemove);
    }

    this.setState({ pollToRemove: null, open: false });
  }

  handleSnackbarClose() {
    this.setState({ showSnackbar: false });
  }

  render() {

    const { classes } = this.props;

    let listPolls = this.state.polls.map(poll => (
      <ListItem key={poll.pollId} role={undefined} button onClick={this.handlePollClick(poll.pollId)}>
        <ListItemText primary={`${poll.pollId}`} secondary={`${poll.pollName}`} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.handleDeleteClick(poll.pollId)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));

    return (
      <div className={classes.container}>
        <IconButton className={classes.back} aria-label="Back" onClick={this.props.history.goBack}>
          <ArrowBackIcon />
        </IconButton>
        <div className={classes.clearfix}></div>
        <VerifyEmail user={auth().currentUser.emailVerified} />
        <Typography className={classes.title} component="h1" variant="h4" gutterBottom>List all polls</Typography>
        <Button variant="contained" color="secondary" aria-label="Add" component={Link} to="/admin/add">
          Add a poll
          <AddIcon />
        </Button>
        <List subheader={<ListSubheader component="div">List of all polls:</ListSubheader>}>
          {listPolls}
        </List>
        <AlertDelete open={this.state.open} onClose={this.handleOnClose} pollId={this.state.pollToRemove} />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.showSnackbar}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Poll deleted</span>}
        />
      </div >
    );
  }
};

export default withStyles(styles)(ListPoll);
