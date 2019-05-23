import React, { Component } from 'react';
import Moment from 'react-moment'
import CircuitInfo from './CircuitInfo'

class RaceTitle extends Component {
  render() {
    const titleData = this.props.titleData

    return (
      <div>
        <div className="race-title">
          <h1>{titleData.raceName}</h1>
          <p><Moment date={titleData.date} format="LLL"/></p>
        </div>
        <CircuitInfo circuitData={titleData.Circuit} />
      </div>
    );
  }

}

export default RaceTitle;
