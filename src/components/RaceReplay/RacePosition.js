import React, { Component } from 'react'
import {connect} from 'react-redux'
import RacePositionIndicator from './RacePositionIndicator'

class RacePosition extends Component {

  convertTimeToSeconds(stringTime) {
    const timeArray = stringTime.split(":")
    const minuteValue = parseInt(timeArray[0]) * 60
    return minuteValue + parseFloat(timeArray[1])
  }

  render() {
    const driverLapData = this.props.driverLapData
    const driver = driverLapData.result.Driver
    const lapInfo = driverLapData.lapInfo
    const pits = driverLapData.pits
    const result = driverLapData.result

    let posStyle
    if (lapInfo[this.props.replayLap]) {
      posStyle = {
        top: `${parseInt(lapInfo[this.props.replayLap].position) * 30}px`
      }
    } else {
      const finalPos = driverLapData.result.position
      posStyle = {
        top: `${parseInt(finalPos) * 30}px`
      }
    }

    let dnfStatus = ""
    if(driverLapData.result.status !== "Finished") {
      let raceStatus
      if (driverLapData.result.status.includes("+")) {
        raceStatus = "lapped"
      } else {
        raceStatus = "dnf"
      }

      dnfStatus = {
        lap: driverLapData.result.laps,
        status: raceStatus,
        details: driverLapData.result.status
      }
    }

    // Determine if lap leader, and calculate interval
    let leader 
    let leaderTimeInSeconds 
    let driverTimeInSeconds 
    let isLeader 
    let lapInterval

    if (this.props.replayLap > 0) {
      leader = this.props.lapData[this.props.replayLap].Timings[0]
      leaderTimeInSeconds = this.convertTimeToSeconds(leader.time)
      driverTimeInSeconds = this.convertTimeToSeconds(lapInfo[this.props.replayLap].time)

      isLeader = leader.driverId === driver.driverId

    

      if(!isLeader && driverTimeInSeconds) {
        lapInterval = (driverTimeInSeconds - leaderTimeInSeconds).toFixed(3)
      }
    }

    let fastestLapRank = parseInt(result.FastestLap.rank)
    let fastestLapNumber = parseInt(result.FastestLap.lap)    

    return (
      <div className="race-pos" style={posStyle}>
        <p>
          {driver.givenName + " " + driver.familyName}
          {this.props.replayLap > 0 && driverTimeInSeconds ? <span className="lap-interval">{isLeader ? leader.time : "+" + lapInterval}</span> : null}
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
    replayLap: state.replayLap,
    lapData: state.lapData
  }
}

export default connect(mapStateToProps)(RacePosition)