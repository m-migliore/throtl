import React, { Component } from 'react'
import { connect } from 'react-redux'
import{ catalunya } from '../../helpers/tracks'

class DriverLapAnimation extends Component {
  state = {
    started: false,
    animations: [],
    animationCount: 0
  }

  componentDidMount() {
    const outline = document.getElementById("catalunya-outline")
    outline.innerHTML = catalunya("1ms")
  }

  componentDidUpdate(prevProps) {
    if (this.props.driverLapData.length > 0 && this.props.driverPitData.length > 0 && this.props.driverLapAnimations.length === 0) {
      // this.createAnimations()
      this.createLapAnimations(this.props.driverLapData, this.props.driverPitData)
    }

    if (this.props.replayCountdown === 0 && this.props.driverLapAnimationCount < this.props.driverLapData.length) {
      const outline = document.getElementById("catalunya-outline")
      const animations = this.props.driverLapAnimations
      const count = this.props.driverLapAnimationCount
      console.log(this.props.driverLapData[count].lapNumber)

      if (animations[count].pitStop) {
        outline.innerHTML = catalunya(animations[count].duration, animations[count].pitTime)
      } else {
        outline.innerHTML = catalunya(animations[count].duration)
      }

      const track = document.querySelector('animateMotion');
      track.addEventListener("endEvent", this.props.nextDriverAnimation)
    }
  }

  createLapAnimations(lapData, pitData) {
    let lapAnimations = []

    if (pitData.length > 0) {
      lapData.forEach(lap => {
        const lapTime = this.calcAnimationTime(lap.lapInfo.time)
        const pitStop = pitData.find(pit => pit.lap === lap.lapNumber)
        if (pitStop) {
          const pitTime = this.createPitTime(pitStop.duration)
          // if there was a pit on that lap, add pitTime for delayed animation
          lapAnimations.push({
            duration: lapTime,
            pitStop: true,
            pitTime: pitTime
          })
        } else {
          lapAnimations.push({
            duration: lapTime,
            pitStop: false
          })
        }
      })
    }

    this.props.loadDriverLapAnimations(lapAnimations)
  }

  // use to easily calculate avergae lap time
  calcAnimationTime(stringTime) {
    const lapTimeArr = stringTime.split(":")
    const baseSec = parseInt(lapTimeArr[0]) * 1000
    const remainSec = parseFloat(lapTimeArr[1]) * 10
    return Math.round(baseSec + remainSec) + "ms"
  }
  
  // use to create a 'pause' time to indicate a pit stop in the animation 
  createPitTime(stringTime) {
    return parseFloat(stringTime).toFixed(2).replace(".","") + "ms"
  }


  render() {
    return (
      <div id="catalunya-outline"></div>
    )
  }
}

const mapStateToProps = state => {
  return {
    replayStart: state.replayStart,
    replayCountdown: state.replayCountdown,
    // replayLap: state.replayLap,
    driverLapData: state.driverLapData,
    driverPitData: state.driverPitData,
    driverLapAnimations: state.driverLapAnimations,
    driverLapAnimationCount: state.driverLapAnimationCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDriverLapAnimations: animations => dispatch({type: "LOAD_DRIVER_LAP_ANIMATIONS", payload: animations}),
    nextDriverAnimation: () => dispatch({type: "NEXT_DRIVER_LAP_ANIMATION"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverLapAnimation)
