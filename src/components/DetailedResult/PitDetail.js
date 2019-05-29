import React, { Component } from 'react';

class PitDetail extends Component {

  render() {
    const pit = this.props.pitData

    return (
      <div>
        <h3>Pitstops</h3>
        <p><strong>Stop:</strong> {pit.stop}</p>
        <p><strong>Lap:</strong> {pit.lap}</p>
        <p><strong>Duration:</strong> {pit.duration}</p>
        <p><strong>Time:</strong> {pit.time}</p>
      </div>
    );
  }

}

export default PitDetail;
