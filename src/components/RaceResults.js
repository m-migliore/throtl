import React, { Component } from 'react';
import {connect} from 'react-redux'

class RaceResults extends Component {
  componentDidMount() {
    fetch(`http://ergast.com/api/f1/${this.props.raceSeason}/${this.props.selectedRound}/results.json`)
    .then(r => r.json())
    .then(data => console.log(data.MRData.RaceTable.Races[0].Results))
  }

  render() {
    return (
      <div>results yo</div>
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

export default connect(mapStateToProps)(RaceResults);
