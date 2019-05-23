import React, { Component } from 'react';
import {connect} from 'react-redux'
import RaceResults from './RaceResults'
import RacePreview from './RacePreview'
import DetailedResult from './DetailedResult'

class RaceContainer extends Component {
  render() {
    return (
      <div>
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

export default connect(mapStateToProps)(RaceContainer);
