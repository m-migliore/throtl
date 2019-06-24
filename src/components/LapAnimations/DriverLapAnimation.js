import React, { Component } from 'react'
import { connect } from 'react-redux'
import{ catalunya } from '../../helpers/tracks'

class DriverLapAnimation extends Component {
  componentDidMount() {
    const outline = document.getElementById("catalunya-outline")
    outline.innerHTML = catalunya("1ms")
  }

  componentDidUpdate() {
    if (this.props.replayCountdown === 0 && this.props.replayLap < this.props.driverLapData.length && this.props.replayStart) {
      // const outline = document.getElementById("catalunya-outline")
      // outline.innerHTML = ""
      // const lapTime = this.props.driverLapData[this.props.replayLap].lapInfo.time
      // let animateTime
      // const lapTimeArr = lapTime.split(":")
      // const baseSec = parseInt(lapTimeArr[0]) * 1000
      // const remainSec = parseFloat(lapTimeArr[1]).toFixed(2) * 10
      // animateTime = baseSec + remainSec + "ms"

      // if (this.props.driverPitData.length > 0) {
      //   const pitLaps = this.props.driverPitData.map(pit => parseInt(pit.lap))
  
      //   if (pitLaps.includes(this.props.replayLap)) {
      //     // // eslint-disable-next-line eqeqeq
      //     // const pitStop  = this.props.driverPitData.find(pit => pit.lap == this.props.replayLap)
      //     // const pitTime = parseFloat(pitStop.dur).toFixed(2).replace(".","") * .25
      //     // outline.innerHTML = "<h3>Pit Stop</h3>" + catalunya(animateTime, pitTime)
      //     outline.innerHTML = "<h3>Pit Stop</h3>" + catalunya(animateTime)
      //   } else {
      //     outline.innerHTML = catalunya(animateTime)
      //   }
      // }

      
    }

    if (this.props.driverLapData.length > 0 && this.props.driverPitData.length > 0) {
      this.createAnimationQueue()
    }
  }

  createAnimationQueue() {
    if(this.props.driverLapData.length > 0 && this.props.driverLapData) {
      let animationBlocks = []
      let sliceStart = 0

      // this.props.driverPitData.forEach(pit => {
      //   const block = this.props.driverLapData.slice(sliceStart, parseInt(pit.lap) - 1)
      //   animationBlocks.push(this.createAnimationBlocks(block))
      //   const pitTime = this.createPitTime(pit.duration)
      //   animationBlocks.push({
      //     aniType: "pit",
      //     duration: "1ms",
      //     repeatCount: "1",
      //     pitTime: pitTime
      //   })
      //   sliceStart = parseInt(pit.lap) 
      // })



      let driverPits = [...this.props.driverPitData]

      while (driverPits.length > 0) {
        const pitStop = driverPits.shift()
        if (sliceStart === 0) {
          sliceStart -= 1
        }
        const block = this.props.driverLapData.slice(sliceStart + 1, parseInt(pitStop.lap))
        animationBlocks.push(this.createAnimationBlocks(block))
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
        animationBlocks.push(this.createAnimationBlocks(block))
      }

    

      console.log(animationBlocks)
      debugger
    }
  }

  createAnimationBlocks(block) {
    const lapTimes = block.map(lap => this.calcAnimationTime(lap.lapInfo.time))
    const reducer = (total, lapTime) => total + lapTime
    const averageLapTime = Math.round(lapTimes.reduce(reducer) / lapTimes.length) + "ms"

    return {
      aniType: "laps",
      duration: averageLapTime,
      repeatCount: block.length
    }
  }

  calcAnimationTime(stringTime) {
    const lapTimeArr = stringTime.split(":")
    const baseSec = parseInt(lapTimeArr[0]) * 1000
    const remainSec = parseFloat(lapTimeArr[1]).toFixed(2) * 10
    return baseSec + remainSec
  }
  
  createPitTime(stringTime) {
    return parseFloat(stringTime).toFixed(2).replace(".","") * .25 + "ms"
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
    replayLap: state.replayLap,
    driverLapData: state.driverLapData,
    driverPitData: state.driverPitData
  }
}

export default connect(mapStateToProps)(DriverLapAnimation)
