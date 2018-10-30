/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import VotingClient from './VotingClient';
import VotingClientSelector from './VotingClientSelector';
import VotingServer from './VotingServer';
import VotingServerSelector from './VotingServerSelector';
import AddPoll from './AddPoll';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (

   <div>Your Switch and Routes here. Remove the div</div>

)

export default Main
