import React, { Component } from 'react';
import {connect} from 'react-redux'
import Moment from 'react-moment'
import CircuitInfo from './CircuitInfo'

class RaceContainer extends Component {
  componentDidMount() {
    fetch(`http://ergast.com/api/f1/${this.props.raceSeason}/${this.props.selectedRound}/results.json`)
    .then(r => r.json())
    .then(data => {
      console.log(data.MRData.RaceTable.Races[0])
      this.props.loadRaceData(data.MRData.RaceTable.Races[0])
    })
  }



  render() {

    return (
      <div>
        <div className="race-title">
          <h1>{this.props.raceData.raceName}</h1>
          <p><Moment date={this.props.raceData.date} format="LLL"/></p>
        </div>
        {Object.keys(this.props.raceData).length > 0 ? <CircuitInfo circuitData={this.props.raceData.Circuit} /> : null}
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
