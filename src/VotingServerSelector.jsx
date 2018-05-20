import React, { Component } from 'react';
import { Input, Paper, Button } from 'material-ui';
import { Link } from 'react-router-dom';
import database from './database.js';

class VotingServerSelector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pollId: "",
      showError: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({pollId: event.target.value, showError: false});
  }

  handleSubmit(event) {
    let ref = "/polls/"+this.state.pollId;

    database.ref(ref).once('value', (snap) => {
      if (snap.val() != null) {
        this.props.history.push(`/server/${this.state.pollId}`);
      } else {
        this.setState({showError : true});
      }
    });
  }
  render() {

    return(
      <Paper>
        <h2>Enter your poll number</h2>
        <Input id="pollId" value={this.state.pollId} onChange={this.handleInputChange} />
        <Button variant="raised" color="primary" onClick={this.handleSubmit}>Go!</Button>
        {/* <Link to={`/server/${this.state.pollId}`}><Button variant="raised" color="primary">Go!</Button></Link> */}
    {this.state.showError ? <h2>Error! This poll doesn't exists</h2> : ""}
      </Paper>
    );
  }
};

export default VotingServerSelector;