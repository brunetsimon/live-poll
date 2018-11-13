import React, { Component } from 'react';
import { Paper, Button, withStyles, Typography, TextField, FormControl, FormHelperText } from 'material-ui';
import database from './database.js';

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
    this.setState({pollId: event.target.value});
  }
  handleNameChange(event) {
    this.setState({pollName: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.pollId === "" || this.state.pollName === "") {
     this.setState({errorMsg: "ID and Name can't be empty"}); 
     return;
    };

    this.setState({errorMsg: ""});
    
    // Order is important since set() override everything
    let ref = "/polls/"+this.state.pollId;
    database.ref(ref).set({
      'pollName' : this.state.pollName,
    });
    ref = "/polls/"+this.state.pollId+"/ratingCount";
    database.ref(ref).push({
      '0' : 0,
    });
    this.setState({pollId: ""});
    this.props.history.push(`/`);
  }
  render() {

    const { classes } = this.props;
    return(
      <div className={classes.contentContainer}>
        <Paper className={classes.formContainer}>
          <Typography variant="headline" gutterBottom >Create a new poll</Typography>
          <form onSubmit={this.handleSubmit}>
            <FormControl error={this.state.errorMsg !== ""} fullWidth>
              <TextField label="Id" id="pollId" value={this.state.pollId} onChange={this.handleIdChange} margin="normal"/>
              <FormHelperText id="name-error-text">
                {this.state.errorMsg}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <TextField label="Name" id="pollName" value={this.state.pollName} onChange={this.handleNameChange} margin="normal"/>
            </FormControl>
            <Button type='submit' color="primary" variant="raised" className={classes.button} fullWidth>
              Create!
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
};

export default withStyles(styles)(AddPoll);
