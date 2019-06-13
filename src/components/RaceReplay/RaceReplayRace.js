import React, { Component } from 'react'
import { connect } from 'react-redux'
import RacePosition from "./RacePosition";

export class RaceReplayRace extends Component {

  render() {
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
    
      // add lap zero to lap data fetch
      driverLapBreakdown.unshift(lapZero);
    
      lapBreakdown.push({
        driverId: driver,
        lapInfo: driverLapBreakdown,
        result: driverResult,
        pits: driverPits,
      });
    });

  
    return (
      <div className="race-replay">
        {lapBreakdown.map(lap => (
          <RacePosition key={lap.driverId} driverLapData={lap} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    raceData: state.raceData,
    qualData: state.qualData,
    pitData: state.pitData,
    replayLap: state.replayLap,
    lapData: state.lapData,
  }
}

export default connect(mapStateToProps)(RaceReplayRace)
