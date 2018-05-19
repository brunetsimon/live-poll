import React, { Component } from 'react';
import { Button, Paper } from 'material-ui';
import ratingsConst from './contants';


class Result extends Component {

  render() {
    return(
      <Paper>
        <h2>Thank you for voting</h2>
        <h3>Your rating: {ratingsConst[this.props.rating].text} - {ratingsConst[this.props.rating].id}</h3>
      </Paper>
    );
  }
}

export default Result;
