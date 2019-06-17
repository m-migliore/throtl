import React, { Component } from 'react';
import {connect} from 'react-redux'
import FastestLap from './FastestLap'
import PitDetail from './PitDetail'
import {NATIONS} from '../../helpers/nations.js'
import FlagImage from '../Image/FlagImage'
import { fetchDriverLaps } from '../../actions/actionCreators'

class DetailedResult extends Component {

  componentDidMount() {
    this.props.fetchDriverLaps(this.props.season, this.props.round, this.props.driverId)
  }

  componentDidUpdate() {
    console.log(this.props)
  }

  pitLoad() {
    const pitData = this.props.pitData.filter(pitStops => pitStops.driverId === this.props.driverId)
    console.log(pitData)
    if (pitData.length === 0) {
      return <p>Loading</p>
    } else if (typeof pitData[0] === "object") {
      return pitData.map(pit => <PitDetail key={pit.stop} pitData={pit} />)
    } else {
      return <p>{pitData[0]}</p>
    }
  }

  render() {
    const result = this.props.detailedResultData
    const driver = this.props.detailedResultData.Driver
    const constructor = this.props.detailedResultData.Constructor
    const fastestLap = this.props.detailedResultData.FastestLap
    const flag = NATIONS[driver.nationality]

    return (
      <div className="modal-container">
        <div className="modal-content container my-10 mx-auto p-5">
          <button onClick={this.props.closeDetailedResult} className="btn btn-default">Close</button>
          <h2>{driver.givenName + " " + driver.familyName} <span>{driver.permanentNumber}</span></h2>
          <FlagImage flagName={flag} />
          <h4>{constructor.name}</h4>
          <div className="my-3">
            <h3>Results</h3>
            <p><strong>Position: </strong> {result.position}</p>
            <p><strong>Grid:</strong> {result.grid}</p>
            <p><strong>Points:</strong> {result.points}</p>
            <p><strong>Laps:</strong> {result.laps}</p>
            <p><strong>Time:</strong> {result.status === "Finished" ? result.Time.time : "DNF"}</p>
            <p><strong>Status:</strong> {result.status}</p>
          </div>
          {this.props.season > 2003 ? <FastestLap fastestLap={fastestLap}/> : null}
          <div className="my-3">
            <h3>Pit Stops</h3>
            {this.pitLoad()}
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    season: state.season,
    detailedResultData: state.detailedResultData,
    round: state.detailedResultData.round,
    driverId: state.detailedResultData.Driver.driverId,
    pitData: state.pitData,
    driverLapLoading: state.driverLapLoading,
    driverLapData: state.driverLapData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDetailedResult: () =>  dispatch({type: "CLOSE_DETAILED_RESULT"}),
    fetchDriverLaps: (season, round, driverId) => dispatch(fetchDriverLaps(season, round, driverId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedResult);
