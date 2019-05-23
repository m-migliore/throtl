import React, { Component } from 'react';
import {connect} from 'react-redux'

class DetailedResult extends Component {
  componentDidMount() {
    console.log(this.props.detailedResultData);
  }

  render() {
    let result = this.props.detailedResultData
    let driver = this.props.detailedResultData.Driver
    let constructor = this.props.detailedResultData.Constructor
    let fastestLap = this.props.detailedResultData.FastestLap

    return (
      <div>
        <div>
          <h2>{driver.givenName + " " + driver.familyName} <span>{driver.permanentNumber}</span></h2>
          <h4>{constructor.name}</h4>
          <h3>Fastest Lap</h3>
          <p><strong>Time:</strong> {fastestLap.Time.time}</p>
          <p><strong>Average Speed:</strong> {fastestLap.AverageSpeed.speed + fastestLap.AverageSpeed.units}</p>
          <p><strong>Lap Number:</strong> {fastestLap.lap}</p>
          <p><strong>Rank:</strong> {fastestLap.rank}</p>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    detailedResultData: state.detailedResultData
  }
}

export default connect(mapStateToProps)(DetailedResult);
