import React, { Component } from 'react'
import { connect } from 'react-redux'
import {spanGrandPrixLaps, spanGrandPrixResults, spanGrandPrixPits} from '../../helpers/fullRaceLapFetch'
import RacePosition from './RacePosition'
import {fetchLapData} from '../../actions/actionCreators'

class WatchRace extends Component {
  state = {
    lapAmount: spanGrandPrixLaps.length
  }

  componentDidMount() {
    this.props.fetchLapData(2019, 5)
  }

  handleClick() {
    this.interval = setInterval(() => this.props.nextLap(this.props.watchRaceLap + 1), 750);
  }

  nextLap() {
    this.setState((prevState) => ({
      lap: prevState.lap + 1
    }));
  }

  componentDidUpdate() {
    if (this.props.watchRaceLap === this.state.lapAmount) {
      clearInterval(this.interval)
    }
  }

  render() {

    if (this.props.lapData.length > 0) {
      const laps = spanGrandPrixLaps
    const drivers = laps[0].Timings.map(lap => lap.driverId)
    const lapBreakdown = []

    drivers.forEach(driver => {
      const driverResult = spanGrandPrixResults.find(result => result.Driver.driverId === driver)
      // const driverResult = this.props.raceData.Results.find(result => result.Driver.driverId === driver)

      const driverPits = spanGrandPrixPits.filter(pit => pit.driverId === driver)
      // const driverPits = this.props.pitData.filter(pit => pit.driverId === driver)

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

    return (
      <div>
        {this.props.watchRaceLap !== this.state.lapAmount ? <button onClick={this.handleClick.bind(this)}>Watch Race</button> : null}
        {this.props.watchRaceLap !== this.state.lapAmount ? <h2>{`Lap ${this.props.watchRaceLap}`}</h2> : <h2>Finished</h2>}
        <div className="watch-race">
          {lapBreakdown.map(lap => <RacePosition key={lap.driverId} lapData={lap} />)}
        </div>
        
      </div>
    )
    } else {
      return <h1>Loading</h1>
    }
  }
}

const mapStateToProps = state => {
  return {
    raceData: state.raceData,
    pitData: state.pitData,
    watchRaceLap: state.watchRaceLap,
    lapData: state.lapData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    nextLap: lapNumber => dispatch({type: "NEXT_LAP", payload: lapNumber}),
    fetchLapData: (season, round) => dispatch(fetchLapData(season, round))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchRace)
