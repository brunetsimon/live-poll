import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { auth } from "./../database.js";


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
class VerifyEmail extends Component {

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
        {this.state.showSnack && <SnackbarContent className={classes.snackbar}
          message={
            <span className={classes.message}>
              <ErrorIcon className={classes.icon} />
              You need to verify your email to create and view polls
            </span>
          }
          action={[
            <Button key="a" size="small" className={classes.verif} onClick={this.handleSubmit}>
              Send verification email
            </Button>
          ]}
        />
        }
      </div>

    );
  }
};

export default withStyles(styles)(VerifyEmail);
