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
    database.ref('/pi/6/A/ratingCount').on('value', (snap) => {
      this.setState({"countArray": snap.val()});
    });
  }

  render() {

      return (
        <div>
          <h1>Let's see the live votes</h1>
          <BarChart data={[["Love", this.state.countArray[2]], ["Medium", this.state.countArray[1]], ["Hate", this.state.countArray[0]]]} />
        </div>
      );
  }
}

export default VotingServer;
