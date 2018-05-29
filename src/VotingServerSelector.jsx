import React, { Component } from 'react';
import { Input, Paper, Button, withStyles, Typography, FormControl, FormHelperText } from 'material-ui';
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
    this.setState({pollId: event.target.value, errorMsg: ""});
  }

  handleSubmit(event) {
    event.preventDefault();

    let ref = "/polls/"+this.state.pollId;
    this.setState({validateStatus: 'validating', errorMsg: ""})
    database.ref(ref).once('value', (snap) => {
      if (snap.val() != null) {
        this.props.history.push(`/server/${this.state.pollId}`);
      } else {
        this.setState({showError : true, errorMsg: "Wrong ID"});
      }
    });
  }
  render() {

    const { classes } = this.props;

    return(
      <div className={classes.contentContainer}>
        <Paper className={classes.formContainer}>
          <Typography variant="headline" gutterBottom="true" >Enter your poll number</Typography>
          <form onSubmit={this.handleSubmit}>
            <FormControl error={this.state.errorMsg !== ""} fullWidth>
              <Input id="pollId" value={this.state.pollId} onChange={this.handleInputChange} />
              <FormHelperText id="name-error-text">{this.state.errorMsg}</FormHelperText>
            </FormControl>
            <Button type='submit' color="primary" variant="raised" className={classes.button} fullWidth>
              Go!
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
};

export default withStyles(styles)(VotingServerSelector);