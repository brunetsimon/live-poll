import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { database } from './database.js';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = {
  formContainer: {
    padding: "2rem",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    flex: 1,
    flexFlow: "column",
    padding: "20px"

  },
  button: {
    display: "block",
    marginTop: "10px",
  },
  container: {
    width: "100vw",
    maxWidth: "600px",
    padding: "10px",
    textAlign: "center",
    margin: "0 auto"
  },
  back: {
    float: "left"
  },
  title: {
    marginTop: "20px",
    marginBottom: "10vh",
    fontSize: "1.7em"
  },
  clearfix: {
    content: "",
    clear: "both",
    display: "table",
  },
}

class AddPoll extends Component {


  constructor(props) {
    super(props);

    this.state = {
      pollId: "",
      pollName: "",
      errorMsg: "",
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleIdChange(event) {
    this.setState({ pollId: event.target.value });
  }
  handleNameChange(event) {
    this.setState({ pollName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.pollId === "" || this.state.pollName === "") {
      this.setState({ errorMsg: "ID and Name can't be empty" });
      return;
    };

    this.setState({ errorMsg: "" });

    // Order is important since set() override everything
    let ref = "/polls/" + this.state.pollId;
    database.ref(ref).set({
      'pollName': this.state.pollName,
      'dateCreated': Date.now(),
      'voteOpen': true,
    });
    ref = "/polls/" + this.state.pollId + "/ratingCount";
    database.ref(ref).push({
      '0': 0,
    });
    this.setState({ pollId: "" });
    this.props.history.push(`/admin/list`);
  }

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <IconButton className={classes.back} aria-label="Back" onClick={this.props.history.goBack}>
          <ArrowBackIcon />
        </IconButton>
        <div className={classes.clearfix}></div>
        <Typography className={classes.title} component="h1" variant="h4" gutterBottom>Create a new poll</Typography>
        <Paper className={classes.formContainer}>
          <form onSubmit={this.handleSubmit}>
            <FormControl error={this.state.errorMsg !== ""} fullWidth>
              <TextField label="Id" id="pollId" value={this.state.pollId} onChange={this.handleIdChange} margin="normal" />
              <FormHelperText id="name-error-text">
                {this.state.errorMsg}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <TextField label="Name" id="pollName" value={this.state.pollName} onChange={this.handleNameChange} margin="normal" />
            </FormControl>
            <Button type='submit' color="primary" variant="contained" className={classes.button} fullWidth>
              Create!
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
};

export default withStyles(styles)(AddPoll);
