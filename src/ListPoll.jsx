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
import { database } from './database.js';
import AlertDelete from './AlertDelete';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VerifyEmail from './utils/VerifyEmail';
import { auth } from 'firebase';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ItemMenu from "./ItemMenu";

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
    this.handleMenuCallback = this.handleMenuCallback.bind(this);

  }

  componentDidMount() {
    let pollRef = database.ref("/polls/");

    pollRef.on('child_added', (data) => {
      this.setState((state) => ({ polls: [...state.polls, { pollId: data.key, pollName: data.val().pollName, isOpen: data.val().voteOpen || false }] }));
    });

    pollRef.on('child_changed', (data) => {
      this.setState(prevState => ({
        polls: prevState.polls.map(
          poll => (poll.pollId === data.key ? Object.assign(poll, { isOpen: data.val().voteOpen }) : poll)
        )
      }));
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

  handleMenuCallback(action, pollId, isOpen) {

    let ref = "/polls/" + pollId;
    let poll = this.state.polls.find(poll => poll.pollId === pollId);
    if (action === "open") {
      database.ref(ref).update({
        'voteOpen': !poll.isOpen,
      });
    }
    if (action === "delete") {
      this.setState({ pollToRemove: pollId, open: true });
    }
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

  handleCheckBox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  filterPolls() {
    let filteredPolls = this.state.polls;
    if (this.state.showOnlyOpen) {
      filteredPolls = filteredPolls.filter(poll => poll.isOpen === true);
    }
    return filteredPolls;
  }

  render() {

    const { classes } = this.props;

    let filteredPolls = this.filterPolls();
    let listPolls = filteredPolls.map(poll => (
      <ListItem key={poll.pollId} role={undefined} button onClick={this.handlePollClick(poll.pollId)}>
        <ListItemIcon>
          {poll.isOpen ? <LockOpenIcon /> : <LockIcon />}
        </ListItemIcon>
        <ListItemText primary={`${poll.pollId}`} secondary={`${poll.pollName}`} />
        <ListItemSecondaryAction>
          <ItemMenu callback={this.handleMenuCallback} isOpen={poll.isOpen} pollId={poll.pollId} />
          {/* <IconButton aria-label="Delete" onClick={this.handleDeleteClick(poll.pollId)}>
            <DeleteIcon />
          </IconButton> */}
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
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox checked={this.state.showOnlyOpen} onChange={this.handleCheckBox('showOnlyOpen')} value="showOnlyOpen" />
            }
            label="Show only open polls"
          />
        </FormGroup>
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
