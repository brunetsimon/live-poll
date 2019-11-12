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
// import { auth } from "./database.js";
import AlertDelete from './AlertDelete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';


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

class ListUsers extends Component {


  constructor(props) {
    super(props);

    this.state = {
      polls: [],
      users: [],
      pollToRemove: null,
      open: false,
      showSnackbar: false,
    };

    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);

  }

  componentDidMount() {


    this.listAllUsers();

    /* let pollRef = database.ref("/polls/");

    pollRef.on('child_added', (data) => {
      this.setState((state) => ({ polls: [...state.polls, { pollId: data.key, pollName: data.val().pollName }] }));
    });

    pollRef.on('child_changed', (data) => {
      console.log("child_changed");
    });

    pollRef.on('child_removed', (data) => {
      this.setState((state) => ({ polls: state.polls.filter((item) => item.pollId !== data.key) }));
      this.setState({ showSnackbar: true });
    }); */
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

  listAllUsers() {
    axios.get('/api/users').then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    }).finally(function() {
      console.log("finally");
      
    });
      
  }
 /*  listAllUsers() {
    auth.currentUser.getIdToken().then(function(token) {
      console.log('Sending request to api/users ith ID token in Authorization header.');
      var req = new XMLHttpRequest();
      req.onload = function() {
        console.log("Message" + req.responseText);
        console.log(req);
      };
      req.onerror = function() {
        console.log("error in listAllUsers");
        
      };
      req.open('GET', 'api/users', true);
      req.setRequestHeader('Authorization', 'Bearer ' + token);
      req.send();
    });
  } */
  /* authenticatedRequest(method, url, body) {
    if (!auth.currentUser) {
      throw new Error('Not authenticated. Make sure you\'re signed in!');
    }
  
    // Get the Firebase auth token to authenticate the request
    return auth.currentUser.getIdToken().then(function(token) {
      var request = {
        method: method,
        url: url,
        dataType: 'json',
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); }
      };
  
      if (method === 'POST') {
        request.contentType = 'application/json';
        request.data = JSON.stringify(body);
      }
  
      console.log('Making authenticated request:', method, url);
      return $.ajax(request).catch(function() {
        throw new Error('Request error: ' + method + ' ' + url);
      });
    });
  }; */

  /* listMessages() {
    var url = '/api/messages';
    this.authenticatedRequest('GET', url).then((response) => {
      var elements = response.map((message) => {
        console.log(message);
        
      });

    }).catch(function(error) {
      console.log('Error listing messages.');
      throw error;
    });
  }; */
  

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
        <Typography className={classes.title} component="h1" variant="h4" gutterBottom>List all users</Typography>
        <List subheader={<ListSubheader component="div">List of all users:</ListSubheader>}>
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

export default withStyles(styles)(ListUsers);
