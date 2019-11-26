import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';


const styles = {
  formContainer: {
    padding: "2rem",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexFlow: "column",
  },
  button: {
    display: "block",
    marginTop: "10px",
  }
}

class VotingServerSelector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pollId: "",
      errorMsg: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ pollId: event.target.value, errorMsg: "" });
  }

  handleSubmit(event) {
    event.preventDefault();

    //Hide possible previous error.
    this.setState({ errorMsg: "" })

    let API_URL = "";
    if (process.env.NODE_ENV === 'production') {
      API_URL = "/api/checkPoll";
    } else {
      API_URL = "https://votenow.se/api/checkPoll";
    }

    //Send a request to the cloud function to check if the poll exists. Return a bool
    axios.get(`${API_URL}/${this.state.pollId}`).then((response) => {
      console.log(response);
      if (response.data.exist) {
        this.props.history.push(`/server/${this.state.pollId}`);
      } else {
        this.setState({
          showError: true,
          errorMsg: "No poll with this ID"
        });
      }
    }).catch((error) => {
      console.log(error);
      this.setState({
        showError: true,
        errorMsg: "Couldn't check if the ID exists. Try again."
      });
    });
  }
  render() {

    const { classes } = this.props;

    return (
      <div className={classes.contentContainer}>
        <Paper className={classes.formContainer}>
          <Typography variant="h5" gutterBottom>Enter poll ID</Typography>
          <form onSubmit={this.handleSubmit}>
            <FormControl error={this.state.errorMsg !== ""} fullWidth>
              <Input id="pollId" value={this.state.pollId} onChange={this.handleInputChange} />
              <FormHelperText id="name-error-text">{this.state.errorMsg}</FormHelperText>
            </FormControl>
            <Button type='submit' color="primary" variant="contained" className={classes.button} fullWidth>
              Go!
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
};

export default withStyles(styles)(VotingServerSelector);
