import React, { Component } from 'react';
import database from './database.js';

import ReactChartkick, { BarChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart);

class VotingServer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countArray: [],
    }
  }

  componentDidMount() {
    let ref = "/polls/"+this.props.match.params.pollId+"/ratingCount";
    database.ref(ref).on('value', (snap) => {
      this.setState({"countArray": snap.val()});
    });
  }

  render() {

      return (
        <div>
          <h1>Poll - {this.props.match.params.pollId}</h1>
          <BarChart download={this.props.match.params.pollId} data={[["Love", this.state.countArray[2]], ["Medium", this.state.countArray[1]], ["Hate", this.state.countArray[0]]]} />
        </div>
      );
  }
}

export default VotingServer;
