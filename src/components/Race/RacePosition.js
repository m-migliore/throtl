import React, { Component } from 'react'
import RacePositionIndicator from './RacePositionIndicator'

class RacePosition extends Component {


  render() {
    const lapData = this.props.lapData
    const lapInfo = lapData.lapInfo
    const pits = lapData.pits
  
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
      let raceStatus
      if (lapData.result.status.includes("+")) {
        raceStatus = "lapped"
      } else {
        raceStatus = "dnf"
      }

      dnfStatus = {
        lap: lapData.result.laps,
        status: raceStatus,
        details: lapData.result.status
      }
    }

    return (
      <div className="race-pos" style={posStyle}>
        <p>
          {lapData.driverId}
          {pits.map(pit => parseInt(pit.lap)).includes(this.props.lapNumber) ? <RacePositionIndicator iType={"pit-stop"} message={"Pit Stop"} /> : null}
          {dnfStatus.lap <= this.props.lapNumber ? <RacePositionIndicator iType={dnfStatus.status} message={dnfStatus.details} /> : null}
        </p>
      </div>
    )
  }
}

export default RacePosition