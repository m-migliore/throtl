import React, { Component } from 'react';
import {connect} from 'react-redux'
import RaceResults from './RaceResults'
import RacePreview from './RacePreview'

class RaceContainer extends Component {
  render() {
    return (
      // <div>
      //   <div className="race-title">
      //     <h1>{raceData.raceName}</h1>
      //     <p><Moment date={raceData.date} format="LLL"/></p>
      //   </div>
      //   <CircuitInfo circuitData={raceData.Circuit} />
      //   <RaceResults results={raceData.Results} />
      //
      //   {this.props.futureRace ? <RacePreview /> : <RaceResults />}
      // </div>
      <div>
        {this.props.futureRace ? <RacePreview /> : <RaceResults />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    raceSeason: state.raceSeason,
    selectedRound: state.selectedRound,
    raceData: state.raceData,
    futureRace: state.futureRace
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     loadRaceData: raceData => dispatch({type: "LOAD_RACE_DATA", payload: raceData})
//   }
// }

export default connect(mapStateToProps)(RaceContainer);
