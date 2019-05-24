import React, { Component } from 'react';
import {connect} from 'react-redux'
import RaceResults from './RaceResults'
import RacePreview from './RacePreview'
import DetailedResult from './DetailedResult'

class RaceContainer extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.closeRace}>Close</button>
        {this.props.futureRace ? <RacePreview /> : <RaceResults />}
        {this.props.detailedResultView ? <DetailedResult /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    raceSeason: state.raceSeason,
    selectedRound: state.selectedRound,
    raceData: state.raceData,
    futureRace: state.futureRace,
    detailedResultView: state.detailedResultView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeRace: () => dispatch({type: "CLOSE_RACE"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceContainer);
