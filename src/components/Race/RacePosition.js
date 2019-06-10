import React, { Component } from 'react'

class RacePosition extends Component {
  state = {
    dnfStatus: null
  }

  render() {
    const lapData = this.props.lapData
    const lapInfo = lapData.lapInfo
  
    let posStyle
    if (lapInfo[this.props.lapNumber - 1]) {
      posStyle = {
        top: `${parseInt(lapInfo[this.props.lapNumber - 1].position) * 30}px`
      }
    } else {
      const finalPos = lapData.result.position
      posStyle = {
        top: `${parseInt(finalPos) * 30}px`
      }
    }

    let dnfStatus = ""
    if(lapData.result.status !== "Finished") {
      dnfStatus = {
        lap: lapData.result.laps,
        status: lapData.result.status
      }
    }

    return (
      <div className="race-pos" style={posStyle}>
        <p>
          {lapData.driverId}
          {dnfStatus.lap <= this.props.lapNumber ? <span className="dnf">{` ${dnfStatus.status}`}</span> : null}
        </p>
      </div>
    )
  }
}

export default RacePosition