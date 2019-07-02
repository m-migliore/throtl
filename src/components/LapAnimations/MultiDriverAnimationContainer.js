import React, { Component } from 'react'
import { connect } from 'react-redux'

export class MultiDriverAnimationContainer extends Component {
  componentDidUpdate() {
    if (this.props.lapData.length > 0) {
      debugger
      console.log("hit")
    }
    
  }

  render() {
    return (
      <div>
        multi driver animationz
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lapData: state.lapData,
    pitData: state.pitData
  }
}

export default connect(mapStateToProps)(MultiDriverAnimationContainer)
