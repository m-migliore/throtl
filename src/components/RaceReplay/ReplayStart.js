import React, { Component } from 'react'
import { connect } from 'react-redux'
import StartLightContainer from "../StartLight/StartLightContainer";

export class ReplayStart extends Component {

  constructor(props) {
    super(props)
  
    this.handleClick = this.handleClick.bind(this)
  }
  
  componentDidUpdate() {
    if (this.props.replayCountdown === 1) {
      this.props.startReplay()
    }
    if (this.props.replayCountdown === 0) {
      clearInterval(this.countdownInterval)
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.countdownInterval)
  }
  
  handleClick() {
    this.countdownInterval = setInterval(() => this.props.replayCountdownLight(this.props.replayCountdown - 1), 1000)
  }

  render() {
  
    return (
      <>
        {this.props.replayCountdown === 6 && <button onClick={this.handleClick} className="btn btn-defualt">Start Replay</button>}
        {this.props.replayCountdown < 6 && this.props.replayLap < 2 ?	<StartLightContainer /> : null}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    replayStart: state.replayStart,
    replayCountdown: state.replayCountdown,
    replayLap: state.replayLap
  }
}

const mapDispatchToProps =  dispatch => {
  return {
    startReplay: () => dispatch({type: "START_REPLAY"}),
    replayCountdownLight: countdownNumber => dispatch({type: "REPLAY_COUNTDOWN_LIGHT", payload: countdownNumber})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplayStart)
