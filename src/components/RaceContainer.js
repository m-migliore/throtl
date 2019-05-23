import React, { Component } from 'react';
import {connect} from 'react-redux'
import Moment from 'react-moment'
import CircuitInfo from './CircuitInfo'
import RaceResults from './RaceResults'

class RaceContainer extends Component {
  render() {
    const raceData = this.props.raceData

    return (
      <div>
        <div className="race-title">
          <h1>{raceData.raceName}</h1>
          <p><Moment date={raceData.date} format="LLL"/></p>
        </div>
        <CircuitInfo circuitData={raceData.Circuit} />
        <RaceResults results={raceData.Results} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    raceSeason: state.raceSeason,
    selectedRound: state.selectedRound,
    raceData: state.raceData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRaceData: raceData => dispatch({type: "LOAD_RACE_DATA", payload: raceData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceContainer);
