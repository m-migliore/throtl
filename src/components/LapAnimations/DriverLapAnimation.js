import React, { Component } from 'react'
import { connect } from 'react-redux'
import{ trackRender } from '../../helpers/trackRender'

class DriverLapAnimation extends Component {
  state = {
    lapRender: trackRender(this.props.detailedResultData.circuitId)
  }

  componentDidMount() {
    const outline = document.getElementById("track-outline")
    outline.innerHTML = this.state.lapRender({
      lapNumber: 0,
      animationDuration: "1ms",
      pitTime: "0ms"
    })
  }

  componentDidUpdate() {
    if (this.props.driverLapData.length > 0 && this.props.driverPitData.length > 0 && this.props.driverLapAnimations.length === 0) {
      this.createLapAnimations(this.props.driverLapData, this.props.driverPitData)
    }

    if (this.props.replayCountdown === 0 && this.props.driverLapAnimationCount < this.props.driverLapData.length) {
      const outline = document.getElementById("track-outline")
      const animations = this.props.driverLapAnimations
      const count = this.props.driverLapAnimationCount

      outline.innerHTML = this.state.lapRender(animations[count])
      const track = document.querySelector('animateMotion');
      track.addEventListener("endEvent", this.props.nextDriverAnimation)
    }

    if (this.props.replayCountdown === 0 && this.props.driverLapAnimationCount === this.props.driverLapData.length) {
      const outline = document.getElementById("track-outline")
      const track = document.querySelector('animateMotion');
      track.removeEventListener("endEvent", this.props.nextDriverAnimation, true)
      outline.innerHTML = this.state.lapRender({
        lapNumber: "Finished",
        animationDuration: "1ms",
        pitTime: "0ms"
      })
    }
  }

  // used to create all of the animations for laps and pit data 
  createLapAnimations(lapData, pitData) {
    let lapAnimations = []

    if (pitData.length > 0) {
      lapData.forEach(lap => {
        let animationObj = this.createAnimationObj(lap)

        const pitStop = pitData.find(pit => pit.lap === lap.lapNumber)
        if (pitStop) {
          const pitTime = this.createPitTime(pitStop.duration)
          // if there was a pit on that lap, add pitTime for delayed animation
          animationObj = {
            ...animationObj,
            pitTime: pitTime
          }
        }

        lapAnimations.push(animationObj)
      })
    }

    this.props.loadDriverLapAnimations(lapAnimations)
  }

  // create an object to pass data into the lap animation display
  // if there is no pit stop the pitTime will be 0ms
  createAnimationObj(lap) {
    const animationTime = this.calcAnimationTime(lap.lapInfo.time)
    return {
      lapNumber: lap.lapNumber,
      position: lap.lapInfo.position,
      lapTime: lap.lapInfo.time,
      animationDuration: animationTime,
      pitTime: "0ms"
    }
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
      <div id="track-outline"></div>
    )
  }
}

const mapStateToProps = state => {
  return {
    detailedResultData: state.detailedResultData,
    replayStart: state.replayStart,
    replayCountdown: state.replayCountdown,
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
