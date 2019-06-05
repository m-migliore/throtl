import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchPitData} from '../../actions/actionCreators'
import FastestLap from './FastestLap'
import PitDetail from './PitDetail'

class DetailedResult extends Component {
  componentDidMount() {
    console.log(this.props.detailedResultData);
    this.props.fetchPitData(this.props.season, this.props.round, this.props.driverId)
  }

  pitLoad() {
    const pitData = this.props.pitData

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

    // const pitstops = this.props.pitData.filter(data => data.driverId === driver.driverId)

    return (
      <div className="modal-container">
        <div className="modal-content container my-10 mx-auto">
          <button onClick={this.props.closeDetailedResult}>Close</button>
          <h2>{driver.givenName + " " + driver.familyName} <span>{driver.permanentNumber}</span></h2>
          <h4>{constructor.name}</h4>
          <h3>Results</h3>
          <p><strong>Position: </strong> {result.position}</p>
          <p><strong>Grid:</strong> {result.grid}</p>
          <p><strong>Points:</strong> {result.points}</p>
          <p><strong>Laps:</strong> {result.laps}</p>
          <p><strong>Time:</strong> {result.status === "Finished" ? result.Time.time : "DNF"}</p>
          <p><strong>Status:</strong> {result.status}</p>
          {this.props.season === "current" || this.props.season > 2003 ? <FastestLap fastestLap={fastestLap}/> : null}
          {/* {this.props.season === "current" || this.props.season > 2011 ? pitstops.map(pit => <PitDetail key={pit.stop} pitData={pit} />) : null} */}
          <h3>Pit Stops</h3>
          {this.pitLoad()}
          {/* {this.props.season === "current" || this.props.season > 2011 ? <PitDetail /> : null} */}
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
    pitData: state.pitData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDetailedResult: () =>  dispatch({type: "CLOSE_DETAILED_RESULT"}),
    fetchPitData: (season, round, driverId) => dispatch(fetchPitData(season, round, driverId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedResult);
