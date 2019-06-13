import React, { Component } from 'react'
import {connect} from 'react-redux'
import RacePositionIndicator from './RacePositionIndicator'

class RacePosition extends Component {

  render() {
    const lapData = this.props.lapData
    const driver = lapData.result.Driver
    const lapInfo = lapData.lapInfo
    const pits = lapData.pits
    const result = lapData.result

    let posStyle
    if (lapInfo[this.props.replayLap]) {
      posStyle = {
        top: `${parseInt(lapInfo[this.props.replayLap].position) * 30}px`
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

    let fastestLapRank = parseInt(result.FastestLap.rank)
    let fastestLapNumber = parseInt(result.FastestLap.lap)    

    return (
      <div className="race-pos" style={posStyle}>
        <p>
          {driver.givenName + " " + driver.familyName}
          {fastestLapRank === 1 && this.props.replayLap >= fastestLapNumber ? <RacePositionIndicator iType={"fastest-lap"} message={`Fastest Lap - ${fastestLapNumber}`} /> : null}
          {pits.map(pit => parseInt(pit.lap)).includes(this.props.replayLap) && <RacePositionIndicator iType={"pit-stop"} message={"Pit Stop"} />}
          {dnfStatus.lap <= this.props.replayLap && <RacePositionIndicator iType={dnfStatus.status} message={dnfStatus.details} />}
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    replayLap: state.replayLap
  }
}

export default connect(mapStateToProps)(RacePosition)