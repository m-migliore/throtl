import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchRaceData, createRacePreview} from '../actions/actionCreators'

class RaceLink extends Component {
  handleClick() {
    if (new Date(this.props.raceData.date) < Date.now()) {
      console.log("past")
      this.props.fetchRaceData(this.props.raceData.season, this.props.raceData.round)
    } else {
      console.log("future");
      this.props.createRacePreview(this.props.seasonData.Races[this.props.raceData.round - 1])
    }
  }

  render() {
    return (
      <li onClick={this.handleClick.bind(this)}>
        {this.props.raceData.raceName}
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    seasonData: state.seasonData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRaceData: (season, round) => dispatch(fetchRaceData(season, round)),
    createRacePreview: previewData => dispatch(createRacePreview(previewData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceLink);