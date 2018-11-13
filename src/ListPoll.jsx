import React, { Component } from 'react';
import { ListItem, List, ListItemText, ListItemSecondaryAction, IconButton, Typography, ListSubheader, withStyles } from 'material-ui';
import DeleteIcon from '@material-ui/icons/Delete';
import database from './database.js';
import AlertDelete from './AlertDelete';

const styles = {
  contentContainer: {
    //padding: "2rem",
  }
}

class ListPoll extends Component {


  constructor(props) {
    super(props);

    this.state = {
      polls: [],
      pollToRemove: null,
      open: false,
    };

    this.handleOnClose = this.handleOnClose.bind(this);

  }

  componentDidMount() {
    let pollRef = database.ref("/polls/");

    pollRef.on('child_added', (data) => {
      this.setState((state) => ({polls: [...state.polls, {pollId: data.key, pollName: data.val().pollName}]}));
    });

    pollRef.on('child_changed', (data) => {
      console.log("child_changed");
    });

    pollRef.on('child_removed', (data) => {
      this.setState((state) => ({polls: state.polls.filter((item) => item.pollId !== data.key)}));

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
    this.setState({pollToRemove: pollId, open: true});
  }

  handleOnClose(answer) {
    
    if (answer) {
      this.handleDelete(this.state.pollToRemove);
    }

    this.setState({pollToRemove: null, open: false});
  }

  render() {

    const { classes } = this.props;

    let listPolls = this.state.polls.map( poll => (
      <ListItem key={poll.pollId} role={undefined} button onClick={this.handlePollClick(poll.pollId)}>
        <ListItemText primary={`${poll.pollId}`} secondary={`${poll.pollName}`}/>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.handleDeleteClick(poll.pollId)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
      
    return(
      <div className={classes.contentContainer}>
        <Typography></Typography>
        <List subheader={<ListSubheader component="div">List of all polls</ListSubheader>}>
          {listPolls}
        </List>
        <AlertDelete open={this.state.open} onClose={this.handleOnClose} pollId={this.state.pollToRemove}/>
      </div>
    );
  }
};

export default withStyles(styles)(ListPoll);
