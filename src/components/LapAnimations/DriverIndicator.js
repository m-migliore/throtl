import React, { Component } from 'react'

class DriverIndicator extends Component {

  render() {
    return (
      <li id={"driver" + this.props.driverNumber}>
        <span className="driver-indicator" style={{'backgroundColor' : this.props.color}}></span>
        {this.props.driver}
      </li>
    )
  }
}

export default DriverIndicator
