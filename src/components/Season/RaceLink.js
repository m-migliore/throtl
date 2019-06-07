import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchEventData, createRacePreview} from '../../actions/actionCreators'
import {Link} from 'react-router-dom'

class RaceLink extends Component {
  handleClick() {
    // if race is in future, create preview for race container, 
    // otherwise fetch results for race container
    if (this.props.raceData.future) {
      this.props.createRacePreview(this.props.seasonData.Races[this.props.raceData.round - 1])
    } else {
      this.props.fetchEventData(this.props.raceData.season, this.props.raceData.round)
    }
  }

  render() {
    return (
      <Link to="/race" onClick={this.handleClick.bind(this)}>{this.props.raceData.raceName}</Link>
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
    fetchEventData: (season, round) => dispatch(fetchEventData(season, round)),
    createRacePreview: previewData => dispatch(createRacePreview(previewData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceLink);
