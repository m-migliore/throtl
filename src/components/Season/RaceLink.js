import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchEventData, createRacePreview} from '../../actions/actionCreators'
import {Redirect} from 'react-router-dom'

class RaceLink extends Component {
  handleClick() {
    if (new Date(this.props.raceData.date) < Date.now()) {
      debugger
      this.props.fetchEventData(this.props.raceData.season, this.props.raceData.round)
    } else {
      this.props.createRacePreview(this.props.seasonData.Races[this.props.raceData.round - 1])
    }
  }

  render() {

    if (this.props.raceView) {
      return <Redirect to="/race" />
    } else {
      return (
        <li onClick={this.handleClick.bind(this)}>
          {this.props.raceData.raceName}
        </li>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    seasonData: state.seasonData,
    raceView: state.raceView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEventData: (season, round) => dispatch(fetchEventData(season, round)),
    createRacePreview: previewData => dispatch(createRacePreview(previewData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceLink);
