import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AddPoll from './AddPoll';


class AdminPage extends Component {

  render() {

    return(
      <Switch>
        <Route exact path="/admin" component={AddPoll} />
      </Switch>
    );
  }
};

export default AdminPage;
