import React, { Component } from 'react'

class DriverIndicator extends Component {

  render() {
    return (
      <li id={"driver" + this.props.driverNumber}>
        <span className="driver-indicator" style={{'backgroundColor' : this.props.color}}></span>
        {this.props.driver}
        <span id={`driver${this.props.driverNumber}-time`}></span>
        <span id={`driver${this.props.driverNumber}-pit`}></span>
      </li>
    )
  }
}

export default DriverIndicator
