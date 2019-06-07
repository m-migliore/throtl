import React, { Component } from 'react'

class RacePosition extends Component {
  render() {
    const posStyle = {
      top: `${parseInt(this.props.lapInfo.lapInfo[this.props.lapNumber - 1].position) * 20}px`
    }

    return (
      <div className="race-pos" style={posStyle}>
        {this.props.lapInfo.driverId}
      </div>
    )
  }
}

export default RacePosition