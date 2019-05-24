import React, { Component } from 'react';
import {connect} from 'react-redux'
import StandingsContainer from './StandingsContainer'
import RaceContainer from './RaceContainer'
import RaceList from './RaceList'

class SeasonContainer extends Component {
  componentDidUpdate() {
    console.log("seasn",this.props.seasonData);
  }
  render() {
    return (
      <div>
        <StandingsContainer />
        {this.props.raceView ? <RaceContainer /> : <RaceList />}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    seasonData: state.seasonData,
    raceView: state.raceView
  }
}

export default connect(mapStateToProps)(SeasonContainer);
