import React, { Component } from 'react';
import VotingClient from './VotingClient';
import Navigation from './Navigation';
import Main from './Main';


class App extends Component {
  render() {
    return (
      <main>
        <Navigation />
        <Main />
      </main>
    );
  }
}

export default App;
