import React, { Component } from 'react'

class DriverIndicator extends Component {

  render() {
    return (
      <div id={"driver" + this.props.driverNumber} className="multi-driver-indicator">
        <span className="driver-indicator-color" style={{'backgroundColor' : this.props.color}}></span>
        <span>{this.props.driver}</span>
        <span id={`driver${this.props.driverNumber}-time`}></span>
        <span id={`driver${this.props.driverNumber}-status`}></span>
      </div>
    )
  }
}

export default DriverIndicator
