import React, { Component } from 'react'
import { connect } from 'react-redux'

class FullLapAnimation extends Component {
  render() {
    return (
      <animateMotion 
        href="#circle"
        dur="3s"
        begin="0s"
        fill="freeze"
        repeatCount={this.props.lapData.length}>
        <mpath href="#catalunya" />
      </animateMotion>
    )
  }
}

const mapStateToProps = state => {
  return {
    lapData: state.lapData
  }
}

export default connect(mapStateToProps)(FullLapAnimation)
