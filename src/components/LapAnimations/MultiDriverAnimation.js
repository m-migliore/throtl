import React, { Component } from 'react'
import { connect } from 'react-redux'
import{ multiDriverTrackRender } from '../../helpers/multiDriverTrackRender'

class MultiDriverAnimation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lapRender: multiDriverTrackRender(this.props.trackName, this.props.driverAnimation.driverNumber),
      animationCount: 0
    }
    this.nextAnimation = this.nextAnimation.bind(this)
  }

  componentDidMount() {
    const outline = document.getElementById(`track-outline-${this.props.driverAnimation.driverNumber}`)
    outline.innerHTML = this.state.lapRender({
      lapNumber: 0,
      animationDuration: "1ms",
      pitTime: 0
    })
  }

  componentDidUpdate() {
    if (this.props.replayStart && this.state.animationCount < this.props.driverAnimation.animations.length - 1) {
      const outline = document.getElementById(`track-outline-${this.props.driverAnimation.driverNumber}`)
      const animations = this.props.driverAnimation.animations
      const count = this.state.animationCount
      const driverNumber = this.props.driverAnimation.driverNumber

      outline.innerHTML = this.state.lapRender(animations[count])

      const track = document.getElementById(`animation${driverNumber}`)
      track.addEventListener("endEvent", this.nextAnimation)
      
    } else if (this.props.replayStart && this.state.animationCount === this.props.driverAnimation.animations.length - 1) {
      const outline = document.getElementById(`track-outline-${this.props.driverAnimation.driverNumber}`)
      outline.remove()
    }
  }

  nextAnimation() {
    //const animations = this.props.driverAnimation.animations
    const count = this.state.animationCount
    const nextCount = count + 1
    console.log(count);
    
    // setTimeout(function () {
    //   this.setState({
    //     animationCount: nextCount
    //   })
    // }.bind(this), animations[count].pitTime)
    this.setState({
      animationCount: nextCount
    })
  }

  render() {
    return (
      <>
        <div id={`track-outline-${this.props.driverAnimation.driverNumber}`} className="multi-driver-animation"></div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    //detailedResultData: state.detailedResultData,
    replayStart: state.replayStart,
    trackName: state.raceData.Circuit.circuitId
    // replayCountdown: state.replayCountdown,
    // driverLapData: state.driverLapData,
    // driverPitData: state.driverPitData,
    // driverLapAnimations: state.driverLapAnimations,
    // driverLapAnimationCount: state.driverLapAnimationCount,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDriverLapAnimations: animations => dispatch({type: "LOAD_DRIVER_LAP_ANIMATIONS", payload: animations}),
    nextDriverAnimation: () => dispatch({type: "NEXT_DRIVER_LAP_ANIMATION"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiDriverAnimation)
