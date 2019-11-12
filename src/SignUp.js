import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { auth } from "./database.js";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

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

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead.
`;


class SignUp extends Component {



  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password1: "",
      password2: "",
      errorMsg: "",
      redirect: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassword1Change = this.handlePassword1Change.bind(this);
    this.handlePassword2Change = this.handlePassword2Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value, errorMsg: "" });
  }

  handlePassword1Change(event) {
    this.setState({ password1: event.target.value, errorMsg: "" });
  }
  handlePassword2Change(event) {
    this.setState({ password2: event.target.value, errorMsg: "" });
  }

  handleSubmit(event) {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password1)
    .then(() => {
      this.setState({redirect: true});
    })
    .catch(error => {
      if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
        error.message = ERROR_MSG_ACCOUNT_EXISTS;
      }
      console.error('SignUp', error.message);
      this.setState({errorMsg: error.message});
    });
  }
  render() {

    const { classes } = this.props;

    const isInvalid = 
      this.state.password1 !== this.state.password2 ||
      this.state.password1 === '' ||
      this.state.email === '';

    if (this.state.redirect) {
      return (
        <Redirect to="/admin/" />
      )
    }
    return(

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
              <TextField label="email" id="email" value={this.state.email} onChange={this.handleEmailChange} margin="normal"/>
              {/* <Input
                id="email"
                type="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              /> */}
              <TextField label="password" id="password1" type="password" autoComplete="current-password" onChange={this.handlePassword1Change} margin="normal"/>
              <TextField label="re-enter password" id="password2" type="password" autoComplete="current-password" onChange={this.handlePassword2Change} margin="normal"/>
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
              disabled={isInvalid}
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
export default withStyles(styles)(SignUp);
