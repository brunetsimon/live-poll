import React, { Component } from 'react';
import Vote from './Vote';
import Result from './Result';
import database from './database.js';

class VotingClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hadVoted: false,
      rating: null,
    }

    this.handleRatingCallback = this.handleRatingCallback.bind(this);
  }

  handleRatingCallback(rating) {
    console.log(rating);
    this.setState({hadVoted: true, rating: rating});
    database.ref('/pi/6/A/votes').push({
      'rating' : rating,
    });
    // database.ref('/pi/6/A/ratingCount').once('value').then( snap => {
    //   var old_count = parseInt(snap.val(),10);
    //   var new_count = old_count;
    //   if (this.state.rating == 'Love') {
    //     new_count[0] = new_count[0]+1;
    //   } else {
    //     new_count[1] = new_count[1]+1;
    //   }
    //   this.setState({countArray: new_count});
    // })
    // database.ref('/pi/6/A/ratingCount').update({countArray: this.state.new_count});
  }
  render() {

      let result = this.state.result;
      return (
        <div>
          <h1>Let's vote!?</h1>
          {
          this.state.hadVoted === true ? <Result rating={this.state.rating}/> : <Vote callbackVote={this.handleRatingCallback}/> 
          }
        </div>
      );
  }
}

export default VotingClient;
