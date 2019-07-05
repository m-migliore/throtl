import React, { Component } from 'react'

class DriverIndicator extends Component {

  render() {
    return (
      <li>
        <span className="driver-indicator" style={{'background-color' : this.props.color}}></span>
        {this.props.driver}
      </li>
    )
  }
}

export default DriverIndicator
