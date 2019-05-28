import React, { Component } from 'react';
import {connect} from 'react-redux'
import RaceResults from './RaceResults'
import QualResults from './QualResults'
import RacePreview from './RacePreview'
import DetailedResult from './DetailedResult'

class RaceContainer extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.closeRace}>Close</button>
        {this.props.futureRace ? <RacePreview /> : <RaceResults />}
        {this.props.qualData.length > 0 ? <QualResults /> : null}
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
    qualData: state.qualData,
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
