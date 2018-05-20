import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import VotingClientSelector from './VotingClientSelector';
import VotingClient from './VotingClient';

class VotingClientPage extends Component {

  render() {

    return(
      <Switch>
        <Route exact path="/client" component={VotingClientSelector} />
        <Route path="/client/:pollId" component={VotingClient} />
      </Switch>
    );
  }
};

export default VotingClientPage;