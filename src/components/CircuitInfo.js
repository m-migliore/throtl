import React, { Component } from 'react';

class CircuitInfo extends Component {

  render() {
    const circuit = this.props.circuitData
    return (
      <div>
        <h2>{circuit.circuitName}</h2>
        <p>{circuit.Location.country}, {circuit.Location.locality}</p>
      </div>
    );
  }

}

export default CircuitInfo;
