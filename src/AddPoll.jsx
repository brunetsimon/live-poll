import React, { Component } from 'react';
import { Input, Paper, Button, withStyles, Typography, FormControl } from 'material-ui';
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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({pollId: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let ref = "/polls/"+this.state.pollId+"/ratingCount";
    database.ref(ref).push({
      '0' : 0,
    });
  }
  render() {

    const { classes } = this.props;
    return(
      <div className={classes.contentContainer}>
        <Paper className={classes.formContainer}>
          <Typography variant="headline" gutterBottom="true" >Create poll ID</Typography>
          <form onSubmit={this.handleSubmit}>
            <FormControl fullWidth>
              <Input id="pollId" value={this.state.pollId} onChange={this.handleInputChange} />
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