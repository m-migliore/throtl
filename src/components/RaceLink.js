import React, { Component } from 'react';
//import {connect} from 'react-redux'

class RaceLink extends Component {
  handleClick() {
    console.log(this.props.raceData.round);
  }

  render() {
    return (
      <li onClick={this.handleClick.bind(this)}>
        {this.props.raceData.raceName}
      </li>
    );
  }

}


export default RaceLink;
