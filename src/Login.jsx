import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { auth } from "./database.js";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import VerifyEmail from './utils/VerifyEmail';

const styles = {
  formContainer: {
    padding: "2rem"
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexFlow: "column"
  },
  button: {
    display: "block",
    marginTop: "10px"
  }
};

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMsg: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value, errorMsg: "" });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value, errorMsg: "" });
  }

  handleSubmit(event) {
    event.preventDefault();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => null, (error) => {
        const errorMessage = error.message;
        console.error('signIn', errorMessage);
        this.setState({ errorMsg: errorMessage });
      });
  }
  render() {

    const { classes } = this.props;
    if (auth.currentUser) {
      return (
        <div className={classes.contentContainer}>
          <Typography variant="headline" gutterBottom>Welcome {auth.currentUser.email}</Typography>
          <VerifyEmail user={auth.currentUser} />
          <Button component={Link} to="/admin/" variant="contained" color="secondary" className={classes.button}>Go to admin dashboard</Button>
        </div>
      )
    }
    return (

      <div className={classes.contentContainer}>
        <Paper className={classes.formContainer}>
          <Typography variant="headline" gutterBottom>
            Login to access the admin dashboard
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <FormControl
              error={this.state.errorMsg !== ""}
              fullWidth
            >
              <TextField label="email" id="email" value={this.state.email} onChange={this.handleEmailChange} margin="normal" />
              {/* <Input
                id="email"
                type="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              /> */}
              <TextField label="password" id="password" type="password" autoComplete="current-password" onChange={this.handlePasswordChange} margin="normal" />
              {/* <Input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              /> */}
              <FormHelperText id="name-error-text">
                {this.state.errorMsg}
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Login
            </Button>
          </form>
        </Paper>
      </div>

    );
  }


}
export default withStyles(styles)(Login);
