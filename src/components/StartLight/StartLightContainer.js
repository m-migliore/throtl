import React, { Component } from 'react'
import { connect } from 'react-redux'
import StartLight from  './StartLight'

class StartLightContainer extends Component {

  render() {
    return (
      <div className="start-light-container">
        <StartLight lightNumber={1} />
        <StartLight lightNumber={2} />
        <StartLight lightNumber={3} />
        <StartLight lightNumber={4} />
        <StartLight lightNumber={5} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    replayStart: state.replayStart
  }
}


export default connect(mapStateToProps)(StartLightContainer)
