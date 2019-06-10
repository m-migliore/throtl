import React, { Component } from 'react'
// import { connect } from 'react-redux'
import {spanGrandPrixLaps, spanGrandPrixResults, spanGrandPrixPits} from '../../helpers/fullRaceLapFetch'
import RacePosition from './RacePosition'

class WatchRace extends Component {
  state = {
    lapAmount: spanGrandPrixLaps.Laps.length,
    lap: 1
  }

  handleClick() {
    this.setState((prevState) => ({
      lap: prevState.lap + 1,
    }));

    this.interval = setInterval(() => this.nextLap(), 750);
  }

  nextLap() {
    this.setState((prevState) => ({
      lap: prevState.lap + 1
    }));
  }

  componentDidUpdate() {
    if (this.state.lap === this.state.lapAmount) {
      clearInterval(this.interval)
    }
    
  }



  render() {

    const laps = spanGrandPrixLaps.Laps
    const drivers = laps[0].Timings.map(lap => lap.driverId)
    const lapBreakdown = []

    drivers.forEach(driver => {
      const driverResult = spanGrandPrixResults.find(result => result.Driver.driverId === driver)

      const driverPits = spanGrandPrixPits.filter(pit => pit.driverId === driver)

      let driverLapBreakdown = laps.map(lap => {
        let info = lap.Timings.find(timing => timing.driverId === driver)
        return info
      })
      lapBreakdown.push({
        driverId: driver,
        lapInfo: driverLapBreakdown,
        result: driverResult,
        pits: driverPits
      })
    })

    console.log(lapBreakdown);

    return (
      <div>
        {this.state.lap !== this.state.lapAmount ? <h2>{`Lap ${this.state.lap}`}</h2> : <h2>Finished</h2>}
        {this.state.lap !== this.state.lapAmount ? <button onClick={this.handleClick.bind(this)}>Watch Race</button> : null}
        <div className="watch-race">
          {lapBreakdown.map(lap => <RacePosition lapData={lap} lapNumber={this.state.lap} />)}
        </div>
        
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
  
// })

// export default connect(mapStateToProps)(WatchRace)
export default WatchRace
