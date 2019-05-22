import React, { Component } from 'react';
import {connect} from 'react-redux'

class RaceResults extends Component {
  componentDidMount() {
    fetch(`http://ergast.com/api/f1/${this.props.raceSeason}/${this.props.selectedRound}/results.json`)
    .then(r => r.json())
    .then(data => {
      console.log(data.MRData.RaceTable.Races[0])
      this.props.loadRaceResults(data.MRData.RaceTable.Races[0])
    })
  }

  render() {
    let race = this.props.raceResults
    //let circuit = race.Circuit
    //let results = race.Results

    return (
      <div>
        <h1>{race.raceName} Results</h1>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    raceSeason: state.raceSeason,
    selectedRound: state.selectedRound,
    raceResults: state.raceResults
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRaceResults: results => dispatch({type: "LOAD_RACE_RESULTS", payload: results})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceResults);
