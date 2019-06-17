import React, { Component } from 'react'
import { connect } from 'react-redux'

class DriverLapAnimation extends Component {

  render() {
    const lapTime = this.props.driverLapData[this.props.replayLap - 1].time
    
    return (
      <animateMotion 
        href="#circle"
        dur={"0" + lapTime}
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
