import React, { Component } from 'react'
// import { connect } from 'react-redux'
import {spanGrandPrixLaps, spanGrandPrixResults} from '../../helpers/fullRaceLapFetch'
import RacePosition from './RacePosition'

class WatchRace extends Component {
  state = {
    lapAmount: spanGrandPrixLaps.Laps.length,
    lap: 1
  }

  handleClick() {
    // while (this.state.lap < this.state.lapAmount) {
    //   setTimeout(this.nextLap, 1500);
    // }
    this.setState((prevState, props) => ({
      lap: prevState.lap += 1
    }));
  }

  nextLap(lapNumber) {
    this.setState((prevState) => ({
      lap: prevState.lap += 1
    }));
  }


  render() {

    const results = spanGrandPrixResults
    const laps = spanGrandPrixLaps.Laps
    let lapNumber = 1
    const drivers = laps[0].Timings.map(lap => lap.driverId)
    const lapBreakdown = []

    // drivers.forEach(driver => {
    //   lapBreakdown[driver] = laps.map(lap => {
    //     let lapNumber = lap.number
    //     let info = lap.Timings.find(timing => timing.driverId === driver)
    //     return {
    //       lap: lapNumber,
    //       info: info
    //     }
    //   })
    // })

    drivers.forEach(driver => {
      let driverLapBreakdown = laps.map(lap => {
        let lapNumber = lap.number
        let info = lap.Timings.find(timing => timing.driverId === driver)
        return info
        // return {
        //   lap: lapNumber,
        //   info: info
        // }
      })
      lapBreakdown.push({
        driverId: driver,
        lapInfo: driverLapBreakdown
      })
    })

    console.log(lapBreakdown);
    
    

    return (
      <div>
        <h2>Lap {this.state.lap}</h2>
        <button onClick={this.handleClick.bind(this)}>Watch Race</button>
        <div className="watch-race">
          {/* {laps[this.state.lap - 1].Timings.map((lap,idx) => {
            const posStyle = {
              top: `${(idx + 1) * 20}px`
            }
            return <p className="race-pos" style={posStyle}>{lap.driverId}</p>
          })} */}

          {lapBreakdown.map(lap => <RacePosition lapInfo={lap} lapNumber={this.state.lap}/>)}
        </div>
        
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
  
// })

// export default connect(mapStateToProps)(WatchRace)
export default WatchRace
