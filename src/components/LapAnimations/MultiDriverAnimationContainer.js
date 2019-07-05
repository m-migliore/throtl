import React, { Component } from 'react'
import { connect } from 'react-redux'
import { trackpaths } from '../../helpers/trackpaths'
import MultiDriverAnimation from './MultiDriverAnimation';
import DriverIndicator from './DriverIndicator'


export class MultiDriverAnimationContainer extends Component {
  state = {
    animationsLoaded: false,
    driverLapAnimations: [],
    driverIndicators: []
  }

  componentDidMount() {
    const mainTrack = document.getElementById("main-track")
    const trackName = this.props.raceData.Circuit.circuitId
    mainTrack.innerHTML = `
    <svg width="600" height="300" viewBox="0 0 500 350">
      ${trackpaths[trackName]}
    </svg>`
  }

  componentDidUpdate() {
    console.log(this.state)

    if (this.props.lapData.length > 0 && this.props.pitData && !this.state.animationsLoaded) {
      console.log("hit")

      let driverNumberCount = 1


      const laps = this.props.lapData;
      const drivers = laps[0].Timings.map(lap => lap.driverId);
      const lapBreakdown = [];
      drivers.forEach(driver => {
        console.log(driver)
        // const driverResult = spanGrandPrixResults.find(result => result.Driver.driverId === driver)
        const driverResult = this.props.raceData.Results.find(result => result.Driver.driverId === driver);
       
        // add qual data for correct starting grid,
        // edge cases for when there are starts from the pit lane
        const driverQual = this.props.qualData.find(qual => qual.Driver.driverId === driver);
       
        // const driverPits = spanGrandPrixPits.filter(pit => pit.driverId === driver)
        const driverPits = this.props.pitData.filter(pit => pit.driverId === driver);

        let driverLaps = []
        laps.forEach(lap => {
          let timing = lap.Timings.find(time => time.driverId === driver)
          driverLaps.push({
            ...timing,
            lapNumber: lap.number
          })
        })
       
        // let driverLapBreakdown = laps.map(lap => {
        //   let info = lap.Timings.find(timing => timing.driverId === driver);

        //   return {
        //     ...info,
        //     lapNumber: parseInt(lap.number)
        //   }
        // });
         
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

        this.createLapAnimations(driverLaps, driverPits, driverNumberCount)
       
        // // add lap zero to lap data fetch
        // driverLapBreakdown.unshift(lapZero);
       
        // lapBreakdown.push({
        //   driverId: driver,
        //   lapInfo: driverLapBreakdown,
        //   result: driverResult,
        //   pits: driverPits,
        // });
       

        const driverColors = {
          1: "red",
          2 :"blue",
          3: "yellow",
          4: "orange",
          5: "purple",
          6: "magenta",
          7: "green",
          8: "slategray",
          9: "coral",
          10: "steelblue",
          11: "moccasin",
          12: "tomato",
          13: "maroon",
          14: "rosybrown",
          15: "springgreen",
          16: "navy",
          17: "lavender",
          18: "gold",
          19: "darkred",
          20: "dodgerblue"
        }

        let updatedDriverIndicators = this.state.driverIndicators.push({
          driver: driver,
          color: driverColors[driverNumberCount]
        })

        this.setState({
          driverIndicators: updatedDriverIndicators
        })

        if (driverNumberCount === 20) {
          this.setState({
            animationsLoaded: true
          })
        }

        console.log(this.state.driverColors)
        driverNumberCount++

      });

      
    }

    
  }

  // used to create all of the animations for laps and pit data 
  createLapAnimations(lapData, pitData, driverNumberCount) {
    let lapAnimations = []

    lapData.forEach(lap => {
      if (lap.time) {
        let animationObj = this.createAnimationObj(lap)
        if (pitData.length > 0) {
          const pitStop = pitData.find(pit => pit.lap === lap.lapNumber)
          if (pitStop) {
            const pitTime = this.createPitTime(pitStop.duration)
            // if there was a pit on that lap, add pitTime for delayed animation
            animationObj = {
              ...animationObj,
              pitTime: pitTime
            }
          }
        }

        lapAnimations.push(animationObj)
      }
    })
    
    let updatedAllAnimations = this.state.driverLapAnimations
    updatedAllAnimations.push({
      driverNumber: driverNumberCount,
      animations: lapAnimations
    })
    console.log(updatedAllAnimations)

    this.setState({
      driverLapAnimations: updatedAllAnimations
    })
 
    //this.props.loadDriverLapAnimations(lapAnimations)
  }
 
  // create an object to pass data into the lap animation display
  // if there is no pit stop the pitTime will be 0ms
  createAnimationObj(lap) {
    const animationTime = this.calcAnimationTime(lap.time)
    return {
      // lapNumber: lap.lapNumber,
      // position: lap.lapInfo.position,
      lapTime: lap.time,
      animationDuration: animationTime,
      pitTime: "0ms"
    }
  }
   
  // use to easily calculate avergae lap time
  calcAnimationTime(stringTime) {
    const lapTimeArr = stringTime.split(":")
    const baseSec = parseInt(lapTimeArr[0]) * 2000
     const remainSec = parseFloat(lapTimeArr[1]) * 10
     return Math.round(baseSec + remainSec) + "ms"
  }
     
  // use to create a 'pause' time to indicate a pit stop in the animation
  createPitTime(stringTime) {
    return parseFloat(stringTime).toFixed(2).replace(".","") + "ms"
  }

  render() {
    return (
      <div className="container my-5">
        <h4>Drivers</h4>
        <ul>
          {this.state.driverIndicators.length > 0 && this.state.driverIndicators.map(driver => <DriverIndicator key={driver.driver} driver={driver.driver} color={driver.color} />)}
        </ul>
        <div id="svg-holder" onClick={this.props.startReplay}>
          <div id="main-track"></div>
          {this.state.animationsLoaded && this.state.driverLapAnimations.map(driverAnimation => {
            return <MultiDriverAnimation key={driverAnimation.driverNumber} driverAnimation={driverAnimation} />
          })}
        </div>
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

const mapDispatchToProps = dispatch => {
  return {
    startReplay: () => dispatch({type: "START_REPLAY"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiDriverAnimationContainer)