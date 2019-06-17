import React, { Component } from 'react';

class PitDetail extends Component {

  render() {
    const pit = this.props.pitData

    return (
      <div>
        <h4>Stop {pit.stop}</h4>
        <p><strong>Lap:</strong> {pit.lap}</p>
        <p><strong>Duration:</strong> {pit.duration}</p>
      </div>
    );
  }

}

export default PitDetail;