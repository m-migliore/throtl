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
    //   this.nextLap()
    // }
    this.setState((prevState, props) => ({
      lap: prevState.lap + 1
    }));
  }

  // nextLap() {
  //   this.setState((prevState) => ({
  //     lap: prevState.lap += 1
  //   }));
  // }

  // componentDidUpdate() {
  //   if (this.state.lap > 1 && this.state.lap < this.state.lapAmount){
  //     this.setState((prevState, props) => ({
  //       lap: prevState.lap + 1
  //     }));
  //   }  
  // }


  render() {

    const results = spanGrandPrixResults
    const laps = spanGrandPrixLaps.Laps
    let lapNumber = 1
    const drivers = laps[0].Timings.map(lap => lap.driverId)
    const lapBreakdown = []

    drivers.forEach(driver => {
      let driverLapBreakdown = laps.map(lap => {
        let info = lap.Timings.find(timing => timing.driverId === driver)
        return info
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
