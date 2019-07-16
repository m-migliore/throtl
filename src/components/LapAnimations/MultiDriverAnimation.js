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
    const animations = this.props.driverAnimation.animations
    const count = this.state.animationCount
    const nextCount = count + 1
    const driverNumber = this.props.driverAnimation.driverNumber
    const timeDisplay = document.getElementById(`driver${driverNumber}-time`)
    const pitDisplay = document.getElementById(`driver${driverNumber}-pit`)
    

    if (animations[count].pitTime !== 0) {
      const outline = document.getElementById(`track-outline-${driverNumber}`)
      pitDisplay.innerHTML = "Pit Stop"
      outline.innerHTML = this.state.lapRender({
        animationDuration: "1ms",
        pitTime: 0
      })
      
      setTimeout(this.removePitMessage.bind(this), (animations[count].pitTime * 3))

      const track = document.getElementById(`animation${driverNumber}`)
      track.addEventListener("endEvent", this.renderPitStop.bind(this))
    } else {
      timeDisplay.innerHTML = animations[count].lapTime
      this.setState({
        animationCount: nextCount
      })
    }
  }

  renderPitStop() {
    const animations = this.props.driverAnimation.animations
    const count = this.state.animationCount
    setTimeout(this.nextLap.bind(this), animations[count].pitTime)
  }

  nextLap() {
    const count = this.state.animationCount
    const nextCount = count + 1
    this.setState({
      animationCount: nextCount
    })
  }

  removePitMessage() {
    const driverNumber = this.props.driverAnimation.driverNumber
    const pitDisplay = document.getElementById(`driver${driverNumber}-pit`)
    pitDisplay.innerHTML = ""
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
    replayStart: state.replayStart,
    trackName: state.raceData.Circuit.circuitId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDriverLapAnimations: animations => dispatch({type: "LOAD_DRIVER_LAP_ANIMATIONS", payload: animations}),
    nextDriverAnimation: () => dispatch({type: "NEXT_DRIVER_LAP_ANIMATION"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiDriverAnimation)
