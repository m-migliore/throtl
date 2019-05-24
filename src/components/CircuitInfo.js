import React, { Component } from 'react';

class CircuitInfo extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const circuit = this.props.circuitData
    return (
      <div>
        <h2>{circuit.circuitName}</h2>
        <p>{circuit.Location.locality}, {circuit.Location.country}</p>
      </div>
    );
  }

}

export default CircuitInfo;
