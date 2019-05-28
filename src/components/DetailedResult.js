import React, { Component } from 'react';
import {connect} from 'react-redux'
import FastestLap from './FastestLap'
import PitDetail from './PitDetail'

class DetailedResult extends Component {
  componentDidMount() {
    console.log(this.props.detailedResultData);
  }

  render() {
    const result = this.props.detailedResultData
    const driver = this.props.detailedResultData.Driver
    const constructor = this.props.detailedResultData.Constructor
    const fastestLap = this.props.detailedResultData.FastestLap

    const pitstops = this.props.pitData.filter(data => data.driverId === driver.driverId)

    return (
      <div>
        <div>
          <button onClick={this.props.closeDetailedResult}>Close</button>
          <h2>{driver.givenName + " " + driver.familyName} <span>{driver.permanentNumber}</span></h2>
          <h4>{constructor.name}</h4>
          <h3>Results</h3>
          <p><strong>Position: </strong> {result.position}</p>
          <p><strong>Grid:</strong> {result.grid}</p>
          <p><strong>Time:</strong> {result.Time.time}</p>
          <p><strong>Points:</strong> {result.points}</p>
          <p><strong>Laps:</strong> {result.laps}</p>
          <p><strong>Status:</strong> {result.status}</p>
          {this.props.season === "current" || this.props.season > 2003 ? <FastestLap fastestLap={fastestLap}/> : null}
          {this.props.season === "current" || this.props.season > 2011 ? pitstops.map(pit => <PitDetail key={pit.stop} pitData={pit} />) : null}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    season: state.season,
    detailedResultData: state.detailedResultData,
    pitData: state.pitData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDetailedResult: () =>  dispatch({type: "CLOSE_DETAILED_RESULT"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedResult);
