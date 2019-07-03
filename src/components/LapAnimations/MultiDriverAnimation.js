import React, { Component } from 'react'
import{ trackRender } from '../../helpers/trackRender'

class MultiDriverAnimation extends Component {
  state = {
    lapRender: trackRender("albert_park")
  }

  componentDidMount() {
    const outline = document.getElementById(`track-outline-${this.props.driverAnimation.driverNumber}`)
    outline.innerHTML = this.state.lapRender({
      lapNumber: 0,
      animationDuration: "1ms",
      pitTime: "0ms"
    })
  }

  render() {
    return (
      <div id={`track-outline-${this.props.driverAnimation.driverNumber}`}className="multi-driver-animation">
        
      </div>
    )
  }
}

export default MultiDriverAnimation
