import React, { Component } from 'react'

class RacePositionIndicator extends Component {

  render() {
    return (
      <span className={`indicator ${this.props.iType}`}>{` ${this.props.message}`}</span>
    )
  }
}

export default RacePositionIndicator