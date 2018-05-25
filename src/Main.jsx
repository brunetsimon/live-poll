import React from 'react';
import { Switch, Route } from 'react-router-dom';
import VotingClientPage from './VotingClientPage';
import VotingServerPage from './VotingServerPage';
import AddPoll from './AddPoll';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (

    <Switch>
      <Route exact path='/' component={VotingClientPage}/>
      <Route path='/server' component={VotingServerPage}/>
      <Route path='/client' component={VotingClientPage}/>
      <Route path="/admin" component={AddPoll}/>
    </Switch>

)

export default Main