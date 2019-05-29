import React, { Component } from 'react';
import {connect} from 'react-redux'
import RaceResults from './RaceResults'
import QualResults from './QualResults'
import RacePreview from './RacePreview'
import DetailedResult from './DetailedResult'

class RaceContainer extends Component {
  render() {
    if (this.props.loading) {
      return <h1>Loading</h1>
    } else if (this.props.raceView) {
      return (
        <div>
          <button onClick={this.props.closeRace}>Close</button>
          {this.props.futureRace ? <RacePreview /> : <RaceResults />}
          {this.props.qualData.length > 1 ? <QualResults /> : null}
          {this.props.detailedResultView ? <DetailedResult /> : null}
        </div>
      )
    } else {
      return <h1>Race Data Not Found</h1>
    }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    raceView: state.raceView,
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
