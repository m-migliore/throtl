import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchRaceData} from '../actions/actionCreators'

class RaceLink extends Component {
  handleClick() {
    if (new Date(this.props.raceData.date) < Date.now()) {
      console.log("past")
      this.props.fetchRaceData(this.props.raceData.season, this.props.raceData.round)
    } else {
      console.log("future");
      this.props.futureRace()
    }

    //this.props.fetchRaceData(this.props.raceData.season, this.props.raceData.round)
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
    futureRace: () => dispatch({type: "FUTURE_RACE"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceLink);
