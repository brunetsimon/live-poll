import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const styles = {
  formContainer: {
    padding: "2rem"
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexFlow: "column",
    padding: "10px"
  },
  button: {
    display: "block",
    marginTop: "10px"
  },
  success: {
    backgroundColor:"#33cc33",
    padding: "10px"
  }
};

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password1: "",
      password2: "",
      errorMsg: "",
      successMsg: "",
      processing: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassword1Change = this.handlePassword1Change.bind(this);
    this.handlePassword2Change = this.handlePassword2Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.recaptchaRef = React.createRef();

  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value, errorMsg: "", successMsg: "" });
  }

  handlePassword1Change(event) {
    this.setState({ password1: event.target.value, errorMsg: "", successMsg: "" });
  }
  handlePassword2Change(event) {
    this.setState({ password2: event.target.value, errorMsg: "", successMsg: "" });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({processing: true});
    const recaptchaValue = this.recaptchaRef.current.getValue();

    let API_URL_EMAIL = "";
    let API_URL_CREATE = "";
    if (process.env.NODE_ENV === 'production') {
      API_URL_EMAIL = "/api/checkemail";
      API_URL_CREATE = "/api/createuser";
    } else {
      API_URL_EMAIL = "https://votenow.se/api/checkemail";
      API_URL_CREATE = "https://votenow.se/api/createuser";
    }

    //Send a request to the cloud function to check if the email is valid. Return a bool
    axios.get(`${API_URL_EMAIL}/${this.state.email}`).then((response) => {
      console.log(response);
      if (response.data) {
        axios.post(`${API_URL_CREATE}`, {email: this.state.email, password: this.state.password1, recaptcha: recaptchaValue}).then((response) => {
          console.log(response);
          
          if(response.data) {
            this.setState({successMsg: "User created", email: "", password1:"", password2:"", processing: false});
          } else {
            this.setState({errorMsg: response.data, processing: false});
          }
        }).catch((error => {
          console.log(error.response.data.error);
          
          this.setState({errorMsg:  error.response.data.error, processing: false});
        }));
      } else {
        this.setState({
          errorMsg: "Email is not valid. Use work email", 
          processing: false,
        });
      }
    }).catch((error) => {
      console.log(error);
      this.setState({
        errorMsg: "Couldn't check if the email is valid. Try again.",
        processing: false
      });
    });

    
  }
  render() {

    const { classes } = this.props;

    const isInvalid = 
      this.state.password1 !== this.state.password2 ||
      this.state.password1 === '' ||
      this.state.email === '' ;

    return(

      <div className={classes.contentContainer}>
        <Paper className={classes.formContainer}>
          <Typography variant="h4" gutterBottom>
            Signup to be able to create new poll
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <FormControl
              error={this.state.errorMsg !== ""}
              fullWidth
            >
              <TextField label="email" id="email" value={this.state.email} onChange={this.handleEmailChange} margin="normal"/>

              <TextField label="password" id="password1" type="password" autoComplete="current-password" onChange={this.handlePassword1Change} margin="normal"/>
              <TextField label="re-enter password" id="password2" type="password" autoComplete="current-password" onChange={this.handlePassword2Change} margin="normal"/>

              <FormHelperText id="name-error-text">
                {this.state.errorMsg}
              </FormHelperText>
            </FormControl>
            <ReCAPTCHA
              ref={this.recaptchaRef}
              sitekey="6LcSJMMUAAAAAJX5i0jhcGfm9ftEgylmk5K3wqBR"
              onChange={this.handleCaptchaResponseChange}
            />
            {this.state.successMsg && <h3 className={classes.success}>{this.state.successMsg}</h3>}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isInvalid}
              className={classes.button}
            >
              {this.state.processing ? "Wait..." : "Create new account"}
            </Button>
          </form>
        </Paper>
      </div>

    );
  }


}
export default withStyles(styles)(SignUp);
