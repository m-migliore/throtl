import React, { Component } from 'react'
import { connect } from 'react-redux'

export class MultiDriverAnimationContainer extends Component {
  state = {
    driver1LapAnimationCount: 0,
    driver2LapAnimationCount: 0,
    driver3LapAnimationCount: 0,
    driver4LapAnimationCount: 0,
    driver5LapAnimationCount: 0,
    driver6LapAnimationCount: 0,
    driver7LapAnimationCount: 0,
    driver8LapAnimationCount: 0,
    driver9LapAnimationCount: 0,
    driver10LapAnimationCount: 0,
    driver11LapAnimationCount: 0,
    driver12LapAnimationCount: 0,
    driver13LapAnimationCount: 0,
    driver14LapAnimationCount: 0,
    driver15LapAnimationCount: 0,
    driver16LapAnimationCount: 0,
    driver17LapAnimationCount: 0,
    driver18LapAnimationCount: 0,
    driver19LapAnimationCount: 0,
    driver20LapAnimationCount: 0,
    driver1LapAnimations: [],
    driver2LapAnimations: [],
    driver3LapAnimations: [],
    driver4LapAnimations: [],
    driver5LapAnimations: [],
    driver6LapAnimations: [],
    driver7LapAnimations: [],
    driver8LapAnimations: [],
    driver9LapAnimations: [],
    driver10LapAnimations: [],
    driver11LapAnimations: [],
    driver12LapAnimations: [],
    driver13LapAnimations: [],
    driver14LapAnimations: [],
    driver15LapAnimations: [],
    driver16LapAnimations: [],
    driver17LapAnimations: [],
    driver18LapAnimations: [],
    driver19LapAnimations: [],
    driver20LapAnimations: []
  }
  componentDidUpdate() {
    if (this.props.lapData.length > 0 && this.props.pitData) {
      debugger
      console.log("hit")

      let driverNumberCount = 1


      const laps = this.props.lapData;
      const drivers = laps[0].Timings.map(lap => lap.driverId);
      const lapBreakdown = [];
      drivers.forEach(driver => {
        // const driverResult = spanGrandPrixResults.find(result => result.Driver.driverId === driver)
        const driverResult = this.props.raceData.Results.find(result => result.Driver.driverId === driver);
       
        // add qual data for correct starting grid,
        // edge cases for when there are starts from the pit lane
        const driverQual = this.props.qualData.find(qual => qual.Driver.driverId === driver);
       
        // const driverPits = spanGrandPrixPits.filter(pit => pit.driverId === driver)
        const driverPits = this.props.pitData.filter(pit => pit.driverId === driver);
       
        let driverLapBreakdown = laps.map(lap => {
          let info = lap.Timings.find(timing => timing.driverId === driver);
          return info;
        });
         
        // edge case for when driver does not have qualifying data
        let startingPosition
        if (driverQual) {
          startingPosition = driverQual.position
        } else {
          startingPosition = driverResult.grid
        }
        // Create lap zero for laps for starting watch race
        const lapZero = {
          driverid: driver,
          position: startingPosition,
          time: "0:00.000",
        };

        debugger
       
        // // add lap zero to lap data fetch
        // driverLapBreakdown.unshift(lapZero);
       
        // lapBreakdown.push({
        //   driverId: driver,
        //   lapInfo: driverLapBreakdown,
        //   result: driverResult,
        //   pits: driverPits,
        // });
      });
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
      <div>
        multi driver animationz
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    raceData: state.raceData,
    qualData: state.qualData,
    lapData: state.lapData,
    pitData: state.pitData
  }
}

export default connect(mapStateToProps)(MultiDriverAnimationContainer)
