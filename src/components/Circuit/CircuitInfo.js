import React, { Component } from 'react';
import {connect} from 'react-redux'
import FlagImage from '../Image/FlagImage'
import TrackSVG from './TrackSVG'

class CircuitInfo extends Component {

  render() {
    if (this.props.circuitData.circuitId) {
      const circuit = this.props.circuitData
      
      return (
        <div>
          <h2><a href={circuit.url} rel="noopener noreferrer" target="_blank">{circuit.circuitName}</a></h2>
          <FlagImage flagName={circuit.Location.country} />
          <p>{circuit.Location.locality}, {circuit.Location.country}</p>
          <TrackSVG trackName={circuit.circuitId} />
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
