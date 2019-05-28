import React, { Component } from 'react';

class FastestLap extends Component {

  render() {
    const fastestLap = this.props.fastestLap
    return (
      <div>
        <h3>Fastest Lap</h3>
        <p><strong>Time:</strong> {fastestLap.Time.time}</p>
        <p><strong>Average Speed:</strong> {fastestLap.AverageSpeed.speed + fastestLap.AverageSpeed.units}</p>
        <p><strong>Lap Number:</strong> {fastestLap.lap}</p>
        <p><strong>Rank:</strong> {fastestLap.rank}</p>
      </div>
    );
  }

}

export default FastestLap;
