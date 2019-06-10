import React, { Component } from 'react'

class RacePosition extends Component {
  render() {
    let posStyle
    if (this.props.lapInfo.lapInfo[this.props.lapNumber - 1]) {
      posStyle = {
        top: `${parseInt(this.props.lapInfo.lapInfo[this.props.lapNumber - 1].position) * 20}px`
      }
    } else {
      posStyle = {
        top: "800px"
      }
    }
    

    return (
      <div className="race-pos" style={posStyle}>
        {this.props.lapInfo.driverId}
      </div>
    )
  }
}

export default RacePosition