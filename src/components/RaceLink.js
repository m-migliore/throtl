import React, { Component } from 'react';
import {connect} from 'react-redux'
//import {fetchRound} from '../actions/actionCreators'

class RaceLink extends Component {
  handleClick() {
    console.log(this.props.raceData.round)
    this.props.selectRound(this.props.raceData.round)
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
    selectRound: roundNumber => dispatch({type: "SELECT_ROUND", payload: roundNumber})
  }
}

export default connect(null, mapDispatchToProps)(RaceLink);
