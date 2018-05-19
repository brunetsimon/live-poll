import React, { Component } from 'react';
import { Button, Paper } from 'material-ui';
import ratingsConst from './contants';


class Vote extends Component {

  render() {
    let listButtons = ratingsConst.map( rating => <Button key={rating.id} onClick={this.props.callbackVote.bind(null, rating.id)}>{rating.text}</Button>);
    return(
      <Paper>
        {listButtons}
        {/* <Button onClick={this.props.callbackVote.bind(null, 'Love')}></Button>
        <Button onClick={this.props.callbackVote.bind(null, 'Hate')}>Hate</Button> */}
      </Paper>
    );
  }
}

export default Vote;
