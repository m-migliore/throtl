import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchEventData, createRacePreview} from '../../actions/actionCreators'
import {Redirect} from 'react-router-dom'

class RaceLink extends Component {
  handleClick() {
    // debugger
    // if (new Date(this.props.raceData.date) < new Date()) {
    //   this.props.fetchEventData(this.props.raceData.season, this.props.raceData.round)
    // } else {
    //   console.log(this.props.raceData.date);
      
    //   this.props.createRacePreview(this.props.seasonData.Races[this.props.raceData.round - 1])
    // }

    // if race is in future, create preview for race container, 
    // otherwise fetch results for race container
    if (this.props.raceData.future) {
      this.props.createRacePreview(this.props.seasonData.Races[this.props.raceData.round - 1])
    } else {
      this.props.fetchEventData(this.props.raceData.season, this.props.raceData.round)
    }
  }

  render() {
    // raceView becomes true on successful click
    // triggers redirect to view that race
    if (this.props.raceView) {
      return <Redirect to="/race" />
    } else {
      return (
        <span onClick={this.handleClick.bind(this)} className="cursor-pointer">
          {this.props.raceData.raceName}
        </span>
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
