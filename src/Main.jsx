/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import VotingClientSelector from "./VotingClientSelector";
import VotingClient from "./VotingClient";
import VotingServerSelector from "./VotingServerSelector";
import VotingServer from "./VotingServer";
import Homepage from "./Homepage.jsx";
import AddPoll from "./AddPoll";

import { Switch, Route } from "react-router-dom";

class Main extends Component {
  render() {
    return (
<Switch>
  <Route exact path="/" component={Homepage}/>
        <Route exact  path="/client" component={VotingClientSelector}/>
        <Route path="/client/:pollId" component={VotingClient}/>
        <Route exact  path="/server" component={VotingServerSelector}/>
        <Route path="/server/:pollId" component={VotingServer}/>
        <Route path="/admin" component={AddPoll}/>
</Switch>
    );
  }
}

export default Main;
