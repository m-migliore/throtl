import React, { Component } from 'react';
import {connect} from 'react-redux'
import RaceContainer from './RaceContainer'
import RaceList from './RaceList'

class SeasonContainer extends Component {
  render() {
    return (
      <div>
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
