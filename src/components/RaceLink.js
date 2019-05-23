import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchRaceData} from '../actions/actionCreators'

class RaceLink extends Component {
  handleClick() {
    this.props.fetchRaceData(this.props.raceData.season, this.props.raceData.round)
  }

  render() {
    return (
      <li onClick={this.handleClick.bind(this)}>
        {this.props.raceData.raceName}
      </li>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRaceData: (season, round) => dispatch(fetchRaceData(season, round))
  }
}

export default connect(null, mapDispatchToProps)(RaceLink);
