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
      this.createAnimations()
    }

    if (this.props.replayCountdown === 0 && this.props.driverLapAnimationCount < this.props.driverLapData.length) {
      const outline = document.getElementById("catalunya-outline")
      const animations = this.props.driverLapAnimations
      const count = this.props.driverLapAnimationCount
      console.log(count)
      
      if (animations[count].aniType === "lap") {
        outline.innerHTML = catalunya(animations[count].duration, animations[count].repeatCount)
        const track = document.querySelector('animateMotion');
        track.addEventListener("endEvent", this.props.nextDriverAnimation)

      } else {
        // remove event listener to prevent immediate next lap
        const track = document.querySelector('animateMotion');
        track.removeEventListener("endEvent", this.props.nextDriverAnimation, true)
        // add true argument to indicate pit stop
        outline.innerHTML = catalunya(animations[count].duration, animations[count].repeatCount, true)
        setTimeout(this.props.nextDriverAnimation, animations[count].pitTime)
      }      
    }
    
  }

  createAnimations() {
    if(this.props.driverLapData.length > 0 && this.props.driverLapData) {
      let animationBlocks = []
      let sliceStart = 0
      let driverPits = [...this.props.driverPitData]

      while (driverPits.length > 0) {
        const pitStop = driverPits.shift()
        if (sliceStart === 0) {
          sliceStart -= 1
        }
        
        // create a block of laps that inbetween pits
        const block = this.props.driverLapData.slice(sliceStart + 1, parseInt(pitStop.lap))
        // animationBlocks.push(this.createAnimationBlocks(block))
        const lapAnimations = this.createAnimationBlocks(block)
        lapAnimations.forEach(lap => animationBlocks.push(lap))
        const pitTime = this.createPitTime(pitStop.duration)
        animationBlocks.push({
          aniType: "pit",
          duration: "1ms",
          repeatCount: "1",
          pitTime: pitTime
        })
        sliceStart = parseInt(pitStop.lap) 
      }

      if (sliceStart < this.props.driverLapData.length) {
        const block = this.props.driverLapData.slice(sliceStart + 1, this.props.driverLapData.length + 1)
        // animationBlocks.push(this.createAnimationBlocks(block))
        const lapAnimations = this.createAnimationBlocks(block)
        lapAnimations.forEach(lap => animationBlocks.push(lap))
      }

      this.props.loadDriverLapAnimations(animationBlocks)
    }
  }

  createAnimationBlocks(block) {
    // const lapTimes = block.map(lap => this.calcAnimationTime(lap.lapInfo.time))
    // const reducer = (total, lapTime) => total + lapTime
    // get average lap time to use as animation time
    // const averageLapTime = Math.round(lapTimes.reduce(reducer) / lapTimes.length) + "ms"

    // return {
    //   aniType: "laps",
    //   duration: averageLapTime,
    //   repeatCount: block.length
    // }


    return block.map(lap => {
      const lapTime = this.calcAnimationTime(lap.lapInfo.time)
      return {
        aniType: "lap",
        duration: lapTime,
        repeatCount: "1"
      }
    })
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
