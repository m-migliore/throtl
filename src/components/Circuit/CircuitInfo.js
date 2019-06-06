import React, { Component } from 'react';
import {connect} from 'react-redux'
import FlagImage from '../Image/FlagImage'

class CircuitInfo extends Component {
  componentDidMount() {
    console.log(this.props.circuitData);
  }
  render() {
    if (this.props.circuitData.circuitId) {
      const circuit = this.props.circuitData
      
      return (
        <div>
          <h2>{circuit.circuitName}</h2>
          <FlagImage flagName={circuit.Location.country} />
          <p>{circuit.Location.locality}, {circuit.Location.country}</p>
        </div>
      );

    } else {
      return <h1>No Circuit Info Found</h1>
    }
  }

}

const mapStateToProps = state => {
  return {
    circuitData: state.circuitData
  }
}

export default connect(mapStateToProps)(CircuitInfo);
