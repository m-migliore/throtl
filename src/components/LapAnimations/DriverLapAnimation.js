import React, { Component } from 'react'
import { connect } from 'react-redux'
import{ trackRender } from '../../helpers/tracks'

class DriverLapAnimation extends Component {
  state = {
    lapRender: trackRender("catalunya")
  }

  componentDidMount() {
    const outline = document.getElementById("catalunya-outline")
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
      const outline = document.getElementById("catalunya-outline")
      const animations = this.props.driverLapAnimations
      const count = this.props.driverLapAnimationCount

      outline.innerHTML = this.state.lapRender(animations[count])
      const track = document.querySelector('animateMotion');
      track.addEventListener("endEvent", this.props.nextDriverAnimation)
    }

    if (this.props.replayCountdown === 0 && this.props.driverLapAnimationCount === this.props.driverLapData.length) {
      const outline = document.getElementById("catalunya-outline")
      outline.innerHTML = this.state.lapRender({
        lapNumber: "Finished",
        animationDuration: "1ms",
        pitTime: "0ms"
      })
    }
  }

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
      <div id="catalunya-outline"></div>
    )
  }
}

const mapStateToProps = state => {
  return {
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
