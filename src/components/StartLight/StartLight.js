import React, { Component } from 'react'
import { connect } from 'react-redux'

export class StartLight extends Component {
  constructor(props) {
    super(props)

    this.lightRender = this.lightRender.bind(this)
  }

  lightRender() {
    if (this.props.replayCountdown <= this.props.lightNumber && this.props.replayCountdown > 0) {
      return " countdown"
    } else if (this.props.replayCountdown === 0 && this.props.replayStart) {
      return " go"
    } else {
      return ""
    }
  }

  render() {
    return (
      <span className={`start-light${this.lightRender()}`}></span>
    )
  }
}

const mapStateToProps = (state) => ({
  replayCountdown: state.replayCountdown,
  replayStart: state.replayStart
})

export default connect(mapStateToProps)(StartLight)
