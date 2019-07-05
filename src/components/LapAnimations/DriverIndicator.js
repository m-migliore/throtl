import React, { Component } from 'react'

class DriverIndicator extends Component {

  render() {
    return (
      <li>
        <span className="driver-indicator" style={{'backgroundColor' : this.props.color}}></span>
        {this.props.driver}
      </li>
    )
  }
}

export default DriverIndicator
