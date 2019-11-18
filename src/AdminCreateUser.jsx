import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { auth } from "./database.js";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import generator from "generate-password";
import axios from "axios";

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

class AdminCreateUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      errorMsg: "",
      redirect: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value, errorMsg: "" });
  }

  handleSubmit(event) {
    event.preventDefault();

    const password = generator.generate({
      length: 8,
      numbers: true,
      excludeSimilarCharacters: true,
    });

    let API_URL_EMAIL = "";
    if (process.env.NODE_ENV === 'production') {
      API_URL_EMAIL = "/api/checkemail";
    } else {
      API_URL_EMAIL = "https://votenow.se/api/checkemail";
    }

    //Send a request to the cloud function to check if the email is valid. Return a bool
    axios.get(`${API_URL_EMAIL}/${this.state.email}`).then((response) => {
      console.log(response);
      if (response.data) {
        auth.createUserWithEmailAndPassword(this.state.email, password)
          .then(() => {
            axios.post('/api/welcome', {
              email: this.state.email,
              password: password
            })
              .then(function (response) {
                this.setState({ success: true, email: "", errorMsg: "" });
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
                this.setState({ errorMsg: error.message });
              });
          })
          .catch(error => {
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
              error.message = ERROR_MSG_ACCOUNT_EXISTS;
            }
            console.error('SignUp', error.message);
            this.setState({ errorMsg: error.message });
          });
      } else {
        this.setState({
          showError: true,
          errorMsg: "Email is not valid. Use work email"
        });
      }
    }).catch((error) => {
      console.log(error);
      this.setState({
        showError: true,
        errorMsg: "Couldn't check if the email is valid. Try again."
      });
    });
  }
  render() {

    const { classes } = this.props;

    const isInvalid = this.state.email === '';

    return (

      <div className={classes.contentContainer}>
        <Paper className={classes.formContainer}>
          <Typography variant="h3" gutterBottom>
            Create/Invite a new user.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Enter their work email. They will then get an invitation via email.
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <FormControl
              error={this.state.errorMsg !== ""}
              fullWidth
            >
              <TextField label="email" id="email" value={this.state.email} onChange={this.handleEmailChange} margin="normal" />
              <FormHelperText id="name-error-text">
                {this.state.errorMsg}
              </FormHelperText>
              <FormHelperText id="name-error-text">
                {this.state.success && "User invited"}
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isInvalid}
              className={classes.button}
            >
              Create new account
            </Button>
          </form>
        </Paper>
      </div>

    );
  }


}
export default withStyles(styles)(AdminCreateUser);
