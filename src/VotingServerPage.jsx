import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import VotingServerSelector from './VotingServerSelector';
import VotingServer from './VotingServer';

class VotingServerPage extends Component {

  render() {

    return(
      <Switch>
        <Route exact path="/server" component={VotingServerSelector} />
        <Route path="/server/:pollId" component={VotingServer} />
      </Switch>
    );
  }
};

export default VotingServerPage;