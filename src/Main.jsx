/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import VotingClientSelector from "./VotingClientSelector";
import VotingClient from "./VotingClient";
import VotingServerSelector from "./VotingServerSelector";
import VotingServer from "./VotingServer";
import Homepage from "./Homepage.jsx";
import AddPoll from "./AddPoll";
import ListPoll from "./ListPoll";
import ListUsers from "./ListUsers";
import Login from "./Login";
import SignUp from "./SignUp";
import { auth } from "./database.js";
import HourglassEmpty from '@material-ui/icons/HourglassEmpty';
import AdminPage from "./AdminPage";
import { Switch, Route, Redirect } from "react-router-dom";
import { matchPath } from "react-router";

class Main extends Component {

  state = {
    authed: false,
    loading: true,
    user: null
  }

  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          user: user,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: null
        });
      }
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }

  render() {

    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/client" component={VotingClientSelector} />
        <Route path="/client/:pollId" component={VotingClient} />
        <Route exact path="/server" component={VotingServerSelector} />
        <Route path="/server/:pollId" component={VotingServer} />
        <PrivateRoute authed={this.state.authed} load={this.state.loading} path="/admin/" exact component={(props) => <AdminPage {...props} user={this.state.user} />} />
        <PrivateRoute authed={this.state.authed} load={this.state.loading} path="/admin/addpoll" component={AddPoll} />
        <PrivateRoute authed={this.state.authed} load={this.state.loading} path="/admin/list" component={ListPoll} />
        <PrivateRoute authed={this.state.authed} load={this.state.loading} path="/admin/users" component={(props) => <ListUsers {...props} user={this.state.user} />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    );
  }
}

const PrivateRoute = ({ component: Component, authed, load, ...rest }) => (
  <Route {...rest} render={props => (
    authed === true ? (
      <Component {...props} />
    ) :
      load === true ? (
        <p><HourglassEmpty /> Loading</p>
      ) :
        (
          <Redirect to={{
            pathname: '/login',
          }} />
        )
  )} />
)

export default Main;
