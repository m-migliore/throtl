import React, { Component } from 'react'
import { connect } from 'react-redux'

class DriverLapAnimation extends Component {

  render() {
    let animateTime
  
    if (this.props.replayLap === 0) {
      animateTime = 0
    } else {
      const rawLapTime = this.props.driverLapData[this.props.replayLap - 1].lapInfo.time.split(":")
      const baseSec = parseInt(rawLapTime[0]) * 1000
      const remainSec = parseFloat(rawLapTime[0]).toFixed(2)* 100
      animateTime = baseSec + remainSec + "ms"
    }

    return (
      <animateMotion 
        href="#circle"
        dur="2s"
        begin="0s"
        fill="freeze"
        repeatCount={this.props.driverLapData.length}>
        <mpath href="#catalunya" />
      </animateMotion>
    )
  }
}

const mapStateToProps = state => {
  return {
    driverLapData: state.driverLapData,
    replayLap: state.replayLap
  }
}

export default connect(mapStateToProps)(DriverLapAnimation)
