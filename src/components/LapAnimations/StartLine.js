import React, { Component } from 'react'

class StartLine extends Component {

  render() {

    return (
      <animateMotion 
        href="#circle"
        dur="1ms"
        begin="0s"
        fill="freeze"
        repeatCount="1">
        <mpath href="#catalunya" />
      </animateMotion>
    )
  }
}

export default StartLine
