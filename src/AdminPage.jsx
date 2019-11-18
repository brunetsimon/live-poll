import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { auth } from "./database.js";
import VerifyEmail from './utils/VerifyEmail';

const styles = {
  title: {
    marginTop: "15vh",
    marginBottom: "10vh",
    fontSize: "1.7em"
  },
  container: {
    width: "100vw",
    maxWidth: "600px",
    padding: "10px",
    textAlign: "center",
    margin: "0 auto"
  },
  button: {
    display: "block",
    marginBottom: "30px",
    textAlign: "center"
  },
  icon: {
    fontSize: 20,
  },
  snackbar: {
    backgroundColor: "#e53935",
    margin: "30px 10px 40px 10px"
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}
class AdminPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSnack: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.user.emailVerified) {
      this.setState({ showSnack: false });
    } else {
      this.setState({ showSnack: true });
    }
  }

  handleSubmit() {

    auth.currentUser.sendEmailVerification()
      .then(console.log("Verification email sent"))
      .catch((error) => console.log("Something went wrong", error))
      .finally(this.setState({ showSnack: false }));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography className={classes.title} component="h1" variant="h4" gutterBottom>Admin dashboard</Typography>
        <VerifyEmail user={this.props.user} />
        <Button component={Link} to="/admin/list/" variant="contained" color="secondary" className={classes.button}>All polls</Button>
        <Button component={Link} to="/admin/addpoll/" variant="contained" color="secondary" className={classes.button}>Add a polls</Button>
        <Button component={Link} to="/admin/users/" variant="contained" color="secondary" className={classes.button}>List users</Button>
      </div>

    );
  }
};

export default withStyles(styles)(AdminPage);
